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
  "أَحِبُّوا بَعْضُكُمْ بَعْضًا، كَمَا أَحْبَبْتُكُمْ (يوحنا 15:12)",
  "طُوبَى لِلصَّغِيرِينَ فِي الرُّوحِ، لأَنَّ لَهُمْ مَلَكُوتَ السَّمَاوَاتِ (متى 5:3)",
  "فِي الْبَدْءِ كَانَ الْكَلِمَةُ، وَالْكَلِمَةُ كَانَ عِنْدَ اللهِ (يوحنا 1:1)",
  "لِكُلِّ مَا تَعْمَلُونَ، اعْمَلُوا بِالْقَلْبِ كَمَا لِلرَّبِّ (كولوسي 3:23)",
  "إِنْ كَانَ أَحَدٌ يُرِيدُ أَنْ يَكُونَ أَعْظَمَ فَلْيَكُنْ خَادِمًا لِلْجَمِيعِ (مرقس 10:44)",
  "وَكُلُّ مَا سَوْفَ تَفْعَلُونَهُ فَافْعَلُوهُ بِكُلِّ قَلْبِكُمْ (أفسس 6:7)",
  "أَلَّا تَخَافُوا، لأَنِّي مَعَكُمْ (متى 28:20)",
  "طُوبَى لِلرُّحَمَاءِ، لأَنَّهُمْ يَرْحَمُونَ (متى 5:7)",
  "الْحَقَّ أَقُولُ لَكُمْ: مَنْ لَمْ يَقْبَلِ الْمَلَكُوتَ كَالطِّفْلِ، فَلَنْ يَدْخُلَهُ (مَرْقس 10:15)",
  "لِيَكُنْ فِي كَلِمَاتِكُمْ نِعْمَةٌ، مَلْحٌ مَسَكُوبٌ (كولوسي 4:6)"
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


const quiz = [
  { 
    q: "ما هو اسم \"رئيس المجمع\" الذي جاء يطلب من بابا يسوع أن يشفي ابنته؟",
    options: [
      "بطرس",
      "يايروس",
      "يعقوب",
      "يوحنا"
    ],
    answer: 1
  },

  { 
    q: "ماذا قال بابا يسوع ليايروس عندما جاء الخادم وقال له \"بنتك ماتت خلاص\"؟",
    options: [
      "لا تزعج المعلم",
      "ارجع إلى بيتك",
      "ما تخافش آمن أنت بس وهي هتقوم",
      "البنت نائمة وليست ميتة"
    ],
    answer: 2
  },

  { 
    q: "من هم التلاميذ الثلاثة الذين أخذهم بابا يسوع معه لداخل الغرفة ليروا المعجزة؟",
    options: [
      "متى ومرقس ولوقا",
      "بطرس ويعقوب ويوحنا",
      "يوحنا وتوما ويهوذا",
      "بطرس وأندراوس وفيلبس"
    ],
    answer: 1
  },

  { 
    q: "ماذا قال بابا يسوع للناس الذين كانوا يصرخون ويبكون عندما وصل البيت؟",
    options: [
      "البنت ماتت خلاص",
      "اخرجوا جميعاً خارج البيت",
      "البنت ما ماتتش البنت نايمة",
      "صلوا لأجلها"
    ],
    answer: 2
  },

  { 
    q: "كم كان عمر بنت يايروس التي أقامها بابا يسوع من الموت؟",
    options: [
      "10 سنوات",
      "7 سنوات",
      "12 سنة",
      "15 سنة"
    ],
    answer: 2
  }
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
    const snap = await getDoc(ref);

    let newScore = score;

    // 👇 لو فيه نقاط قديمة، نجمع عليها
    if (snap.exists() && snap.data().score) {
      newScore += snap.data().score;
    }

    await setDoc(ref, { 
      name: studentName, 
      score: newScore,            // مجموع القديم + الجديد
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
















