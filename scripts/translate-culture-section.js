/**
 * Translate careers culture section for all languages.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");

const cultureTranslations = {
  zh: {
    cultureBody1: "英德西亚集团是一个学习型组织，我们的文化始于团队。我们投资于员工——最新的工具、真正的培训、灵活的工作时间，以及一个协作且真正有趣的工作场所。这里的沟通是双向的，从新入职员工一直到管理层。",
    cultureBody2: "您将体验到初创企业的节奏，同时享有成熟集团的稳定性和福利。随着我们拓展新市场和新客户，我们正在寻找与我们一样追求卓越工作的人才。如果您是这样的人，我们期待看到您的简历。",
  },
  ja: {
    cultureBody1: "インデキシアグループは学習型組織であり、文化はチームから始まります。私たちは従業員に投資します——最新のツール、実践的なトレーニング、柔軟な勤務時間、そして協力的で本当に楽しい職場を提供します。ここでは、最新の新入社員から経営層まで双方向のコミュニケーションが行われます。",
    cultureBody2: "スタートアップのペースを、確立されたグループの安定性と福利厚生とともに享受できます。新市場と新クライアントに成長する中で、卓越した仕事をするという私たちの情熱を共有する人材を探しています。もしそういう方でしたら、履歴書をお待ちしています。",
  },
  ko: {
    cultureBody1: "인덱시아 그룹은 학습 조직이며, 우리 문화는 팀에서 시작됩니다. 우리는 직원에게 투자합니다——최신 도구, 실질적인 교육, 유연한 근무 시간, 그리고 협력적이고 진정으로 즐거운 작업 환경을 제공합니다. 여기서는 최신 신입사원부터 경영진까지 양방향 의사소통이 이루어집니다.",
    cultureBody2: "초기 기업의 속도를, 안정된 그룹의 안정성과 혜택과 함께 경험하게 됩니다. 새로운 시장과 새로운 고객으로 성장하면서, 탁월한 일을 하겠다는 우리 열정을 공유하는 인재를 찾고 있습니다. 그렇다면 이력서를 보내주세요.",
  },
  ar: {
    cultureBody1: "مجموعة إنديكسيا منظمة تعليمية، وثقافتنا تبدأ من فريقنا. نستثمر في موظفنا — أحدث الأدوات، التدريب الحقيقي، ساعات العمل المرونة، ومكان عمل تعاوني وممتع حقاً. التواصل هنا ثنائي الاتجاه، من أحدث موظف عبر الإدارة.",
    cultureBody2: "ستجد ن节奏 المؤسسات الناشئة، مدعومة بakestabilidad ومزايا مجموعة راسخة. مع نمونا إلى أسواق وعملاء جدد، نبحث عن أشخاص يشاركوننا حماسنا لتقديم عمل استثنائي. إذا كنت كذلك، يسعدنا رؤية سيرتك الذاتية.",
  },
  hi: {
    cultureBody1: "इंडेक्सिया ग्रुप एक सीखने वाला संगठन है, और हमारी संस्कृति हमारी टीम से शुरू होती है। हम अपने लोगों में निवेश करते हैं — नवीनतम उपकरण, वास्तविक प्रशिक्षण, लचीले घंटे, और एक सहयोगी और वास्तव में मजेदार कार्यस्थल। यहां संचार दोनों तरफ से होता है, नवीनतम कर्मचारी से लेकर प्रबंधन तक।",
    cultureBody2: "आपको स्टार्ट-अप की गति मिलेगी, एक स्थापित समूह की स्थिरता और लाभों के साथ। जैसे-जैसे हम नए बाजारों और नए ग्राहकों में बढ़ रहे हैं, हम ऐसे लोगों की तलाश में हैं जो असाधारण काम करने के हमारे जुनून को साझा करते हैं। यदि आप वही हैं, तो हम आपका रिज्यूमे देखना पसंद करेंगे।",
  },
  de: {
    cultureBody1: "Indexia Group ist eine lernende Organisation, und unsere Kultur beginnt bei unserem Team. Wir investieren in unsere Mitarbeiter — die neuesten Tools, echtes Training, flexible Arbeitszeiten und einen Arbeitsplatz, der kooperativ und wirklich macht. Kommunikation findet hier in beide Richtungen statt, vom neuesten Mitarbeiter bis hin zum Management.",
    cultureBody2: "Sie werden das Tempo eines Start-ups finden, unterstützt von der Stabilität und den Vorteilen einer etablierten Gruppe. Wir wachsen in neue Märkte und neue Kunden und suchen Menschen, die unsere Leidenschaft für außergewöhnliche Arbeit teilen. Wenn Sie das sind, würden wir Ihren Lebenslauf gerne sehen.",
  },
  fr: {
    cultureBody1: "Indexia Group est une organisation d'apprentissage, et notre culture commence par notre équipe. Nous investissons dans nos personnes — les derniers outils, une vraie formation, des heures flexibles et un environnement de travail collaboratif et vraiment agréable. La communication est bidirectionnelle ici, du plus récent employé à la direction.",
    cultureBody2: "Vous trouverez le rythme d'une start-up, soutenu par la stabilité et les avantages d'un groupe établi. Nous cherchons des personnes qui partagent notre passion pour un travail exceptionnel. Si c'est vous, nous aimerions voir votre CV.",
  },
  es: {
    cultureBody1: "Indexia Group es una organización de aprendizaje, y nuestra cultura comienza con nuestro equipo. Invertimos en nuestro personal — las últimas herramientas, formación real, horarios flexibles y un lugar de trabajo colaborativo y genuinamente divertido. La comunicación fluye en ambas direcciones, desde el empleado más nuevo hasta la gerencia.",
    cultureBody2: "Encontrarás el ritmo de una start-up, respaldado por la estabilidad y los beneficios de un grupo establecido. Buscamos personas que compartan nuestra pasión por hacer un trabajo excepcional. Si eres tú, nos encantaría ver tu currículum.",
  },
  el: {
    cultureBody1: "Η Indexia Group είναι ένας οργανισμός μάθησης, και ο πολιτισμός μας ξεκινά από την ομάδα μας. Επενδύουμε στους ανθρώπους μας — τα πιο πρόσφατα εργαλεία, πραγματική εκπαίδευση, ευέλικτες ώρες και έναν συνεργατικό και γνήσια διασκεδαστικό χώρο εργασίας. Η επικοινωνία εδώ είναι δίοδος, από τον πιο πρόσφατο υπάλληλο έως τη διοίκηση.",
    cultureBody2: "Θα βρείτε τον ρυθμό μιας start-up, υποστηριζόμενη από τη σταθερότητα και τα οφέλη ενός καθιερωμένου ομίλου. Ψάχνουμε άτομα που μοιράζονται το πάθος μας για εξαιρετική εργασία. Αν είσαστε εσείς, θα χαρούμε να δούμε το βιογραφικό σας.",
  },
  he: {
    cultureBody1: "קבוצת אינדקסיה היא ארגון למידה, והתרבות שלנו מתחילה מהצוות שלנו. אנחנו משקיעים באנשים שלנו — הכלים האחרונים, הכשרה אמיתית, שעות גמישות וסביבת עבודה שיתופית ומהנה באמת. התקשורת כאן הולכת לשני הכיוונים, מהעובד החדש ביותר דרך ההנהלה.",
    cultureBody2: "תמצאו את קצב של סטארט-אפ, מגובה על ידי היציבות והיתרונות של קבוצה מבוססת. אנחנו מחפשים אנשים ששותפים לתשוקה שלנו לעשייה יוצאת דופן. אם זה אתם, נשמח לראות את קורות החיים שלכם.",
  },
  id: {
    cultureBody1: "Indexia Group adalah organisasi pembelajaran, dan budaya kami dimulai dari tim kami. Kami berinvestasi pada orang-orang kami — alat terbaru, pelatihan nyata, jam kerja fleksibel, dan tempat kerja yang kolaboratif dan benar-benar menyenangkan. Komunikasi di sini berjalan dua arah, dari karyawan terbaru hingga manajemen.",
    cultureBody2: "Anda akan menemukan kecepatan start-up, didukung oleh stabilitas dan manfaat grup yang sudah mapan. Kami mencari orang yang membagi semangat kami untuk melakukan pekerjaan luar biasa. Jika itu Anda, kami ingin melihat resume Anda.",
  },
  it: {
    cultureBody1: "Indexia Group è un'organizzazione di apprendimento, e la nostra cultura inizia dal nostro team. Investiamo nelle nostre persone — gli strumenti più recenti, una formazione reale, orari flessibili e un posto di lavoro collaborativo e genuinamente divertente. La comunicazione qui va in entrambe le direzioni, dal dipendente più recente alla gestione.",
    cultureBody2: "Troverai il ritmo di una start-up, supportato dalla stabilità e dai vantaggi di un gruppo affermato. Cerchiamo persone che condividano la nostra passione per un lavoro eccezionale. Se sei tu, ci piacerebbe vedere il tuo curriculum.",
  },
  nl: {
    cultureBody1: "Indexia Group is een lerende organisatie, en onze cultuur begint bij ons team. We investeren in onze mensen — de nieuwste tools, echte training, flexibele uren en een werkplek die collaboratief en echt leuk is. Communicatie gaat hier in beide richtingen, van de nieuwste medewerker tot het management.",
    cultureBody2: "Je vindt het tempo van een start-up, ondersteund door de stabiliteit en voordelen van een gevestigde groep. We zoeken mensen die onze passie delen voor uitzonderlijk werk. Als dat jij bent, willen we graag je CV zien.",
  },
  pl: {
    cultureBody1: "Indexia Group to organizacja ucząca się, a nasza kultura zaczyna się od naszego zespołu. Inwestujemy w naszych ludzi — najnowsze narzędzia, prawdziwe szkolenia, elastyczne godziny i miejsce pracy, które jest colaboratywne i naprawdę zabawne. Komunikacja tutaj odbywa się w obie strony, od najnowszego pracownika aż po kierownictwo.",
    cultureBody2: "Znajdziesz tempo start-upu, wsparte stabilnością i korzyściami ugruntowanej grupy. Szukamy ludzi, którzy podzielają naszą pasję do wykonywania wyjątkowej pracy. Jeśli to Ty, chętnie zobaczymy Twoje CV.",
  },
  pt: {
    cultureBody1: "Indexia Group é uma organização de aprendizagem, e nossa cultura começa com nossa equipe. Investimos em nossas pessoas — as ferramentas mais recentes, treinamento real, horários flexíveis e um local de trabalho colaborativo e genuinamente divertido. A comunicação aqui flui em ambas as direções, do funcionário mais novo até a gerência.",
    cultureBody2: "Você encontrará o ritmo de uma start-up, apoiado pela estabilidade e benefícios de um grupo estabelecido. Procuramos pessoas que compartilhem nossa paixão por trabalho excepcional. Se é você, adoraríamos ver seu currículo.",
  },
  ru: {
    cultureBody1: "Indexia Group — это обучающаяся организация, и наша культура начинается с нашей команды. Мы инвестируем в наших людей — новейшие инструменты, реальное обучение, гибкий график и по-настоящему веселую рабочую среду. Здесь коммуникация идёт в обоих направлениях, от самого нового сотрудника до руководства.",
    cultureBody2: "Вы найдёте темп стартапа, поддержанный стабильностью и преимуществами устоявшейся группы. Мы ищем людей, которые разделяют нашу страсть к выдающейся работе. Если это вы, мы будем рады увидеть ваше резюме.",
  },
  sv: {
    cultureBody1: "Indexia Group är en lärande organisation, och vår kultur börjar med vårt team. Vi investerar i våra anställda — de senaste verktygen, riktig utbildning, flexibla arbetstimmar och en arbetsplats som är samarbetande och genuint rolig. Kommunikationen här går åt båda hållen, från den nyaste anställda till ledningen.",
    cultureBody2: "Du hittar tempot hos en start-up, stödd av stabiliteten och förmånerna hos en etablerad grupp. Vi söker människor som delar vår passion för att göra exceptionellt arbete. Om det är dig, skulle vi gärna se ditt CV.",
  },
  th: {
    cultureBody1: "อินเด็กเซีย กรุ๊ปเป็นองค์กรแห่งการเรียนรู้ และวัฒนธรรมของเราเริ่มต้นจากทีมของเรา เราลงทุนในพนักงานของเรา — เครื่องมือล่าสุด การฝึกอบรมจริง ชั่วโมงการทำงานที่ยืดหยุ่น และสถานที่ทำงานที่ร่วมมือกันและสนุกอย่างแท้จริง การสื่อสารที่นี่เป็นสองทาง ตั้งแต่พนักงานใหม่ล่าสุดไปจนถึงฝ่ายบริหาร",
    cultureBody2: "คุณจะได้สัมผัสจังหวะของสตาร์ทอัพ พร้อมด้วยความมั่นคงและสิทธิประโยชน์ของกลุ่มบริษัทที่มั่นคง เราค้นหาคนที่มีความหลงใใในการทำงานระดับยอดเยี่ยมเหมือนกัน ถ้าคุณเป็นคนนั้น เรายินดีที่จะดูเรซูเม่ของคุณ",
  },
  tr: {
    cultureBody1: "Indexia Group öğrenen bir kuruluştur ve kültürümüz ekibimizle başlar. İnsanlarımıza yatırım yapıyoruz — en son araçlar, gerçek eğitim, esnek çalışma saatleri ve işbirlikçi ve gerçekten eğlenceli bir iş yeri. Burada iletişim her iki yönde de yürür, en yeni çalışandan yöneticilere kadar.",
    cultureBody2: "Bir start-up'ın ritmini, yerleşik bir grubun istikrarı ve avantajlarıyla bulacaksınız. Olağanüstü iş yapma tutkumuzu paylaşan insanlar arıyoruz. Siz buysanız, özgeçmişinizi görmek isteriz.",
  },
  uk: {
    cultureBody1: "Indexia Group — це навчальна організація, і наша культура починається з нашої команди. Ми інвестуємо в наших людей — найновіші інструменти, реальне навчання, гнучкий графік і по-справжньому веселе робоче місце. Тут комунікація йде в обох напрямках, від найновішого співробітника до керівництва.",
    cultureBody2: "Ви знайдете темп стартапу, підтриманий стабільністю та перевагами встановленої групи. Ми шукаємо людей, які поділяють нашу пристрасть до видатної роботи. Якщо це ви, ми будемо раді побачити ваше резюме.",
  },
  vi: {
    cultureBody1: "Indexia Group là một tổ chức học hỏi, và văn hóa của chúng tôi bắt đầu từ đội ngũ của chúng tôi. Chúng tôi đầu tư vào con người — công cụ mới nhất, đào tạo thực tế, giờ làm linh hoạt và một môi trường làm việc hợp tác và thực sự thú vị. Giao tiếp ở đây diễn ra hai chiều, từ nhân viên mới nhất đến ban lãnh đạo.",
    cultureBody2: "Bạn sẽ tìm thấy nhịp độ của một start-up, được hỗ trợ bởi sự ổn định và lợi ích của một tập đoàn đã được thiết lập. Chúng tôi tìm kiếm những người chia sẻ niềm đam mê làm việc xuất sắc. Nếu đó là bạn, chúng tôi rất muốn xem sơ yếu lý lịch của bạn.",
  },
};

let totalUpdated = 0;

for (const [lang, content] of Object.entries(cultureTranslations)) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  if (!data.careersPage) data.careersPage = {};

  let changed = 0;
  for (const [key, val] of Object.entries(content)) {
    if (data.careersPage[key] !== val) {
      data.careersPage[key] = val;
      changed++;
    }
  }

  if (changed > 0) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`${lang}: ${changed} culture strings translated`);
    totalUpdated += changed;
  }
}

console.log(`\nDone. ${totalUpdated} total culture strings translated.`);
