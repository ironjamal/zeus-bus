// ZEUS BUS — i18n (English / Arabic)
// Adds a language switcher to the nav + mobile menu, swaps all
// data-i18n text, flips the document to RTL for Arabic, and
// remembers the choice for next visit.
(function () {

  const translations = {
    en: {
      // Nav
      "nav.home": "Home",
      "nav.about": "About",
      "nav.roles": "Roles",
      "nav.schedules": "Schedules",
      "nav.reserve": "Reserve Seat",
      "nav.reserveArrow": "Reserve Seat →",

      // Hero (index)
      "hero.chip.index": "Badr University in Assiut · Est. 2026",
      "hero.title.index": "Better vibes.<br>Better <em>rides.</em>",
      "hero.sub.index": "Safe, organized, and comfortable daily transportation for university students across Assiut. Built by students, for students.",
      "hero.book": "Book Your Seat",
      "hero.explore": "Explore Routes",
      "hero.stat.students": "Active Students",
      "hero.stat.ontime": "On-Time Rides",
      "hero.stat.lines": "Main Lines",
      "hero.stat.founded": "Founded",

      // Journey rail stops
      "rail.hero": "Hero",
      "rail.journey": "Journey",
      "rail.routes": "Routes",
      "rail.why": "Why",
      "rail.stats": "Stats",
      "rail.about": "About",
      "rail.schedule": "Schedule",
      "rail.book": "Book",
      "rail.faq": "FAQ",
      "rail.contact": "Contact",

      // Journey section
      "journey.eyebrow": "The Journey",
      "journey.title": "Four stops between you and class.",
      "journey.sub": "From opening the form to stepping off the bus — here's exactly what happens.",
      "journey.step1.tag": "01 · Choose",
      "journey.step1.title": "Choose your route",
      "journey.step1.desc": "Pick from Alb7r, Alazhar, or Elmo3lmeen — whichever line runs closest to you.",
      "journey.step2.tag": "02 · Reserve",
      "journey.step2.title": "Reserve your seat",
      "journey.step2.desc": "Fill out the official form with your route and pickup point. Takes under two minutes.",
      "journey.step3.tag": "03 · Confirm",
      "journey.step3.title": "Get confirmed",
      "journey.step3.desc": "We reply within 24 hours over WhatsApp with your pickup point and timing.",
      "journey.step4.tag": "04 · Ride",
      "journey.step4.title": "Enjoy the ride",
      "journey.step4.desc": "Clean, air-conditioned, on time — a calm start to your day on campus.",

      // Routes section
      "routes.eyebrow": "Active Lines",
      "routes.title": "Three lines. One standard.",
      "routes.sub": "Every Zeus Bus line runs the same fixed schedule and the same comfort standard, wherever you board.",
      "routes.line1.name": "Alb7r",
      "routes.line1.desc": "Northern Assiut corridor",
      "routes.line2.name": "Alazhar",
      "routes.line2.desc": "Central Assiut corridor",
      "routes.line3.name": "Elmo3lmeen",
      "routes.line3.desc": "Eastern Assiut corridor",
      "routes.time": "08:00 → 12:00",
      "routes.fullSchedule": "Full schedule",

      // Why section
      "why.eyebrow": "Why Zeus Bus",
      "why.title": "Built for students, by students.",
      "why.sub": "Everything you need for a smooth, reliable commute — every single day.",
      "why.card1.title": "Fixed schedules",
      "why.card1.desc": "Organized pickup points and reliable daily timing so you never miss a class.",
      "why.card2.title": "Comfortable buses",
      "why.card2.desc": "Clean, well-maintained rides built to give you a smooth journey every morning.",
      "why.card3.title": "Student environment",
      "why.card3.desc": "A respectful, focused atmosphere designed specifically for university students.",
      "why.card4.title": "Fast support",
      "why.card4.desc": "Quick, reliable communication through WhatsApp. We respond fast so you're never left waiting.",

      // Stats strip
      "stats.students": "Active Students",
      "stats.ontime": "On-Time Rides",
      "stats.lines": "Main Lines",

      // About preview
      "aboutPrev.eyebrow": "Who we are",
      "aboutPrev.title": "Assiut's student-focused transit network.",
      "aboutPrev.desc": "Zeus Bus was built by students who understood the daily struggle of getting to campus safely and on time. Every route, timing, and standard exists to give you back a stress-free start to your day.",
      "aboutPrev.link": "Our story",

      // Schedule preview
      "schedPrev.eyebrow": "Departures",
      "schedPrev.title": "Today's timing, at a glance.",
      "schedPrev.desc": "Same fixed schedule across all three lines. Return times shift during midterms and finals to match your exam blocks.",
      "schedPrev.link": "View full schedules",
      "schedPrev.row1.name": "08:00 → 09:00",
      "schedPrev.row1.time": "Morning",
      "schedPrev.row2.name": "10:00 → 11:00",
      "schedPrev.row2.time": "Mid-morning",
      "schedPrev.row3.name": "12:00 → 13:00",
      "schedPrev.row3.time": "Midday",
      "schedPrev.open": "Open",

      // CTA (index)
      "ctaIndex.chip": "Limited seats — reserve early",
      "ctaIndex.title": "Ready for your next journey?",
      "ctaIndex.desc": "Reserve your seat through our official form. We'll confirm within 24 hours.",
      "ctaIndex.callUs": "Call Us",

      // FAQ
      "faq.eyebrow": "Questions",
      "faq.title": "Frequently asked.",
      "faq.q1": "How do I book a seat?",
      "faq.a1": "Click \"Book Your Seat\" anywhere on the site, fill out the booking form with your route choice, and your spot will be reserved.",
      "faq.q2": "Where are the pickup locations?",
      "faq.a2": "We currently operate across three main lines in Assiut: Alb7r, Alazhar, and Elmo3lmeen. Specific stops are shared upon booking confirmation.",
      "faq.q3": "Are the buses air-conditioned?",
      "faq.a3": "Yes, all Zeus buses are fully air-conditioned and well-maintained for a comfortable, clean, and quiet ride.",
      "faq.q4": "What happens if my university schedule changes?",
      "faq.a4": "During midterms and finals, our return departure times adapt to match your actual test schedules.",
      "faq.q5": "How can I contact support?",
      "faq.a5": "Reach our team directly through our official social media channels, WhatsApp, or the contact info below.",

      // Contact
      "contact.eyebrow": "Get in Touch",
      "contact.title": "Stay connected.",
      "contact.sub": "Routes, schedules, and announcements — all in one place.",
      "contact.call.label": "Call / Book",
      "contact.whatsapp.label": "WhatsApp",
      "contact.whatsapp.value": "Join Group",
      "contact.instagram.label": "Instagram",
      "contact.facebook.label": "Facebook",
      "contact.facebook.value": "Zeus Bus",

      // Footer
      "footer.tagline": "Smart student transportation for Badr University in Assiut.",
      "footer.tagline.index": "Smart student transportation for Badr University in Assiut. Built by students, for students.",
      "footer.site": "Site",
      "footer.contact": "Contact",
      "footer.social": "Social",
      "footer.whatsappGroup": "WhatsApp Group",
      "footer.bottom.copy": "© 2026 Zeus Bus · Assiut, Egypt",
      "footer.bottom.tag": "Smart University Transportation",

      // Roles page
      "roles.chip": "Community Standards",
      "roles.title": "Our roles<br>& <em>respect.</em>",
      "roles.sub": "A shared set of standards that keep every ride calm, safe, and on time — for everyone on board.",
      "roles.card1.title": "Respect the space",
      "roles.card1.desc": "Keep the bus clean. Use trash bins and avoid leaving personal items behind so it's comfortable for the next rider too.",
      "roles.card2.title": "Volume control",
      "roles.card2.desc": "Maintain a moderate noise level. Use headphones for music or video to respect anyone studying or resting.",
      "roles.card3.title": "Safety first",
      "roles.card3.desc": "Remain seated while the bus is in motion. Avoid distracting the driver and follow all boarding instructions.",
      "roles.card4.title": "Punctuality",
      "roles.card4.desc": "Be at your designated stop 5 minutes early. Respecting the schedule helps everyone get to class on time.",
      "roles.goal.eyebrow": "The Zeus Goal",
      "roles.goal.desc": "By following these roles, we create an environment that supports every student's academic journey.",
      "roles.cta.title": "On board and on time.",
      "roles.cta.desc": "Reserve your seat and be part of a ride that works for everyone.",
      "roles.cta.viewSchedules": "View Schedules",

      // Schedules page
      "sched.chip": "Ready to go?",
      "sched.title": "Where we <em>go.</em>",
      "sched.sub": "Three lines, one fixed daily schedule. Pick your route below and check today's timing.",
      "sched.tab1": "LINE · 01 Alb7r",
      "sched.tab2": "LINE · 02 Alazhar",
      "sched.tab3": "LINE · 03 Elmo3lmeen",
      "sched.th.departs": "Departs",
      "sched.th.arrives": "Arrives",
      "sched.th.duration": "Duration",
      "sched.th.status": "Status",
      "sched.status.open": "Open",
      "sched.duration": "1h",
      "sched.note": "Schedule is shared across all three lines. Exact pickup stops are confirmed by WhatsApp after booking.",
      "sched.exam.chip": "Live Updates",
      "sched.exam.title": "Midterms & finals schedule",
      "sched.exam.desc": "To best fit your exam blocks, morning departures stay locked while return timing adapts to your test completion hours.",
      "sched.exam.point1": "Morning lines remain strictly on-time",
      "sched.exam.point2": "Flexible return intervals matching exam windows",
      "sched.book.eyebrow": "Secure your seat",
      "sched.book.title": "Reserve today, ride tomorrow.",
    },

    ar: {
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.roles": "قواعدنا",
      "nav.schedules": "المواعيد",
      "nav.reserve": "احجز مقعدك",
      "nav.reserveArrow": "احجز مقعدك ←",

      "hero.chip.index": "جامعة بدر بأسيوط · تأسست 2026",
      "hero.title.index": "أجواء أفضل.<br>رحلات <em>أفضل.</em>",
      "hero.sub.index": "مواصلات يومية آمنة ومنظمة ومريحة لطلاب الجامعات في أسيوط. صُمّمت بواسطة طلاب، من أجل طلاب.",
      "hero.book": "احجز مقعدك",
      "hero.explore": "استكشف الخطوط",
      "hero.stat.students": "طالب نشط",
      "hero.stat.ontime": "التزام بالمواعيد",
      "hero.stat.lines": "خطوط رئيسية",
      "hero.stat.founded": "تأسست",

      "rail.hero": "البداية",
      "rail.journey": "الرحلة",
      "rail.routes": "الخطوط",
      "rail.why": "لماذا",
      "rail.stats": "الأرقام",
      "rail.about": "من نحن",
      "rail.schedule": "المواعيد",
      "rail.book": "احجز",
      "rail.faq": "الأسئلة",
      "rail.contact": "تواصل",

      "journey.eyebrow": "الرحلة",
      "journey.title": "أربع خطوات بينك وبين المحاضرة.",
      "journey.sub": "من فتح النموذج إلى نزولك من الباص — إليك بالضبط ما يحدث.",
      "journey.step1.tag": "01 · اختر",
      "journey.step1.title": "اختر خط سيرك",
      "journey.step1.desc": "اختر من بين البحر، الأزهر، أو المعلمين — أقرب خط لمكانك.",
      "journey.step2.tag": "02 · احجز",
      "journey.step2.title": "احجز مقعدك",
      "journey.step2.desc": "املأ النموذج الرسمي بخط سيرك ونقطة الصعود. يستغرق أقل من دقيقتين.",
      "journey.step3.tag": "03 · تأكيد",
      "journey.step3.title": "احصل على التأكيد",
      "journey.step3.desc": "نرد خلال 24 ساعة عبر واتساب بنقطة الصعود والتوقيت.",
      "journey.step4.tag": "04 · الرحلة",
      "journey.step4.title": "استمتع بالرحلة",
      "journey.step4.desc": "نظيف، مكيّف، وفي الموعد — بداية هادئة ليومك في الجامعة.",

      "routes.eyebrow": "الخطوط النشطة",
      "routes.title": "ثلاثة خطوط. معيار واحد.",
      "routes.sub": "كل خط من خطوط زيوس باص يسير بنفس الموعد الثابت ونفس معيار الراحة، أينما ركبت.",
      "routes.line1.name": "البحر",
      "routes.line1.desc": "ممر شمال أسيوط",
      "routes.line2.name": "الأزهر",
      "routes.line2.desc": "ممر وسط أسيوط",
      "routes.line3.name": "المعلمين",
      "routes.line3.desc": "ممر شرق أسيوط",
      "routes.time": "٠٨:٠٠ ← ١٢:٠٠",
      "routes.fullSchedule": "الجدول الكامل",

      "why.eyebrow": "لماذا زيوس باص",
      "why.title": "صُمّم للطلاب، بواسطة طلاب.",
      "why.sub": "كل ما تحتاجه لتنقل سلس وموثوق — كل يوم.",
      "why.card1.title": "مواعيد ثابتة",
      "why.card1.desc": "نقاط صعود منظمة وتوقيت يومي موثوق حتى لا تفوّت محاضرة أبدًا.",
      "why.card2.title": "باصات مريحة",
      "why.card2.desc": "رحلات نظيفة وجيدة الصيانة لتمنحك رحلة سلسة كل صباح.",
      "why.card3.title": "بيئة طلابية",
      "why.card3.desc": "أجواء محترمة ومركزة مصممة خصيصًا لطلاب الجامعات.",
      "why.card4.title": "دعم سريع",
      "why.card4.desc": "تواصل سريع وموثوق عبر واتساب. نرد بسرعة حتى لا تنتظر أبدًا.",

      "stats.students": "طالب نشط",
      "stats.ontime": "التزام بالمواعيد",
      "stats.lines": "خطوط رئيسية",

      "aboutPrev.eyebrow": "من نحن",
      "aboutPrev.title": "شبكة النقل الطلابية في أسيوط.",
      "aboutPrev.desc": "تأسس زيوس باص على يد طلاب فهموا المعاناة اليومية للوصول إلى الجامعة بأمان وفي الموعد. كل خط وتوقيت ومعيار موجود ليمنحك بداية يوم بلا توتر.",
      "aboutPrev.link": "قصتنا",

      "schedPrev.eyebrow": "المواعيد",
      "schedPrev.title": "توقيت اليوم، بنظرة سريعة.",
      "schedPrev.desc": "نفس الموعد الثابت عبر الخطوط الثلاثة. أوقات العودة تتغير أثناء الامتحانات لتناسب جدول اختباراتك.",
      "schedPrev.link": "عرض كل المواعيد",
      "schedPrev.row1.name": "٠٨:٠٠ ← ٠٩:٠٠",
      "schedPrev.row1.time": "الصباح",
      "schedPrev.row2.name": "١٠:٠٠ ← ١١:٠٠",
      "schedPrev.row2.time": "منتصف الصباح",
      "schedPrev.row3.name": "١٢:٠٠ ← ١٣:٠٠",
      "schedPrev.row3.time": "الظهيرة",
      "schedPrev.open": "متاح",

      "ctaIndex.chip": "مقاعد محدودة — احجز مبكرًا",
      "ctaIndex.title": "مستعد لرحلتك القادمة؟",
      "ctaIndex.desc": "احجز مقعدك عبر النموذج الرسمي. سنؤكد الحجز خلال 24 ساعة.",
      "ctaIndex.callUs": "اتصل بنا",

      "faq.eyebrow": "الأسئلة",
      "faq.title": "الأسئلة الشائعة.",
      "faq.q1": "كيف أحجز مقعدًا؟",
      "faq.a1": "اضغط على \"احجز مقعدك\" في أي مكان بالموقع، املأ نموذج الحجز باختيار خط سيرك، وسيتم حجز مقعدك.",
      "faq.q2": "أين نقاط الصعود؟",
      "faq.a2": "نعمل حاليًا عبر ثلاثة خطوط رئيسية في أسيوط: البحر، الأزهر، والمعلمين. تُشارك النقاط المحددة عند تأكيد الحجز.",
      "faq.q3": "هل الباصات مكيّفة؟",
      "faq.a3": "نعم، جميع باصات زيوس مكيّفة بالكامل وجيدة الصيانة لرحلة مريحة ونظيفة وهادئة.",
      "faq.q4": "ماذا يحدث إذا تغير جدولي الجامعي؟",
      "faq.a4": "أثناء الامتحانات، تتكيف مواعيد العودة لتناسب جدول اختباراتك الفعلي.",
      "faq.q5": "كيف أتواصل مع الدعم؟",
      "faq.a5": "تواصل مع فريقنا مباشرة عبر قنوات التواصل الاجتماعي الرسمية أو واتساب أو بيانات الاتصال أدناه.",

      "contact.eyebrow": "تواصل معنا",
      "contact.title": "ابقَ على تواصل.",
      "contact.sub": "الخطوط والمواعيد والإعلانات — كلها في مكان واحد.",
      "contact.call.label": "اتصال / حجز",
      "contact.whatsapp.label": "واتساب",
      "contact.whatsapp.value": "انضم للمجموعة",
      "contact.instagram.label": "إنستغرام",
      "contact.facebook.label": "فيسبوك",
      "contact.facebook.value": "زيوس باص",

      "footer.tagline": "مواصلات طلابية ذكية لجامعة بدر بأسيوط.",
      "footer.tagline.index": "مواصلات طلابية ذكية لجامعة بدر بأسيوط. صُمّمت بواسطة طلاب، من أجل طلاب.",
      "footer.site": "الموقع",
      "footer.contact": "تواصل",
      "footer.social": "التواصل الاجتماعي",
      "footer.whatsappGroup": "مجموعة واتساب",
      "footer.bottom.copy": "© 2026 زيوس باص · أسيوط، مصر",
      "footer.bottom.tag": "مواصلات جامعية ذكية",

      "roles.chip": "معايير المجتمع",
      "roles.title": "قواعدنا<br>و<em>احترامنا.</em>",
      "roles.sub": "مجموعة معايير مشتركة تحافظ على هدوء وأمان والتزام كل رحلة بموعدها — لكل من على متن الباص.",
      "roles.card1.title": "احترام المساحة",
      "roles.card1.desc": "حافظ على نظافة الباص. استخدم سلال المهملات وتجنّب ترك أغراضك الشخصية حتى تكون مريحة للراكب التالي أيضًا.",
      "roles.card2.title": "التحكم في الصوت",
      "roles.card2.desc": "حافظ على مستوى صوت معتدل. استخدم السماعات للموسيقى أو الفيديو احترامًا لمن يذاكر أو يرتاح.",
      "roles.card3.title": "السلامة أولًا",
      "roles.card3.desc": "ابقَ جالسًا أثناء سير الباص. تجنّب إلهاء السائق واتبع كل تعليمات الصعود.",
      "roles.card4.title": "الالتزام بالمواعيد",
      "roles.card4.desc": "كن عند نقطة صعودك المحددة قبل 5 دقائق. احترام الموعد يساعد الجميع على الوصول للمحاضرة في وقتها.",
      "roles.goal.eyebrow": "هدف زيوس",
      "roles.goal.desc": "باتباع هذه القواعد، نخلق بيئة تدعم الرحلة الأكاديمية لكل طالب.",
      "roles.cta.title": "على متن الباص وفي الموعد.",
      "roles.cta.desc": "احجز مقعدك وكن جزءًا من رحلة تعمل لصالح الجميع.",
      "roles.cta.viewSchedules": "عرض المواعيد",

      "sched.chip": "مستعد للانطلاق؟",
      "sched.title": "إلى أين <em>نذهب.</em>",
      "sched.sub": "ثلاثة خطوط، وموعد يومي ثابت واحد. اختر خط سيرك أدناه وتحقق من توقيت اليوم.",
      "sched.tab1": "خط · ٠١ البحر",
      "sched.tab2": "خط · ٠٢ الأزهر",
      "sched.tab3": "خط · ٠٣ المعلمين",
      "sched.th.departs": "الانطلاق",
      "sched.th.arrives": "الوصول",
      "sched.th.duration": "المدة",
      "sched.th.status": "الحالة",
      "sched.status.open": "متاح",
      "sched.duration": "ساعة",
      "sched.note": "الموعد مشترك بين الخطوط الثلاثة. تُؤكَّد نقاط الصعود الدقيقة عبر واتساب بعد الحجز.",
      "sched.exam.chip": "تحديثات مباشرة",
      "sched.exam.title": "جدول امتحانات المنتصف والنهاية",
      "sched.exam.desc": "لتناسب جدول امتحاناتك بأفضل شكل، تبقى مواعيد الصباح ثابتة بينما يتكيف موعد العودة مع وقت انتهاء اختبارك.",
      "sched.exam.point1": "خطوط الصباح تلتزم بالموعد بدقة",
      "sched.exam.point2": "فترات عودة مرنة تناسب مواعيد الامتحانات",
      "sched.book.eyebrow": "أمّن مقعدك",
      "sched.book.title": "احجز اليوم، سافر غدًا.",
    }
  };

  const STORAGE_KEY = "zeus-lang";

  function getSavedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.documentElement.setAttribute("lang", lang === "ar" ? "ar" : "en");
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll(".lang-switch button, .lang-switch-mobile button").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    saveLang(lang);
  }

  function initSwitchers() {
    document.querySelectorAll(".lang-switch button, .lang-switch-mobile button").forEach((btn) => {
      btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSwitchers();
    const saved = getSavedLang();
    applyLanguage(saved === "ar" ? "ar" : "en");
  });
})();
