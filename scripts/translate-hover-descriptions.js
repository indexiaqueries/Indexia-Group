/**
 * Translate radial card hover descriptions for remaining languages.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");

const translations = {
  hi: {
    radialFinanceDesc: "43+ बैंक साझेदारी के साथ वैश्विक रूप से वित्तीय सेवाएं प्रदान करने वाला बहुराष्ट्रीय फिनटेक प्लेटफॉर्म",
    radialFinserveDesc: "ऋण और धन प्रबंधन में विशेषज्ञता वाला निवेश और वित्त विभाग",
    radialOverseasDesc: "भारतीय कृषि को महाद्वीपों में वैश्विक खाद्य निर्यात बाजारों से जोड़ना",
    radialAgroDesc: "मिट्टी के स्वास्थ्य को बहाल करने और फसल उत्पादकता बढ़ाने वाले पर्यावरण-अनुकूल जैविक उर्वरक",
    radialSecuritiesDesc: "लोगों और संपत्ति की रक्षा करने वाली पेशेवर सशस्त्र सुरक्षा सेवाएं",
    radialWarehouseDesc: "8 एक्सप्रेसवे और 8 राज्यों तक पहुंच के साथ 21 एकड़ रणनीतिक भूमि पट्टा केंद्र",
    radialAdvertisingDesc: "रोजाना लाखों यात्रियों तक पहुंचने वाले हाईवे बिलबोर्ड विज्ञापन",
    radialFoundationDesc: "ओलंपिक खेलों तक जमीनी स्तर से भारतीय एथलीटों को पोषित करना",
  },
  el: {
    radialFinanceDesc: "Παγκόσμια πλατφόρμα fintech με περισσότερες από 43 τραπεζικές συνεργασίες",
    radialFinserveDesc: "Επενδυτικός και χρηματοοικονομικός κλάδος ειδικευμένος σε δάνεια και διαχείριση περιουσίας",
    radialOverseasDesc: "Σύνδεση της ινδικής γεωργίας με παγκόσμιες αγορές εξαγωγών τροφίμων",
    radialAgroDesc: "Οικολογικά βιολογικά λιπάσματα που αποκαθιστούν την υγεία του εδάφους",
    radialSecuritiesDesc: "Επαγγελματικές υπηρεσίες ένοπλης προστασίας",
    radialWarehouseDesc: "Κέντρο ενοικίασης γης 21 στρεμμάτων με πρόσβαση σε 8 αυτοκινητόδρομους",
    radialAdvertisingDesc: "Διαφημίσεις πινακίδων σε αυτοκινητόδρομους",
    radialFoundationDesc: "Υποστήριξη Ινδών αθλητών από τη βάση έως τους Ολυμπιακούς Αγώνες",
  },
  he: {
    radialFinanceDesc: "פלטפורמת פינטק רב-לאומית עם למעלה מ-43 שותפויות בנקאיות",
    radialFinserveDesc: "זרוע השקעות ופיננסים המתמחה בהלוואות וניהול עושר",
    radialOverseasDesc: "קישור החקלאות ההודית לשווקי יצוא מזון עולמיים",
    radialAgroDesc: "דשנים ידידותיים לסביבה המשחזרים בריאות קרקע",
    radialSecuritiesDesc: "שירותי הגנה חמושים מקצועיים",
    radialWarehouseDesc: "מרכז השכרת אסטרטגי של 21 דונם עם גישה ל-8 כבישים מהירים",
    radialAdvertisingDesc: "פרסום שלטי חוצות בכבישים מהירים",
    radialFoundationDesc: "תמיכה בספורטאים הודים מהבסיס ועד האולימפיאדה",
  },
  id: {
    radialFinanceDesc: "Platform fintech multinasional yang menyediakan layanan keuangan global dengan 43+ mitra perbankan",
    radialFinserveDesc: "Unit investasi dan keuangan yang mengkhususkan diri dalam pinjaman dan pengelolaan kekayaan",
    radialOverseasDesc: "Menghubungkan pertanian India dengan pasar ekspor pangan global",
    radialAgroDesc: "Pupuk bio ramah lingkungan yang memulihkan kesehatan tanah",
    radialSecuritiesDesc: "Layanan perlindungan bersenjata profesional",
    radialWarehouseDesc: "Pusat penyewaan lahan strategis 21 hektar dengan akses ke 8 jalan tol",
    radialAdvertisingDesc: "Iklan papan reklame jalan raya",
    radialFoundationDesc: "Mendukung atlet India dari dasar hingga Olimpiade",
  },
  it: {
    radialFinanceDesc: "Piattaforma fintech multinazionale con oltre 43 partnership bancarie",
    radialFinserveDesc: "Ramo di investimento e finanza specializzato in prestiti e gestione patrimoniale",
    radialOverseasDesc: "Collegare l'agricoltura indiana ai mercati di esportazione alimentare globale",
    radialAgroDesc: "Concimi biologici ecologici che ripristinano la salute del suolo",
    radialSecuritiesDesc: "Servizi di protezione armata professionale",
    radialWarehouseDesc: "Centro di locazione strategico di 21 acri con accesso a 8 autostrade",
    radialAdvertisingDesc: "Pubblicità su cartelloni stradali",
    radialFoundationDesc: "Supporto agli atleti indiani dalla base alle Olimpiadi",
  },
  nl: {
    radialFinanceDesc: "Multinationaal fintech-platform met meer dan 43 bankpartnerschappen",
    radialFinserveDesc: "Investerings- en financieringsarm gespecialiseerd in leningen en vermogensbeheer",
    radialOverseasDesc: "Verbinden van de Indiase landbouw met mondiale voedselexportmarkten",
    radialAgroDesc: "Milieuvriendelijke bio-meststoffen die de bodemgezondheid herstellen",
    radialSecuritiesDesc: "Professionele gewapende beveiligingsdiensten",
    radialWarehouseDesc: "Strategisch landverhuurcentrum van 21 acre met toegang tot 8 autosnelwegen",
    radialAdvertisingDesc: "Snelwegreclame billboards",
    radialFoundationDesc: "Ondersteuning van Indiase atleten van basis tot Olympische Spelen",
  },
  pl: {
    radialFinanceDesc: "Międzynarodowa platforma fintech z ponad 43 partnerstwami bankowymi",
    radialFinserveDesc: "Oddział inwestycyjny i finansowy specjalizujący się w pożyczkach i zarządzaniu majątkiem",
    radialOverseasDesc: "Łączenie rolnictwa indyjskiego z globalnymi rynkami eksportu żywności",
    radialAgroDesc: "Przyjazne środowisku nawozy biologiczne przywracające zdrowie gleby",
    radialSecuritiesDesc: "Profesjonalne usługi ochrony zbrojnej",
    radialWarehouseDesc: "Strategiczny hub wynajmu gruntów o powierzchni 21 akrów z dostępem do 8 autostrad",
    radialAdvertisingDesc: "Reklama na billboardach autostradowych",
    radialFoundationDesc: "Wsparcie dla sportowców indyjskich od podstaw do Igrzysk Olimpijskich",
  },
  pt: {
    radialFinanceDesc: "Plataforma fintech multinacional com mais de 43 parcerias bancárias",
    radialFinserveDesc: "Braço de investimento e finanças especializado em empréstimos e gestão de patrimônio",
    radialOverseasDesc: "Conectar a agricultura indiana aos mercados de exportação alimentar global",
    radialAgroDesc: "Fertilizantes biológicos ecológicos que restauram a saúde do solo",
    radialSecuritiesDesc: "Serviços de proteção armada profissional",
    radialWarehouseDesc: "Centro de locação estratégico de 21 acres com acesso a 8 rodovias",
    radialAdvertisingDesc: "Publicidade em painéis de rodovias",
    radialFoundationDesc: "Apoio a atletas indianos da base até as Olimpíadas",
  },
  ru: {
    radialFinanceDesc: "Международная финтех-платформа с более чем 43 банковскими партнёрствами",
    radialFinserveDesc: "Инвестиционное и финансовое подразделение, специализирующееся на кредитовании и управлении активами",
    radialOverseasDesc: "Связывание индийского сельского хозяйства с мировыми рынками продовольственного экспорта",
    radialAgroDesc: "Экологически чистые биоудобрения, восстанавливающие здоровье почвы",
    radialSecuritiesDesc: "Профессиональные услуги вооружённой охраны",
    radialWarehouseDesc: "Стратегический центр аренды земли площадью 21 акр с доступом к 8 шоссе",
    radialAdvertisingDesc: "Реклама на рекламных щитах вдоль автомагистралей",
    radialFoundationDesc: "Поддержка индийских спортсменов от начального уровня до Олимпийских игр",
  },
  sv: {
    radialFinanceDesc: "Multinational finTech-plattform med över 43 bankpartnerskap",
    radialFinserveDesc: "Investerings- och finansarm specialiserad på lån och förmögenhetsförvaltning",
    radialOverseasDesc: "Ansluta indiskt jordbruk till globala matexportmarknader",
    radialAgroDesc: "Miljövänliga bio-gödselmedel som återställer markens hälsa",
    radialSecuritiesDesc: "Professionella beväpnade skyddstjänster",
    radialWarehouseDesc: "Strategiskt markuthyrningscenter på 21 acre med tillgång till 8 motorvägar",
    radialAdvertisingDesc: "Motorvägsreklam på plakat",
    radialFoundationDesc: "Stöd till indiska idrottare från basen till OS",
  },
  th: {
    radialFinanceDesc: "แพลตฟอร์มฟินเทคข้ามชาติที่ให้บริการทางการเงินทั่วโลกด้วยพันธมิตรธนาคาร 43+ ราย",
    radialFinserveDesc: "แผนกลงทุนและการเงินเชี่ยวชาญด้านสินเชื่อและการจัดการทรัพย์สิน",
    radialOverseasDesc: "เชื่อมต่อการเกษตรของอินเดียกับตลาดส่งออกอาหารทั่วโลก",
    radialAgroDesc: "ปุ๋ยชีวภาพเป็นมิตรกับสิ่งแวดล้อมที่ฟื้นฟูสุขภาพดิน",
    radialSecuritiesDesc: "บริการรักษาความปลอดภัยติดอาวุธมืออาชีพ",
    radialWarehouseDesc: "ศูนย์เช่าที่ดินเชิงยุทธศาสตร์ 21 ไร่ พร้อมทางด่วน 8 เส้นทาง",
    radialAdvertisingDesc: "โฆษณาน Billboard บนทางด่วน",
    radialFoundationDesc: "สนับสนุนนักกีฬาอินเดียจากระดับรากหญ้าจนถึงโอลิมปิก",
  },
  tr: {
    radialFinanceDesc: "43'ten fazla banka ortaklığıyla dünya genelinde finansal hizmetler sunan çok uluslu finTech platformu",
    radialFinserveDesc: "Krediler ve varlık yönetimi konusunda uzmanlaşmış yatırım ve finans kolu",
    radialOverseasDesc: "Hint tarımını küresel gıda ihracat pazarlarıyla bağlama",
    radialAgroDesc: "Toprak sağlığını geri kazanan ve verimi artıran çevre dostu biyogübreler",
    radialSecuritiesDesc: "Profesyonel silahlı koruma hizmetleri",
    radialWarehouseDesc: "8 otoyola ve 8 eyalete erişimli 21 dönümlük stratejik arazi kiralama merkezi",
    radialAdvertisingDesc: "Otoyol reklam panoları",
    radialFoundationDesc: "Temelden Olimpiyatlara kadar Hintli sporculara destek",
  },
  uk: {
    radialFinanceDesc: "Міжнародна фінтех-платформа з понад 43 банківськими партнерствами",
    radialFinserveDesc: "Інвестиційний та фінансовий підрозділ, що спеціалізується на кредитуванні та управлінні активами",
    radialOverseasDesc: "З'єднання індійського сільського господарства з глобальними ринками харчового експорту",
    radialAgroDesc: "Екологічні біодобрива, що відновлюють здоров'я ґрунту",
    radialSecuritiesDesc: "Професійні послуги озброєної охорони",
    radialWarehouseDesc: "Стратегічний центр оренди землі площею 21 акр з доступом до 8 шосе",
    radialAdvertisingDesc: "Реклама на рекламних щитах вздовж шосе",
    radialFoundationDesc: "Підтримка індійських спортсменів від початкового рівня до Олімпійських ігор",
  },
  vi: {
    radialFinanceDesc: "Nền tảng fintech đa quốc gia cung cấp dịch vụ tài chính toàn cầu với hơn 43 đối tác ngân hàng",
    radialFinserveDesc: "Chi nhánh đầu tư và tài chính chuyên về cho vay và quản lý tài sản",
    radialOverseasDesc: "Kết nối nông nghiệp Ấn Độ với thị trường xuất khẩu thực phẩm toàn cầu",
    radialAgroDesc: "Phân bón sinh học thân thiện môi trường phục hồi sức khỏe đất",
    radialSecuritiesDesc: "Dịch vụ bảo vệ vũ trang chuyên nghiệp",
    radialWarehouseDesc: "Trung tâm cho thuê đất chiến lược 21 mẫu với quyền truy cập 8 đường cao tốc",
    radialAdvertisingDesc: "Quảng cáo biển billboard trên đường cao tốc",
    radialFoundationDesc: "Hỗ trợ vận động viên Ấn Độ từ cơ sở đến Thế vận hội",
  },
};

let totalUpdated = 0;
for (const [lang, vals] of Object.entries(translations)) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  if (data.aboutPage) {
    let changed = 0;
    for (const [key, val] of Object.entries(vals)) {
      if (data.aboutPage[key] !== val) {
        data.aboutPage[key] = val;
        changed++;
      }
    }
    if (changed > 0) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
      console.log(`${lang}: ${changed} hover descriptions translated`);
      totalUpdated += changed;
    }
  }
}
console.log(`\nDone. ${totalUpdated} total strings translated across ${Object.keys(translations).length} languages.`);
