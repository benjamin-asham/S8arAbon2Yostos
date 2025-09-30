// --------------------- استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, 
  doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// --------------------- إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNj0P9AgNazzEN86oLrMo0hzMg6E34R6U",
  authDomain: "benjaminasham-9c7d2.firebaseapp.com",
  projectId: "benjaminasham-9c7d2",
  storageBucket: "benjaminasham-9c7d2.appspot.com",
  messagingSenderId: "182864629177",
  appId: "1:182864629177:web:65e67ae295ecdb6b84ba68",
  measurementId: "G-8RHE4H5JYV"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --------------------- عناصر عامة
const count1 = document.getElementById("count1");
const count2 = document.getElementById("count2");
const al_aya = document.getElementById("al_aya");
const section = document.getElementById("count");
const al_gwaiz = document.getElementById("al_gwaiz");
const imgs = document.querySelectorAll("#about img, #ayat p");
let started = false;

// --------------------- الآيات اليومية
const ayat = [
  "دَعُوا ٱلْأَوْلادَ يَأْتُونَ إِلَيَّ، وَلاَ تَمْنَعُوهُمْ (مرقس 10:14)",
  "ٱلرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ (مزمور 23:1)",
  "ٱحْفَظْ لِسَانَكَ مِنَ ٱلشَّرِّ، وَشَفَتَيْكَ مِنَ ٱلْغِشِّ (مزمور 34:13)",
  "أَحِبُّوا بَعْضُكُمْ بَعْضًا (يوحنا 13:34)",
  "كُلُّ مَا تَعْمَلُونَ، فَٱعْمَلُوا مِنَ ٱلْقَلْبِ كَمَا لِلرَّبِّ (كولوسي 3:23)",
  "طُوبَى لِصَانِعِي ٱلسَّلاَمِ لأَنَّهُمْ أَبْنَاءَ ٱللهِ يُدْعَوْنَ (متى 5:9)",
  "ٱللهُ مَحَبَّةٌ، وَمَنْ يَثْبُتْ فِي ٱلْمَحَبَّةِ يَثْبُتْ فِي ٱللهِ (1 يوحنا 4:16)",
  "ٱلرَّبُّ قُوَّتِي وَتَرْنِيمَتِي، وَقَدْ صَارَ لِي خَلاَصًا (مزمور 118:14)",
  "لِكُلِّ شَيْءٍ زَمَانٌ، وَلِكُلِّ أَمْرٍ تَحْتَ ٱلسَّمَاوَاتِ وَقْتٌ (جامعة 3:1)",
  "ٱلرَّبُّ قَرِيبٌ لِكُلِّ مَنْ يَدْعُوهُ، لِكُلِّ مَنْ يَدْعُوهُ بِٱلْحَقِّ (مزمور 145:18)"
];

// --------------------- عداد الأرقام
function counts() {
  let sum1 = 0, sum2 = 0;
  const interval = setInterval(() => {
    if (sum1 < 18) count1.textContent = ++sum1;
    if (sum2 < 4) count2.textContent = ++sum2;
    if (sum1 >= 18 && sum2 >= 4) clearInterval(interval);
  }, 350);
}
function startOnScroll() {
  window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= section.offsetTop && !started) {
      counts();
      started = true;
    }
  });
}

// --------------------- عناصر المسابقة
const boys = [
  "باسوتير سامح","روبن رامي","روجيه نشات","روجيه جورج","كيرلس رمسيس",
  "ايفان هاني","هاني ايمن","مارك ايهاب","مارتن ماركو","ماثيو مينا","ماثيو حنا",
  "مينا شنودة","مينا عماد","كاراس بسام","فيلوبتير مينا","يسى نسيم",
  "بيشوي دميان","ادم ناجي","test"
];
boys.sort((a, b) => a.localeCompare(b, 'ar')); 

const boySelect = document.getElementById('boySelect');
const startQuizBtn = document.getElementById('startQuizBtn');
let selectedBoy = null;
let score = 0;
let currentIndex = 0;

// تعبئة السليكت
boys.forEach(name => {
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  boySelect.appendChild(option);
});
boySelect.addEventListener('change', () => {
  selectedBoy = boySelect.value;
  startQuizBtn.disabled = false;
});

// --------------------- أسئلة المسابقة
const quiz = [
  { q: "ماذا خلق الله في اليوم الأول؟", options: ["الشمس والقمر","النور والفصل بين النور والظلام","الحيوانات"], answer: 1 },
  { q: "ماذا خلق الله في اليوم الثاني؟", options: ["السماء وفصل الماء","اليابسة والنباتات","الإنسان والحيوانات"], answer: 0 },
  { q: "ماذا خلق الله في اليوم الثالث؟", options: ["الشمس والقمر","اليابسة والنباتات","النور والظلام"], answer: 1 },
  { q: "ماذا خلق الله في اليوم الرابع؟", options: ["الشمس والقمر والنجوم","الحيوانات","النباتات"], answer: 0 },
  { q: "ماذا خلق الله في اليوم السادس؟", options: ["الحيوانات والإنسان","الشمس والقمر","النور والظلام"], answer: 0 },
  { q: "من خلق السماء والأرض؟", options: ["الله","موسى","نوح","يوسف"], answer: 0 },
  { q: "كم يومًا استغرقت الخلق؟", options: ["5 أيام","6 أيام","7 أيام","4 أيام"], answer: 1 }
];

// --------------------- عناصر المودال
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const closeQuizBtn = document.getElementById("closeQuiz");

// --------------------- الحفظ في Firebase
async function saveScore(studentName, score) {
  try {
    const ref = doc(db, "quiz_scores", studentName); 
    await setDoc(ref, { 
      name: studentName, 
      score: score,
      lastPlayed: new Date().toISOString()
    }, { merge: true });
  } catch (e) {
    console.error("حدث خطأ في الحفظ:", e);
  }
}

async function canPlay(studentName) {
  const ref = doc(db, "quiz_scores", studentName);
  const snap = await getDoc(ref);

  if (!snap.exists()) return true;
  const data = snap.data();
  if (!data.lastPlayed) return true;

  const lastPlayed = new Date(data.lastPlayed);
  const now = new Date();
  const diffDays = (now - lastPlayed) / (1000 * 60 * 60 * 24);

  return diffDays >= 7;
}

// --------------------- عرض السؤال والتحقق
function showQuestion() {
  if(currentIndex >= quiz.length) return;
  const q = quiz[currentIndex];
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

function checkAnswer(selected) {
  const correct = quiz[currentIndex].answer;
  if(selected === correct){
    feedbackEl.textContent = "✅ صحيح!";
    score++;
  } else {
    feedbackEl.textContent = "❌ خطأ حاول مرة أخرى!";
  }

  scoreEl.textContent = `النقاط: ${score}`;
  currentIndex++;

  if(currentIndex < quiz.length){
    setTimeout(showQuestion, 1000);
  } else {
    setTimeout(() => {
      feedbackEl.textContent = `🎉 انتهت المسابقة! ${selectedBoy} حصل على ${score} نقاط من ${quiz.length}.`;
      optionsEl.innerHTML = "";
      saveScore(selectedBoy, score);
    }, 1000);
  }
}

// --------------------- إعادة ضبط عند إغلاق المودال
closeQuizBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  feedbackEl.textContent = "";
  optionsEl.innerHTML = "";
  scoreEl.textContent = "";
});

// --------------------- بدء المسابقة مع تحقق 7 أيام
startQuizBtn.addEventListener("click", async () => {
  if (!selectedBoy) return;

  const allowed = await canPlay(selectedBoy);
  if (!allowed) {
    feedbackEl.textContent = ` ${selectedBoy} انت حليت المسابقه الاسبوع دا استني مسابقه الاسبوع الي جي  ⚠️`;
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
    scoreEl.textContent = "";
    return;
  }

  currentIndex = 0;
  score = 0;
  showQuestion();
});

// --------------------- Leaderboard مباشر (Top 3)
const topNames = [
  document.querySelector(".top-name1"),
  document.querySelector(".top-name2"),
  document.querySelector(".top-name3")
];
const topScores = [
  document.querySelector(".top-scor1"),
  document.querySelector(".top-scor2"),
  document.querySelector(".top-scor3")
];

function loadTopScoresRealtime() {
  try {
    const q = query(collection(db, "quiz_scores"), orderBy("score", "desc"), limit(3));
    onSnapshot(q, (snapshot) => {
      const topBoys = [];
      snapshot.forEach(doc => topBoys.push(doc.data()));

      topBoys.forEach((boy, i) => {
        if(topNames[i]) topNames[i].textContent = boy.name;
        if(topScores[i]) topScores[i].textContent = `النقاط: ${boy.score}`;
      });
    });
  } catch (e) {
    console.error("خطأ في جلب أعلى النقاط:", e);
  }
}

// --------------------- عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const index = new Date().getDate() % ayat.length;
  al_aya.textContent = ayat[index];

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  imgs.forEach(el => observer.observe(el));
  observer.observe(al_gwaiz);

  startOnScroll();
  loadTopScoresRealtime();
});




