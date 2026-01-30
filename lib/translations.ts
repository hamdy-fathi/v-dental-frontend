import type { Language } from "@/lib/unified-data";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.blogs": "Blogs",
    "button.call_now": "Call Now",
    "button.appointment": "Appointment",
    "button.book_appointment": "Book appointment",
    "doctors.available": "Available Doctors",
    "doctors.select": "Select Doctor",
    "doctors.talk_to_over": "Talk to over",
    "doctors.doctor": "doctor",
    "doctors.talk_to_over_count": "",
    "branch.working_hours": "Working Hours:",
    "branch.office_address": "Office Address:",
    "footer.copyright": "All Rights Reserved.",
    "section.best_dentist": "Best Dentist",
    "section.about_services": "About Services",
    "section.patient_testimonials": "What our patient say about us",
    "blogs.hero.tag": "Blogs",
    "blogs.hero.title": "Latest insights from V Dental Clinics",
    "blogs.hero.subtitle": "Explore new treatments, oral health tips, and technology updates from our specialists.",
    "blogs.empty": "No blogs are available right now. Please check back soon.",
    "blogs.categories": "Categories",
    "blogs.categories.empty": "No categories available.",
    "blogs.sidebar.title": "Need an appointment?",
    "blogs.sidebar.text": "Talk to our dental team and book your next visit today.",
    "blogs.sidebar.cta": "Book on WhatsApp",
    "blogs.back": "Back to blogs",
    "blogs.detail.tag": "Blog",
    "blogs.detail.missing": "This blog could not be found.",
    "blogs.related": "Related blogs",
    "blogs.related.empty": "No related blogs found.",
    "blogs.category.tag": "Category",
    "blogs.category.subtitle": "Explore the latest articles in this category.",
    "blogs.category.empty": "No blogs are available for this category right now."
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.blogs": "المدونة",
    "button.call_now": "اتصل الآن",
    "button.appointment": "حجز موعد",
    "button.book_appointment": "احجز موعد",
    "doctors.available": "الأطباء المتاحون",
    "doctors.select": "اختر الطبيب",
    "doctors.talk_to_over": "تحدث مع أكثر من",
    "doctors.doctor": "طبيب",
    "doctors.talk_to_over_count": "",
    "branch.working_hours": "ساعات العمل:",
    "branch.office_address": "عنوان المكتب:",
    "footer.copyright": "جميع الحقوق محفوظة.",
    "section.best_dentist": "أفضل طبيب أسنان",
    "section.about_services": "حول الخدمات",
    "section.patient_testimonials": "ماذا يقول زائرينا عنا",
    "blogs.hero.tag": "المدونة",
    "blogs.hero.title": "أحدث المقالات من عيادات ڤي دينتال",
    "blogs.hero.subtitle": "اكتشف أحدث العلاجات ونصائح صحة الفم والتقنيات من خبرائنا.",
    "blogs.empty": "لا توجد مقالات متاحة حالياً. يرجى العودة لاحقاً.",
    "blogs.categories": "التصنيفات",
    "blogs.categories.empty": "لا توجد تصنيفات متاحة.",
    "blogs.sidebar.title": "تحتاج إلى موعد؟",
    "blogs.sidebar.text": "تواصل مع فريقنا لحجز زيارتك القادمة.",
    "blogs.sidebar.cta": "احجز عبر واتساب",
    "blogs.back": "العودة إلى المدونة",
    "blogs.detail.tag": "مدونة",
    "blogs.detail.missing": "تعذر العثور على هذه المقالة.",
    "blogs.related": "مقالات ذات صلة",
    "blogs.related.empty": "لا توجد مقالات ذات صلة.",
    "blogs.category.tag": "تصنيف",
    "blogs.category.subtitle": "استكشف أحدث المقالات في هذا التصنيف.",
    "blogs.category.empty": "لا توجد مقالات متاحة لهذا التصنيف حالياً."
  },
};

export function applyStaticTranslations(lang: Language) {
  if (typeof document === "undefined") return;

  const dictionary = translations[lang] ?? translations.en;
  document.querySelectorAll<HTMLElement>("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (!key) return;

    if (key === "doctors.talk_to_over_count") {
      const count = element.getAttribute("data-count") || "215";
      const talkToOver = dictionary["doctors.talk_to_over"] || "Talk to over";
      const doctor = dictionary["doctors.doctor"] || "doctor";
      element.innerHTML = `${talkToOver} <strong>${count}</strong> ${doctor}`;
      return;
    }

    const value = dictionary[key];
    if (value) {
      element.textContent = value;
    }
  });
}

