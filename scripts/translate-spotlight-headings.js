/**
 * Translate spotlight headings and eyebrows for remaining languages.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");

const spotlightData = {
  de: {
    finance: { eyebrow: "Globales FinTech", heading: "Kapital mit\nMöglichkeiten verbinden" },
    finserve: { eyebrow: "Kreditvereinfachung", heading: "Alle Kreditarten\nunter einem Dach" },
    overseas: { eyebrow: "Globaler Handel", heading: "Von Indien nach\n14 Ländern" },
    "agro-bio": { eyebrow: "Nachhaltige Landwirtschaft", heading: "Boden wiederherstellen\nErnte maximieren" },
    securities: { eyebrow: "Elite-Schutz", heading: "Militärische\nSicherheitslösungen" },
    warehouse: { eyebrow: "Strategische Investition", heading: "8 Autobahnen\n21 Acres" },
    advertising: { eyebrow: "Autobahn-Sichtbarkeit", heading: "50 Crore Reichweite\n360° Sichtbarkeit" },
    foundation: { eyebrow: "Athletenentwicklung", heading: "Von der Basis\nbis zu den Olympischen Spielen" },
  },
  fr: {
    finance: { eyebrow: "Fintech Mondiale", heading: "Connecter le Capital\naux Opportunités" },
    finserve: { eyebrow: "Prêts Simplifiés", heading: "Tous les Types de Prêts\nSous un Même Toit" },
    overseas: { eyebrow: "Commerce Mondial", heading: "De l'Inde vers\n14 Pays" },
    "agro-bio": { eyebrow: "Agriculture Durable", heading: "Restaurer les Sols\nMaximiser les Rendements" },
    securities: { eyebrow: "Protection d'Élite", heading: "Solutions de Sécurité\nde Grade Militaire" },
    warehouse: { eyebrow: "Investissement Stratégique", heading: "8 Autoroutes\n21 Acres" },
    advertising: { eyebrow: "Visibilité Autoroutière", heading: "Portée de 50 Crore\nVisibilité 360°" },
    foundation: { eyebrow: "Développement des Athlètes", heading: "Du Terrain\naux Jeux Olympiques" },
  },
  es: {
    finance: { eyebrow: "Fintech Global", heading: "Conectar el Capital\ncon Oportunidades" },
    finserve: { eyebrow: "Préstamos Simplificados", heading: "Todos los Tipos de Préstamos\nBajo un Mismo Techo" },
    overseas: { eyebrow: "Comercio Global", heading: "De la India a\n14 Países" },
    "agro-bio": { eyebrow: "Agricultura Sostenible", heading: "Restaurar el Suelo\nMaximizar el Rendimiento" },
    securities: { eyebrow: "Protección de Élite", heading: "Soluciones de Seguridad\nde Grado Militar" },
    warehouse: { eyebrow: "Inversión Estratégica", heading: "8 Autopistas\n21 Acres" },
    advertising: { eyebrow: "Visibilidad en Autopistas", heading: "Alcance de 50 Crore\nVisibilidad 360°" },
    foundation: { eyebrow: "Desarrollo de Atletas", heading: "De lo Básico\na los Juegos Olímpicos" },
  },
  el: {
    finance: { eyebrow: "Παγκόσμιο Fintech", heading: "Σύνδεση Κεφαλαίου\nμε Ευκαιρίες" },
    finserve: { eyebrow: "Απλοποιημένα Δάνεια", heading: "Όλοι οι Τύποι Δανείων\nσε Έναν Χώρο" },
    overseas: { eyebrow: "Παγκόσμιο Εμπόριο", heading: "Από την Ινδία σε\n14 Χώρες" },
    "agro-bio": { eyebrow: "Βιώσιμη Γεωργία", heading: "Αποκατάσταση Εδάφους\nΜεγίστυνση Σοδειάς" },
    securities: { eyebrow: "Προστασία Ελίτ", heading: "Λύσεις Ασφαλείας\nΣτρατιωτικού Επιπέδου" },
    warehouse: { eyebrow: "Στρατηγική Επένδυση", heading: "8 Αυτοκινητόδρομοι\n21 Στρέμματα" },
    advertising: { eyebrow: "Ορατότητα Αυτοκινητόδρομου", heading: "Φτάσιμο 50 Crore\nΟρατότητα 360°" },
    foundation: { eyebrow: "Ανάπτυξη Αθλητών", heading: "Από τη Βάση\nστους Ολυμπιακούς Αγώνες" },
  },
  he: {
    finance: { eyebrow: "פינטק גלובלי", heading: "חיבור הון\nעם הזדמנויות" },
    finserve: { eyebrow: "הלוואות פשוטות", heading: "כל סוגי ההלוואות\nתחת קורת גג אחת" },
    overseas: { eyebrow: "מסחר עולמי", heading: "מהודו ל-14\nמדינות" },
    "agro-bio": { eyebrow: "griculture בת קיימא", heading: "שיקום קרקע\nמקסום יבול" },
    securities: { eyebrow: "הגנה אליטיסטית", heading: "פתרונות אבטחה\nברמה צבאית" },
    warehouse: { eyebrow: "השקעה אסטרטגית", heading: "8 כבישים מהירים\n21 דונם" },
    advertising: { eyebrow: "נראות בכבישים מהירים", heading: " הגעה ל-50 קרור\nנראות 360°" },
    foundation: { eyebrow: "פיתוח ספורטאים", heading: "מהבסיס\nלאולימפיאדה" },
  },
  id: {
    finance: { eyebrow: "Fintech Global", heading: "Menghubungkan Modal\ndengan Peluang" },
    finserve: { eyebrow: "Pinjaman Dipermudah", heading: "Semua Jenis Pinjaman\nDi Bawah Atap yang Sama" },
    overseas: { eyebrow: "Perdagangan Global", heading: "Dari India ke\n14 Negara" },
    "agro-bio": { eyebrow: "Pertanian Berkelanjutan", heading: "Memulihkan Tanah\nMemaksimalkan Hasil" },
    securities: { eyebrow: "Perlindungan Elite", heading: "Solusi Keamanan\nGrade Militer" },
    warehouse: { eyebrow: "Investasi Strategis", heading: "8 Jalan Tol\n21 Hektar" },
    advertising: { eyebrow: "Visibilitas Jalan Raya", heading: "Jangkauan 50 Crore\nVisibilitas 360°" },
    foundation: { eyebrow: "Pengembangan Atlet", heading: "Dari Dasar\nhingga Olimpiade" },
  },
  it: {
    finance: { eyebrow: "Fintech Globale", heading: "Collegare il Capitale\ncon le Opportunità" },
    finserve: { eyebrow: "Prestiti Semplificati", heading: "Tutti i Tipi di Prestiti\nSotto un Unico Tetto" },
    overseas: { eyebrow: "Commercio Globale", heading: "Dall'India a\n14 Paesi" },
    "agro-bio": { eyebrow: "Agricoltura Sostenibile", heading: "Ripristinare il Suolo\nMassimizzare la Resa" },
    securities: { eyebrow: "Protezione d'Élite", heading: "Soluzioni di Sicurezza\ndi Grado Militare" },
    warehouse: { eyebrow: "Investimento Strategico", heading: "8 Autostrade\n21 Acri" },
    advertising: { eyebrow: "Visibilità Autostradale", heading: "Raggiungimento 50 Crore\nVisibilità 360°" },
    foundation: { eyebrow: "Sviluppo Atleti", heading: "Dalla Base\nalle Olimpiadi" },
  },
  nl: {
    finance: { eyebrow: "Wereldwijd FinTech", heading: "Kapitaal Verbinden\nmet Kansen" },
    finserve: { eyebrow: "Leningen Vereenvoudigd", heading: "Alle Soorten Leningen\nOnder één Dak" },
    overseas: { eyebrow: "Wereldhandel", heading: "Van India naar\n14 Landen" },
    "agro-bio": { eyebrow: "Duurzame Landbouw", heading: "Bodem Herstellen\nOpbrengst Maximaliseren" },
    securities: { eyebrow: "Elite Bescherming", heading: "Militaire Graad\nBeveiligingsoplossingen" },
    warehouse: { eyebrow: "Strategische Investering", heading: "8 Snelwegen\n21 Acres" },
    advertising: { eyebrow: "Snelweg Zichtbaarheid", heading: "50 Crore Bereik\n360° Zichtbaarheid" },
    foundation: { eyebrow: "Atletenontwikkeling", heading: "Van de Basis\ntot de Olympische Spelen" },
  },
  pl: {
    finance: { eyebrow: "Globalny FinTech", heading: "Łączenie Kapitału\nz Możliwościami" },
    finserve: { eyebrow: "Uproszczone Pożyczki", heading: "Wszystkie Rodzaje Pożyczek\nPod Jednym Dachem" },
    overseas: { eyebrow: "Handel Globalny", heading: "Z Indii do\n14 Krajów" },
    "agro-bio": { eyebrow: "Zrównoważone Rolnictwo", heading: "Odtwarzanie Gleby\nMaksymalizacja Plonów" },
    securities: { eyebrow: "Ochrona Elity", heading: "Rozwiązania Bezpieczeństwa\nKlasy Wojskowej" },
    warehouse: { eyebrow: "Inwestycja Strategiczna", heading: "8 Autostrad\n21 Akrów" },
    advertising: { eyebrow: "Widoczność na Autostradach", heading: "Zasięg 50 Crore\nWidoczność 360°" },
    foundation: { eyebrow: "Rozwój Sportowców", heading: "Od Podstaw\ndo Igrzysk Olimpijskich" },
  },
  pt: {
    finance: { eyebrow: "Fintech Global", heading: "Conectar o Capital\ncom Oportunidades" },
    finserve: { eyebrow: "Empréstimos Simplificados", heading: "Todos os Tipos de Empréstimos\nSob um Mesmo Teto" },
    overseas: { eyebrow: "Comércio Global", heading: "Da Índia para\n14 Países" },
    "agro-bio": { eyebrow: "Agricultura Sustentável", heading: "Restaurar o Solo\nMaximizar a Produtividade" },
    securities: { eyebrow: "Proteção de Élite", heading: "Soluções de Segurança\nde Grau Militar" },
    warehouse: { eyebrow: "Investimento Estratégico", heading: "8 Rodovias\n21 Acres" },
    advertising: { eyebrow: "Visibilidade Rodoviária", heading: "Alcance de 50 Crore\nVisibilidade 360°" },
    foundation: { eyebrow: "Desenvolvimento de Atletas", heading: "Da Base\nàs Olimpíadas" },
  },
  ru: {
    finance: { eyebrow: "Глобальный финтех", heading: "Связывая Капитал\nс Возможностями" },
    finserve: { eyebrow: "Упрощённые Кредиты", heading: "Все виды Кредитов\nПод Одной Крышей" },
    overseas: { eyebrow: "Глобальная Торговля", heading: "Из Индии в\n14 Стран" },
    "agro-bio": { eyebrow: "Устойчивое Сельское Хозяйство", heading: "Восстановление Почвы\nМаксимизация Урожая" },
    securities: { eyebrow: "Защита Элиты", heading: "Безопасность\nВоенного Уровня" },
    warehouse: { eyebrow: "Стратегическая Инвестиция", heading: "8 Шоссе\n21 Акр" },
    advertising: { eyebrow: "Видимость на Шоссе", heading: "Охват 50 Крор\nВидимость 360°" },
    foundation: { eyebrow: "Развитие Спортсменов", heading: "От Основ\ndo Олимпийских Игр" },
  },
  sv: {
    finance: { eyebrow: "Global FinTech", heading: "Ansluta Kapital\nmed Möjligheter" },
    finserve: { eyebrow: "Förenklade Lån", heading: "Alla Typer av Lån\nUnder Ett Tak" },
    overseas: { eyebrow: "Global Handel", heading: "Från Indien till\n14 Länder" },
    "agro-bio": { eyebrow: "Hållbart Jordbruk", heading: "Återställa Mark\nMaximera Skörd" },
    securities: { eyebrow: "Elite-Skydd", heading: "Militärgrad\nSäkerhetslösningar" },
    warehouse: { eyebrow: "Strategisk Investering", heading: "8 Motorvägar\n21 Acre" },
    advertising: { eyebrow: "Motorvägs Synlighet", heading: "50 Crore Räckvidd\n360° Synlighet" },
    foundation: { eyebrow: "Idrottsutveckling", heading: "Från Botten\ntill OS" },
  },
  th: {
    finance: { eyebrow: "ฟินเทคระดับโลก", heading: "เชื่อมต่อทุน\nกับโอกาส" },
    finserve: { eyebrow: "สินเชื่อง่ายขึ้น", heading: "สินเชื่อทุกประเภท\nในที่เดียว" },
    overseas: { eyebrow: "การค้าระดับโลก", heading: "จากอินเดียสู่\n14 ประเทศ" },
    "agro-bio": { eyebrow: "เกษตรกรรมยั่งยืน", heading: "ฟื้นฟูดิน\nเพิ่มผลผลิต" },
    securities: { eyebrow: "การคุ้มครองระดับElite", heading: "โซลูชันความปลอดภัย\nระดับทหาร" },
    warehouse: { eyebrow: "การลงทุนเชิงยุทธศาสตร์", heading: "8 ทางด่วน\n21 ไร่" },
    advertising: { eyebrow: "การมองเห็นบนทางด่วน", heading: "เข้าถึง 50 ล้านคน\nมองเห็น 360°" },
    foundation: { eyebrow: "การพัฒนานักกีฬา", heading: "จากรากหญ้า\nสู่โอลิมปิก" },
  },
  tr: {
    finance: { eyebrow: "Küresel FinTech", heading: "Sermayeyi Fırsatlarla\nBirleştirme" },
    finserve: { eyebrow: "Krediler Basitleştirildi", heading: "Tüm Kredi Türleri\nTek Çatı Altında" },
    overseas: { eyebrow: "Küresel Ticaret", heading: "Hindistan'dan\n14 Ülkeye" },
    "agro-bio": { eyebrow: "Sürdürülebilir Tarım", heading: "Toprağı Onarma\nVerimi Artırma" },
    securities: { eyebrow: "Elit Koruma", heading: "Askeri Sınıf\nGüvenlik Çözümleri" },
    warehouse: { eyebrow: "Stratejik Yatırım", heading: "8 Otoyol\n21 Dönüm" },
    advertising: { eyebrow: "Otoyol Görünürlüğü", heading: "50 Crore Erişim\n360° Görünürlük" },
    foundation: { eyebrow: "Sporcu Gelişimi", heading: "Temelden\nOlimpiyatlara" },
  },
  uk: {
    finance: { eyebrow: "Глобальний FinTech", heading: "З'єднуючи Капітал\nз Можливостями" },
    finserve: { eyebrow: "Спрощені Кредити", heading: "Усі Види Кредитів\nПід Одним Дахом" },
    overseas: { eyebrow: "Глобальна Торгівля", heading: "З Індії до\n14 Країн" },
    "agro-bio": { eyebrow: "Стале Сільське Господарство", heading: "Відновлення Ґрунту\nМаксимізація Врожаю" },
    securities: { eyebrow: "Захист Еліти", heading: "Безпека\nВійськового Рівня" },
    warehouse: { eyebrow: "Стратегічна Інвестиція", heading: "8 Шосе\n21 Акр" },
    advertising: { eyebrow: "Видимість на Шосе", heading: "Охоплення 50 Крор\nВидимість 360°" },
    foundation: { eyebrow: "Розвиток Спортсменів", heading: "Від Основ\nдо Олімпійських Ігор" },
  },
  vi: {
    finance: { eyebrow: "Fintech Toàn Cầu", heading: "Kết Nối Vốn\nVới Cơ Hội" },
    finserve: { eyebrow: "Cho Vay Đơn Giản", heading: "Mọi Loại Cho Vay\nDưới Một Mái Nhà" },
    overseas: { eyebrow: "Thương Mại Toàn Cầu", heading: "Từ Ấn Độ Đến\n14 Quốc Gia" },
    "agro-bio": { eyebrow: "Nông Nghiệp Bền Vững", heading: "Phục Hồi Đất\nTối Đa Hóa Sản Lượng" },
    securities: { eyebrow: "Bảo Vệ Elite", heading: "Giải Pháp An Ninh\nCấp Độ Quân Sự" },
    warehouse: { eyebrow: "Đầu Tư Chiến Lược", heading: "8 Đường Cao Tốc\n21 Mẫu" },
    advertising: { eyebrow: "Hiển Thị Trên Cao Tốc", heading: "Tiếp Cận 50 Crore\nHiển Thị 360°" },
    foundation: { eyebrow: "Phát Triển Vận Động Viên", heading: "Từ Cơ Sở\nĐến Thế Vận Hội" },
  },
};

let totalUpdated = 0;

for (const [lang, data] of Object.entries(spotlightData)) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const fileData = JSON.parse(readFileSync(filePath, "utf8"));

  if (!fileData.spotlight) fileData.spotlight = {};

  let changed = 0;
  for (const [company, content] of Object.entries(data)) {
    if (!fileData.spotlight[company]) fileData.spotlight[company] = {};

    for (const [key, val] of Object.entries(content)) {
      if (fileData.spotlight[company][key] !== val) {
        fileData.spotlight[company][key] = val;
        changed++;
      }
    }
  }

  if (changed > 0) {
    writeFileSync(filePath, JSON.stringify(fileData, null, 2) + "\n", "utf8");
    console.log(`${lang}: ${changed} spotlight headings translated`);
    totalUpdated += changed;
  }
}

console.log(`\nDone. ${totalUpdated} total spotlight translations across ${Object.keys(spotlightData).length} languages.`);
