import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".freebuff", ".vite", "coverage"]);
const TARGET_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".html", ".svg", ".xml", ".json"]);
const TS_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);

function collectFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) collectFiles(full, out);
    } else if (TARGET_EXTS.has(path.extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

function scriptKindFor(file) {
  const ext = path.extname(file);
  if (ext === ".tsx") return ts.ScriptKind.TSX;
  if (ext === ".jsx") return ts.ScriptKind.JSX;
  if (ext === ".ts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JS;
}

function stripTsComments(code, file) {
  const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, scriptKindFor(file));
  const ranges = new Map();
  const add = (r) => {
    if (r) for (const c of r) ranges.set(c.pos + ":" + c.end, { pos: c.pos, end: c.end });
  };
  const visit = (n) => {
    const first = n.getFirstToken?.();
    const last = n.getLastToken?.();
    add(ts.getLeadingCommentRanges(code, n.getFullStart()));
    add(ts.getTrailingCommentRanges(code, n.getFullStart()));
    add(ts.getTrailingCommentRanges(code, n.getEnd()));
    if (first && last && first !== last) {
      add(ts.getTrailingCommentRanges(code, first.getEnd()));
      add(ts.getLeadingCommentRanges(code, last.getFullStart()));
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  add(ts.getTrailingCommentRanges(code, sf.getEnd()));
  let out = code;
  const sorted = [...ranges.values()].sort((x, y) => y.pos - x.pos);
  for (const c of sorted) out = out.slice(0, c.pos) + out.slice(c.end);
  return out;
}

function stripJsoncComments(code) {
  let out = "";
  let i = 0;
  let inStr = false;
  while (i < code.length) {
    const ch = code[i];
    if (inStr) {
      out += ch;
      if (ch === "\\") {
        out += code[i + 1] ?? "";
        i += 2;
        continue;
      }
      if (ch === '"') inStr = false;
      i++;
    } else if (ch === '"') {
      inStr = true;
      out += ch;
      i++;
    } else if (ch === "/" && code[i + 1] === "/") {
      const nl = code.indexOf("\n", i);
      i = nl === -1 ? code.length : nl;
    } else if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      i = end === -1 ? code.length : end + 2;
    } else {
      out += ch;
      i++;
    }
  }
  return out;
}

function stripCssComments(code) {
  let out = "";
  let i = 0;
  let quote = null;
  while (i < code.length) {
    const ch = code[i];
    if (quote) {
      out += ch;
      if (ch === "\\") {
        out += code[i + 1] ?? "";
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      i++;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      out += ch;
      i++;
    } else if (ch === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      i = end === -1 ? code.length : end + 2;
    } else {
      out += ch;
      i++;
    }
  }
  return out;
}

function stripMarkupComments(code) {
  return code.replace(/<!--[\s\S]*?-->/g, "");
}

function stripHashComments(code) {
  return code.replace(/^[ \t]*#.*(?:\r?\n|$)/gm, "");
}

function protectedSpans(code, file) {
  if (!TS_EXTS.has(path.extname(file))) return [];
  const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, scriptKindFor(file));
  const spans = [];
  const visit = (n) => {
    if (
      n.kind === ts.SyntaxKind.StringLiteral ||
      n.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral ||
      n.kind === ts.SyntaxKind.TemplateExpression ||
      n.kind === ts.SyntaxKind.RegularExpressionLiteral
    ) {
      spans.push([n.getStart(), n.getEnd()]);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return spans;
}

function removeEmptyJsxLines(code, file) {
  if (![".tsx", ".jsx"].includes(path.extname(file))) return code;
  const nlMatch = code.match(/\r?\n/);
  const nl = nlMatch ? nlMatch[0] : "\n";
  return code
    .split(/\r?\n/)
    .filter((line) => !/^[ \t]*\{\s*\}[ \t]*$/.test(line))
    .join(nl);
}

function cleanupWhitespace(code, file) {
  const spans = protectedSpans(code, file);
  const nlMatch = code.match(/\r\n|\r|\n/);
  const nl = nlMatch ? nlMatch[0] : "\n";
  const parts = code.split(/\r\n|\r|\n/);
  let offset = 0;
  const starts = parts.map((part, i) => {
    const s = offset;
    offset += part.length + nl.length;
    return s;
  });
  const lineProtected = parts.map((part, i) => {
    const s = starts[i];
    const e = s + part.length;
    return spans.some(([a, b]) => a < e && b > s);
  });
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    let line = parts[i];
    if (!lineProtected[i]) line = line.replace(/[ \t]+$/, "");
    if (!lineProtected[i] && /^[ \t]*$/.test(line)) {
      if (out.length === 0 || out[out.length - 1] === "") continue;
      out.push("");
    } else {
      out.push(line);
    }
  }
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  const result = out.join(nl);
  return result.length > 0 && !result.endsWith(nl) ? result + nl : result;
}

function countParseErrors(code, file) {
  const ext = path.extname(file);
  if (TS_EXTS.has(ext)) {
    const sf = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, false, scriptKindFor(file));
    return (sf.parseDiagnostics ?? []).length;
  }
  if (ext === ".json") {
    try {
      JSON.parse(code);
      return 0;
    } catch {
      return 1;
    }
  }
  return 0;
}

const files = collectFiles(path.join(ROOT, "src"));
for (const dir of ["scripts", "server", "public"]) {
  collectFiles(path.join(ROOT, dir)).forEach((f) => files.push(f));
}
for (const f of [
  "vite.config.ts",
  "eslint.config.js",
  "index.html",
  "tsconfig.json",
  "tsconfig.app.json",
  "tsconfig.node.json",
  "components.json",
  "package.json",
  ".gitignore",
  ".gitattributes",
]) {
  files.push(path.join(ROOT, f));
}

let changed = 0;
let removed = 0;
for (const file of new Set(files)) {
  const ext = path.extname(file);
  const base = path.basename(file);
  let code = readFileSync(file, "utf8");
  const before = code;
  if (TS_EXTS.has(ext)) code = stripTsComments(code, file);
  else if (ext === ".json") code = stripJsoncComments(code);
  else if (ext === ".css") code = stripCssComments(code);
  else if (ext === ".html" || ext === ".svg" || ext === ".xml") code = stripMarkupComments(code);
  else if (base === ".gitignore" || base === ".gitattributes") code = stripHashComments(code);
  code = removeEmptyJsxLines(code, file);
  code = cleanupWhitespace(code, file);
  if (code === before) continue;
  if (countParseErrors(code, file) > countParseErrors(before, file)) {
    console.log(`SKIP (would not re-parse): ${path.relative(ROOT, file)}`);
    continue;
  }
  writeFileSync(file, code);
  changed++;
  removed += before.length - code.length;
  console.log(`stripped ${before.length - code.length} chars  ${path.relative(ROOT, file)}`);
}
console.log(`Done: ${changed} files changed, ${removed} chars removed.`);
