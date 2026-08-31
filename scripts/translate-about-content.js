/**
 * Translate about page content into all supported languages.
 *
 * Usage:  node scripts/translate-about-content.js
 *         node scripts/translate-about-content.js --dry-run
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");
const isDryRun = process.argv.includes("--dry-run");

function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in cur)) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

// ── Translations for about page content ──
const translations = {
  ar: {
    "aboutPage.founderBio1": "بُنيت مجموعة إنديكسيا على فكرة بسيطة لكنها قوية: يمكن للشركات الهندية المنافسة عالمياً عندما تكون مبنية على النزاهة والخبرة العميقة والالتزام الحقيقي بالpeople الذين تخدمهم. بدءاً من القطاع المالي، نمت المجموعة إلى ثمانية أعمال متنوعة تشمل التمويل والتصدير والزراعة والمستودعات والأمن والإعلان والتأثير الاجتماعي.",
    "aboutPage.founderBio2": "يقود المدير التنفيذي التميز التشغيلي والنمو الاستراتيجي عبر جميع الشركات في المجموعة، مما يضمن أن كل شركة تفي بوعد بالموثوقية والشفافية والنتائج. تحت هذا القيادة، توسع مجموعة إنديكسيا عالمياً وبناء فريق موحد بهدف مشترك.",
    "aboutPage.storyBody1": "تأسست مجموعة إنديكسيا بفكرة بسيطة: يمكن للشركات الهندية المنافسة عالمياً عندما تكون مبنية على النزاهة والخبرة والالتزام الحقيقي بالpeople الذين تخدمهم. بدءاً من قطاع الخدمات المالية، نمت المجموعة إلى مجموعة متنوعة من ثمانية أعمال.",
    "aboutPage.storyBody2": "اليوم، تعمل مجموعة إنديكسيا في جميع أنحاء العالم بفريق يتقاسم هدفاً مشتركاً: تقديم نتائج مهمة. كل شركة في المجموعة تحمل نفس الحمض النووي: الشفافية والموثوقية والتركيز الدائم علىخلق القيمة.",
    "aboutPage.value1Body": "نفعل ما نقوله. كل علاقة مبنية على الصدق والشفافية والاحترام المتبادل.",
    "aboutPage.value2Body": "نستثمر في المعرفة العميقة عبر كل مجال. فرقنا تجلب مهارات متخصصة وخبرة في كل تفاعل.",
    "aboutPage.value3Body": "الأعمال في النهاية عن الناس. نصمم حلول تمكّن عملائنا وتدعم مجتمعاتنا وتخلق فرصاً ذات معنى لفريقنا.",
    "aboutPage.value4Body": "نحتضن التغيير ونتحسن باستمرار. من منصات التكنولوجيا المالية إلى الزراعة العضوية، نستثمر في أفكار تدفع الصناعات إلى الأمام.",
    "aboutPage.milestone1Body": "بدأنا برؤية لبناء مجموعة أعمال هندية متنوعة متجذرة في النزاهة والخبرة.",
    "aboutPage.milestone2Body": "توسعنا في الاستثمار والمالية، لإنشاء ذراع متخصص للإقراض وإدارة الثروات.",
    "aboutPage.milestone3Body": "أطلقنا إنديكسيا أوفرسيز لربط الزراعة الهندية بالأسواق العالمية عبر قارات متعددة.",
    "aboutPage.milestone4Body": "أطلقنا الأقسام الجديدة ونمو إلى ثمانية شركات.",
    "aboutPage.milestone5Body": "أسسنا مؤسسة إنديكسيا لدعم الرياضيين الهنود.",
    "aboutPage.milestone6Body": "أطلقنا أقسام الأgado بيوي والأمن والمستودعات والإعلان، لتنمو إلى ثمانية شركات.",
    "aboutPage.milestone7Body": "أسسنا مؤسسة إنديكسيا لدعم الرياضيين الهنود من الأساسيات إلى الأولمبياد.",
  },
  de: {
    "aboutPage.founderBio1": "Die Indexia Group wurde auf einer einfachen aber kraftvollen Idee aufgebaut: Indische Unternehmen können weltweit konkurrieren, wenn sie auf Integrität, tiefem Know-how und echtem Engagement für die Menschen, denen sie dienen, aufgebaut sind. Ausgehend vom Finanzsektor ist die Gruppe zu acht vielfältigen Geschäften gewachsen.",
    "aboutPage.founderBio2": "Der Geschäftsführer leitet die operative Exzellenz und das strategische Wachstum aller Unternehmen der Gruppe und stellt sicher, dass jedes Unternehmen sein Versprechen der Zuverlässigkeit, Transparenz und Ergebnisse einlöst. Unter dieser Führung hat sich die Indexia Group weltweit ausgebreitet.",
    "aboutPage.storyBody1": "Die Indexia Group wurde mit einer einfachen Überzeugung gegründet: Indische Unternehmen können weltweit konkurrieren, wenn sie auf Integrität, Expertise und echtem Engagement aufgebaut sind. Was mit dem Finanzsektor begann, ist zu einem diversifizierten Unternehmen mit acht Geschäften gewachsen.",
    "aboutPage.storyBody2": "Heute operiert die Indexia Group weltweit mit einem Team, das einen gemeinsamen Zweck teilt: Ergebnisse zu liefern, die wichtig sind. Jedes Unternehmen der Gruppe trägt dieselbe DNA: Transparenz, Zuverlässigkeit und Fokus aufWertschöpfung.",
    "aboutPage.value1Body": "Wir tun, was wir sagen. Jede Beziehung basiert auf Ehrlichkeit, Transparenz und gegenseitigem Respekt.",
    "aboutPage.value2Body": "Wir investieren in tiefes Fachwissen in jedem Bereich. Unsere Teams bringen spezialisierte Fähigkeiten und Branchenerfahrung mit.",
    "aboutPage.value3Body": "Geschäft dreht sich letztlich um Menschen. Wir entwickeln Lösungen, die unsere Kunden stärken, unsere Gemeinschaften unterstützen und bedeutungsvolle Möglichkeiten für unser Team schaffen.",
    "aboutPage.value4Body": "Wir umarmen Veränderung und verbessern uns kontinulierlich. Von Fintech-Plattformen bis hin zur organischen Landwirtschaft investieren wir in Ideen, die Branchen voranbringen.",
    "aboutPage.milestone1Body": "Mit der Vision gegründet, ein diversifiziertes indisches Unternehmen aufzubauen.",
    "aboutPage.milestone2Body": "Expansion in Investment und Finanzen mit einem dedizierten Kredit- und Vermögensverwaltungsbereich.",
    "aboutPage.milestone3Body": "Indexia Overseas gegründet, um indische Landwirtschaft mit globalen Märkten zu verbinden.",
    "aboutPage.milestone4Body": "Neue Abteilungen gestartet und auf acht Unternehmen gewachsen.",
    "aboutPage.milestone5Body": "Indexia Foundation gegründet, um indische Athleten zu unterstützen.",
    "aboutPage.milestone6Body": "Agro Bio, Sicherheit, Lager und Werbung gestartet, auf acht Unternehmen gewachsen.",
    "aboutPage.milestone7Body": "Indexia Foundation gegründet, um indische Athleten von der Basis bis zu den Olympischen Spielen zu unterstützen.",
  },
  hi: {
    "aboutPage.founderBio1": "इंडिक्सिया ग्रुप को एक सरल लेकिन शक्तिशाली विचार पर बनाया गया: भारतीय व्यवसाय वैश्विक स्तर पर प्रतिस्पर्धा कर सकते हैं जब वे ईमानदारी, गहरी विशेषज्ञता और जिन लोगों की वे सेवा करते हैं उनके प्रति सच्ची प्रतिबद्धता पर आधारित हों। वित्तीय क्षेत्र से शुरुआत करते हुए, समूह आठ विविध व्यवसायों में बढ़ा है।",
    "aboutPage.founderBio2": "प्रबंध निदेशक समूह की सभी कंपनियों में परिचालन उत्कृष्टता और रणनीतिक विकास का नेतृत्व करते हैं, यह सुनिश्चित करते हुए कि प्रत्येक कंपनी विश्वसनीयता, पारदर्शिता और परिणामों के अपने वादे को पूरा करती है।",
    "aboutPage.storyBody1": "इंडिक्सिया ग्रुप की स्थापना एक सरल विश्वास के साथ हुई: भारतीय व्यवसाय ईमानदारी, विशेषज्ञता और सच्ची प्रतिबद्धता पर बने होने पर वैश्विक स्तर पर प्रतिस्पर्धा कर सकते हैं।",
    "aboutPage.storyBody2": "आज, इंडिक्सिया ग्रुप दुनिया भर में एक ऐसी टीम के साथ काम करता है जिसका एक साझा उद्देश्य है: महत्वपूर्ण परिणाम देना।",
    "aboutPage.value1Body": "हम वही करते हैं जो हम कहते हैं। हर रिश्ता ईमानदारी, पारदर्शिता और पारस्परिक सम्मान पर आधारित है।",
    "aboutPage.value2Body": "हम हर क्षेत्र में गहरे डोमेन ज्ञान में निवेश करते हैं। हमारी टीमें हर जुड़ाव में विशेषज्ञता और उद्योग अनुभव लाती हैं।",
    "aboutPage.value3Body": "व्यवसार अंततः लोगों के बारे में है। हम ऐसे समाधान डिजाइन करते हैं जो हमारे ग्राहकों को सशक्त बनाते हैं।",
    "aboutPage.value4Body": "हम बदलाव को अपनाते हैं और लगातार सुधार करते हैं। फिनटेक प्लेटफॉर्म से लेकर जैविक कृषि तक, हम उन विचारों में निवेश करते हैं जो उद्योगों को आगे बढ़ाते हैं।",
    "aboutPage.milestone1Body": "ईमानदारी और विशेषज्ञता पर आधारित एक विविध भारतीय व्यवसाय समूह बनाने के दृष्टिकोण के साथ शुरू।",
    "aboutPage.milestone2Body": "निवेश और वित्त में विस्तार, एक समर्पित ऋण और धन प्रबंधन शाखा बनाई।",
    "aboutPage.milestone3Body": "भारतीय कृषि को विश्व बाजारों से जोड़ने के लिए इंडिक्सिया ओवरसीज लॉन्च किया।",
    "aboutPage.milestone4Body": "नए विभाग शुरू किए और आठ कंपनियों तक बढ़े।",
    "aboutPage.milestone5Body": "भारतीय एथलीटों का समर्थन करने के लिए इंडिक्सिया फाउंडेशन की स्थापना की।",
    "aboutPage.milestone6Body": "एग्रो बायो, सिक्योरिटी, वेयरहाउस और विज्ञापन शुरू किए, आठ कंपनियों तक बढ़े।",
    "aboutPage.milestone7Body": "ओलंपिक खेलों तक भारतीय एथलीटों का समर्थन करने के लिए इंडिक्सिया फाउंडेशन की स्थापना की।",
  },
  fr: {
    "aboutPage.founderBio1": "Indexia Group a été bâti sur une idée simple mais puissante : les entreprises indiennes peuvent rivaliser au niveau mondial lorsqu'elles sont fondées sur l'intégrité, l'expertise approfondie et un engagement sincère envers les personnes qu'elles servent. En commençant par le secteur financier, le groupe s'est développé en huit entreprises diversifiées.",
    "aboutPage.founderBio2": "Le Directeur Général dirige l'excellence opérationnelle et la croissance stratégique de toutes les entreprises du groupe, en s'assurant que chaque entreprise tient ses promesses de fiabilité, de transparence et de résultats.",
    "aboutPage.storyBody1": "Indexia Group a été fondé avec une conviction simple : les entreprises indiennes peuvent rivaliser au niveau mondial lorsqu'elles sont construites sur l'intégrité, l'expertise et un engagement sincère.",
    "aboutPage.storyBody2": "Aujourd'hui, Indexia Group opère dans le monde entier avec une équipe qui partage un objectif commun : fournir des résultats qui comptent.",
    "aboutPage.value1Body": "Nous faisons ce que nous disons. Chaque relation est fondée sur l'honnêteté, la transparence et le respect mutuel.",
    "aboutPage.value2Body": "Nous investissons dans des connaissances approfondies dans chaque domaine. Nos équipes apportent des compétences spécialisées et une expérience sectorielle.",
    "aboutPage.value3Body": "Les affaires concernent fondamentalement les personnes. Nous concevons des solutions qui autonomisent nos clients et soutiennent nos communautés.",
    "aboutPage.value4Body": "Nous embrassons le changement et nous améliorons continuellement. Des plateformes fintech à l'agriculture biologique, nous investissons dans des idées qui font avancer les industries.",
    "aboutPage.milestone1Body": "Lancé avec la vision de construire un groupe d'entreprises indiennes diversifié.",
    "aboutPage.milestone2Body": "Expansion dans l'investissement et la finance avec un bras dédié au crédit et à la gestion de patrimoine.",
    "aboutPage.milestone3Body": "Lancement d'Indexia Overseas pour connecter l'agriculture indienne aux marchés mondiaux.",
    "aboutPage.milestone4Body": "Lancement de nouveaux départements et croissance à huit entreprises.",
    "aboutPage.milestone5Body": "Création de la Fondation Indexia pour soutenir les athlètes indiens.",
    "aboutPage.milestone6Body": "Lancement des activités Agro Bio, Sécurité, Entrepôt et Publicité, atteignant huit entreprises.",
    "aboutPage.milestone7Body": "Création de la Fondation Indexia pour soutenir les athlètes indiens du niveau local aux Jeux Olympiques.",
  },
  es: {
    "aboutPage.founderBio1": "Indexia Group se construyó sobre una idea simple pero poderosa: las empresas indias pueden competir a nivel mundial cuando se basan en integridad, experiencia profunda y un compromiso genuino con las personas a las que sirven. Comenzando con el sector financiero, el grupo ha crecido hasta convertirse en ocho negocios diversificados.",
    "aboutPage.founderBio2": "El Director General lidera la excelencia operativa y el crecimiento estratégico de todas las empresas del grupo, asegurando que cada empresa cumpla con su promesa de fiabilidad, transparencia y resultados.",
    "aboutPage.storyBody1": "Indexia Group fue fundado con una creencia simple: las empresas indias pueden competir a nivel mundial cuando se construyen con integridad, experiencia y un compromiso genuino.",
    "aboutPage.storyBody2": "Hoy, Indexia Group opera en todo el mundo con un equipo que comparte un propósito común: entregar resultados que importan.",
    "aboutPage.value1Body": "Hacemos lo que decimos. Cada relación se basa en honestidad, transparencia y respeto mutuo.",
    "aboutPage.value2Body": "Invertimos en conocimiento profundo en cada área. Nuestros equipos aportan habilidades especializadas y experiencia en la industria.",
    "aboutPage.value3Body": "Los negocios son fundamentalmente sobre personas. Diseñamos soluciones que empoderan a nuestros clientes y apoyan a nuestras comunidades.",
    "aboutPage.value4Body": "Abrazamos el cambio y mejoramos continuamente. De plataformas fintech a agricultura orgánica, invertimos en ideas que impulsan las industrias.",
    "aboutPage.milestone1Body": "Iniciado con la visión de construir un grupo empresarial indio diversificado.",
    "aboutPage.milestone2Body": "Expansión en inversión y finanzas con un brazo dedicado a préstamos y gestión de patrimonio.",
    "aboutPage.milestone3Body": "Lanzamiento de Indexia Overseas para conectar la agricultura india con mercados globales.",
    "aboutPage.milestone4Body": "Lanzamiento de nuevos departamentos y crecimiento a ocho empresas.",
    "aboutPage.milestone5Body": "Fundación de Indexia Foundation para apoyar a atletas indios.",
    "aboutPage.milestone6Body": "Lanzamiento de Agro Bio, Seguridad, Almacenamiento y Publicidad, creciendo a ocho empresas.",
    "aboutPage.milestone7Body": "Fundación de Indexia Foundation para apoyar a atletas indios desde la base hasta los Juegos Olímpicos.",
  },
  zh: {
    "aboutPage.founderBio1": "Indexia Group建立在一个简单但强大的理念之上：当印度企业建立在诚信、深厚专业知识和对所服务人民的真诚承诺之上时，它们可以在全球范围内竞争。从金融部门开始，该集团已发展成为八家多元化企业。",
    "aboutPage.founderBio2": "董事总经理领导集团所有公司的卓越运营和战略增长，确保每家公司都能兑现其可靠性、透明度和成果的承诺。",
    "aboutPage.storyBody1": "Indexia Group的成立基于一个简单的信念：当印度企业建立在诚信、专业知识和真诚承诺之上时，它们可以在全球范围内竞争。",
    "aboutPage.storyBody2": "如今，Indexia Group在全球范围内运营，拥有一支怀有共同目标的团队：提供有意义的成果。",
    "aboutPage.value1Body": "我们说到做到。每段关系都建立在诚实、透明和相互尊重的基础上。",
    "aboutPage.value2Body": "我们在每个领域都投资于深厚的专业知识。我们的团队带来专业技能和行业经验。",
    "aboutPage.value3Body": "商业归根结底是关于人。我们设计赋权客户、支持社区并为团队创造有意义机会的解决方案。",
    "aboutPage.value4Body": "我们拥抱变化并持续改进。从金融科技平台到有机农业，我们投资于推动行业前进的想法。",
    "aboutPage.milestone1Body": "以建立多元化印度企业集团的愿景开始。",
    "aboutPage.milestone2Body": "扩展到投资和金融领域，创建专门的贷款和财富管理部门。",
    "aboutPage.milestone3Body": "推出Indexia Overseas，将印度农业与全球市场连接。",
    "aboutPage.milestone4Body": "推出新部门，发展为八家公司。",
    "aboutPage.milestone5Body": "成立Indexia Foundation支持印度运动员。",
    "aboutPage.milestone6Body": "推出Agro Bio、安保、仓储和广告业务，发展为八家公司。",
    "aboutPage.milestone7Body": "成立Indexia Foundation，支持印度运动员从基层走向奥运会。",
  },
  ja: {
    "aboutPage.founderBio1": "Indexia Groupはシンプルだが力強いアイデアの上に構築されました：インドの企業は、誠実さ、深い専門知識、そしてサービスを提供する人々への真のコミットメントに基づいている場合、グローバルで競争できます。金融セクターから始まり、グループは8つの多様な事業に成長しました。",
    "aboutPage.founderBio2": "最高経営責任者はグループ全社の業務卓越性と戦略的成長を率い、各社が信頼性、透明性、成果の約束を果たすことを保証しています。",
    "aboutPage.storyBody1": "Indexia Groupはシンプルな信念に基づいて設立されました：インドの企業は、誠実さ、専門知識、真のコミットメントの上に構築されている場合、グローバルで競争できます。",
    "aboutPage.storyBody2": "今日、Indexia Groupは共通の目的を分かち合うチームと世界中で事業を展開しています。",
    "aboutPage.value1Body": "私たちは言ったことをします。すべての関係は誠実さ、透明性、相互尊重の上に築かれています。",
    "aboutPage.value2Body": "私たちはすべての分野で深いドメイン知識に投資しています。チームは専門スキルと業界経験を持ちます。",
    "aboutPage.value3Body": "ビジネスは究極的には人关于です。私たちはクライエントを強化し、コミュニティを支援するソリューションを設計します。",
    "aboutPage.value4Body": "私たちは変化を受け入れ、継続的に改善します。フィンテックプラットフォームからオーガニック農業まで、産業を前進させるアイデアに投資します。",
    "aboutPage.milestone1Body": "多様なインド企業グループを構築するビジョンで設立。",
    "aboutPage.milestone2Body": "投資と金融に拡大し、専用の融資および資産管理部門を設立。",
    "aboutPage.milestone3Body": "インド農業と世界市場をつなぐIndexia Overseasを開始。",
    "aboutPage.milestone4Body": "新しい部門を開始し、8社に成長。",
    "aboutPage.milestone5Body": "インドのアスリートを支援するIndexia Foundationを設立。",
    "aboutPage.milestone6Body": "Agro Bio、セキュリティ、倉庫、広告事業を開始し、8社に成長。",
    "aboutPage.milestone7Body": "grassrootsからオリンピックまでインドのアスリートを支援するIndexia Foundationを設立。",
  },
  ko: {
    "aboutPage.founderBio1": "Indexia Group는 단순하지만 강력한 아이디어 위에 구축되었습니다: 인도 기업이 진실성, 깊은 전문 지식, 그리고 서비스하는 사람들의 진정한 헌신 위에 세워질 때 글로벌 경쟁력을 가질 수 있습니다. 금융 부문에서 시작하여 그룹은 8개의 다양한 기업으로 성장했습니다.",
    "aboutPage.founderBio2": "최고경영자는 그룹 내 모든 기업의 운영 우수성과 전략적 성장을 이끌며, 각 기업이 신뢰성, 투명성, 결과에 대한 약속을 이행하도록 보장합니다.",
    "aboutPage.storyBody1": "Indexia Group는 단순한 신념으로 설립되었습니다: 인도 기업이 진실성, 전문 지식, 그리고 진정한 헌신 위에 세워질 때 글로벌 경쟁력을 가질 수 있습니다.",
    "aboutPage.storyBody2": "오늘날 Indexia Group는 공통의 목표를 공유하는 팀과 함께 전 세계에서 운영됩니다.",
    "aboutPage.value1Body": "우리는 말한 것을 실행합니다. 모든 관계는 정직, 투명성, 상호 존중 위에 세워져 있습니다.",
    "aboutPage.value2Body": "우리는 모든 분야에 깊은 도메인 지식에 투자합니다. 우리 팀은 전문 기술과 산업 경험을 제공합니다.",
    "aboutPage.value3Body": "비즈니스는 결국 사람에 관한 것입니다. 우리는 고객을 지원하고 커뮤니티를 지원하는 솔루션을 설계합니다.",
    "aboutPage.value4Body": "우리는 변화를 수용하고 지속적으로 개선합니다. 핀테크 플랫폼에서 유기농 농업에 이르기까지, 산업을 발전시키는 아이디어에 투자합니다.",
    "aboutPage.milestone1Body": "다양한 인도 기업 그룹을 구축하겠다는 비전으로 시작.",
    "aboutPage.milestone2Body": "투자 및 금융으로 확장하여 전담 대출 및 자산관리 부문을 설립.",
    "aboutPage.milestone3Body": "인도 농업과 글로벌 시장을 연결하는 Indexia Overseas를 출시.",
    "aboutPage.milestone4Body": "새로운 부서를 시작하고 8개 회사로 성장.",
    "aboutPage.milestone5Body": "인도 선수를 지원하는 Indexia Foundation을 설립.",
    "aboutPage.milestone6Body": "Agro Bio, 보안, 창고, 광고 사업을 시작하여 8개 회사로 성장.",
    "aboutPage.milestone7Body": "grassroots에서 올림픽까지 인도 선수를 지원하는 Indexia Foundation을 설립.",
  },
};

// ── Process each language ──
const files = Object.keys(translations);
let totalUpdated = 0;

for (const lang of files) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = 0;

  for (const [key, val] of Object.entries(translations[lang])) {
    const current = getByPath(data, key);
    if (current !== val) {
      if (!isDryRun) setByPath(data, key, val);
      changed++;
    }
  }

  if (changed > 0) {
    console.log(`${lang}.json: ${changed} string(s) translated`);
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalUpdated += changed;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalUpdated} total string(s) ${isDryRun ? "would be" : "were"} translated across ${files.length} languages.`);
