import { spawn, execSync } from "node:child_process";

const isWindows = process.platform === "win32";
const children = new Set();

function start(name, command) {
  const child = spawn(command, { stdio: "inherit", shell: true });
  children.add(child);
  child.on("exit", (code) => {
    console.log(`\n[${name}] exited with code ${code}`);
    children.delete(child);
    shutdown();
  });
}

function shutdown() {
  for (const child of children) {
    if (!child.pid) continue;
    if (isWindows) {

      try {
        execSync(`taskkill /PID ${child.pid} /T /F`, { stdio: "ignore" });
      } catch {
        child.kill();
      }
    } else {
      try {
        process.kill(-child.pid, "SIGTERM");
      } catch {
        child.kill("SIGTERM");
      }
    }
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

console.log("\nStarting Vite dev server + Express backend…");
start("vite", "npm run dev");
start("backend", "npm run dev:server");
