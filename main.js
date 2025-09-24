// العناصر الرئيسية
const count1 = document.getElementById("count1");
const count2 = document.getElementById("count2");
const al_aya = document.getElementById("al_aya");
const section = document.getElementById("count");
const al_gwaiz = document.getElementById("al_gwaiz");
const imgs = document.querySelectorAll("#about img, #ayat p");
let started = false;

// الآيات اليومية
const ayat = [
  "«دَعُوا ٱلْأَوْلادَ يَأْتُونَ إِلَيَّ، وَلاَ تَمْنَعُوهُمْ» (مرقس 10:14)",
  "«ٱلرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ» (مزمور 23:1)",
  "«ٱحْفَظْ لِسَانَكَ مِنَ ٱلشَّرِّ، وَشَفَتَيْكَ مِنَ ٱلْغِشِّ» (مزمور 34:13)",
  "«أَحِبُّوا بَعْضُكُمْ بَعْضًا» (يوحنا 13:34)",
  "«كُلُّ مَا تَعْمَلُونَ، فَٱعْمَلُوا مِنَ ٱلْقَلْبِ كَمَا لِلرَّبِّ» (كولوسي 3:23)"
];

// عداد الأرقام
function counts() {
  let sum1 = 0, sum2 = 0;
  const interval = setInterval(() => {
    if (sum1 < 18) count1.textContent = ++sum1;
    if (sum2 < 4) count2.textContent = ++sum2;
    if (sum1 >= 18 && sum2 >= 4) clearInterval(interval);
  }, 350);
}

// تفعيل العداد عند الوصول للسكشن
function startOnScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= section.offsetTop && !started) {
      counts();
      started = true;
    }
  });
}

// عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // عرض آية اليوم
  const index = new Date().getDate() % ayat.length;
  al_aya.textContent = ayat[index];

  // إنشاء Observer لجميع العناصر المتحركة
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  // مراقبة الصور والفقرات
  imgs.forEach(el => observer.observe(el));

  // مراقبة سكشن الجوائز
  observer.observe(al_gwaiz);

  // تفعيل العداد عند scroll
  startOnScroll();
});










// أسئلة الأصحاح
const quiz = [
  { q: "ماذا خلق الله في اليوم الأول؟", options: ["الشمس والقمر", "النور والفصل بين النور والظلام", "الحيوانات"], answer: 1 },
  { q: "ماذا خلق الله في اليوم الثاني؟", options: ["السماء وفصل الماء", "اليابسة والنباتات", "الإنسان والحيوانات"], answer: 0 },
  { q: "ماذا خلق الله في اليوم الثالث؟", options: ["الشمس والقمر", "اليابسة والنباتات", "النور والظلام"], answer: 1 },
  { q: "ماذا خلق الله في اليوم الرابع؟", options: ["الشمس والقمر والنجوم", "الحيوانات", "النباتات"], answer: 0 },
  { q: "ماذا خلق الله في اليوم السادس؟", options: ["الحيوانات والإنسان", "الشمس والقمر", "النور والظلام"], answer: 0 },
];

let currentIndex = 0;
let score = 0;

// عناصر المودال
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const closeQuizBtn = document.getElementById("closeQuiz");

// عرض سؤال
function showQuestion(index){
  const q = quiz[index];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  scoreEl.textContent = `النقاط: ${score}`;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "btn btn-outline-primary";
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

// التحقق من الإجابة
function checkAnswer(selected){
  const correct = quiz[currentIndex].answer;
  if(selected === correct){
    feedbackEl.textContent = "✅ صحيح!";
    score++;
  } else {
    feedbackEl.textContent = "❌ خطأ حاول مرة أخرى!";
  }

  scoreEl.textContent = `النقاط: ${score}`;

  // الانتقال للسؤال التالي بعد ثانية
  setTimeout(() => {
    currentIndex++;
    if(currentIndex < quiz.length){
      showQuestion(currentIndex);
    } else {
      feedbackEl.textContent = `🎉 انتهت المسابقة! مجموع نقاطك: ${score} من ${quiz.length}`;
      optionsEl.innerHTML = "";
    }
  }, 1000);
}

// بدء المسابقة عند فتح المودال
document.getElementById("quizBtn").addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  showQuestion(currentIndex);
});

// إعادة ضبط النقاط عند إغلاق المودال
closeQuizBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";
  scoreEl.textContent = "";
});
