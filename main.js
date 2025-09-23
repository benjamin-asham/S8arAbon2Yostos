const count1 = document.getElementById("count1");
const count2 = document.getElementById("count2");
const al_aya = document.getElementById("al_aya");
let section = document.getElementById("count");
const imgs = document.querySelectorAll("#about img");
const ayat_h1 = document.querySelectorAll("#ayat h1.animate");
const ayat_p = document.querySelectorAll("#ayat p.animate");
let started = false;
const ayat = [
  "«دَعُوا ٱلْأَوْلادَ يَأْتُونَ إِلَيَّ، وَلاَ تَمْنَعُوهُمْ» (مرقس 10:14)",
  "«ٱلرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ» (مزمور 23:1)",
  "«ٱحْفَظْ لِسَانَكَ مِنَ ٱلشَّرِّ، وَشَفَتَيْكَ مِنَ ٱلْغِشِّ» (مزمور 34:13)",
  "«أَحِبُّوا بَعْضُكُمْ بَعْضًا» (يوحنا 13:34)",
  "«كُلُّ مَا تَعْمَلُونَ، فَٱعْمَلُوا مِنَ ٱلْقَلْبِ كَمَا لِلرَّبِّ» (كولوسي 3:23)"
];

function counts() {
  let sum1 = 0;
  let sum2 = 0;

  let x = setInterval(function () {
    if (sum1 < 18) {
      count1.innerHTML = ++sum1;
    }
    if (sum2 < 4) {
      count2.innerHTML = ++sum2;
    }
    if (sum1 >= 18 && sum2 >= 4) {
      clearInterval(x);
    }
  }, 350);
}
function startOnScroll() {
  window.addEventListener("scroll", function () {
    let sectionTop = section.offsetTop;
    let scrollPosition = window.scrollY + window.innerHeight;
    if (scrollPosition >= sectionTop && !started) {
      counts();
      started = true;
    }
  });
}
startOnScroll(); 


document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 }); 

  imgs.forEach(img => observer.observe(img));
});
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const dayNumber = today.getDate(); 
  const index = dayNumber % ayat.length;
  al_aya.innerText = ayat[index];
});
document.addEventListener("DOMContentLoaded", () => {
  const ayatElements = document.querySelectorAll("#ayat h1, #ayat p");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  ayatElements.forEach(el => observer.observe(el));
});

