
const slides = document.querySelectorAll('#carousel .slide');
const dotsWrap = document.getElementById('dots');
const AUTOPLAY_MS = 4000;
let current = 0;
let timer;

slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot bg-white/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('.dot');

function render() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
        dot.classList.toggle('bg-white', i === current);
        dot.classList.toggle('bg-white/40', i !== current);
    });
}

function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
}

function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
}

document.getElementById('next').addEventListener('click', () => goTo(current + 1));
document.getElementById('prev').addEventListener('click', () => goTo(current - 1));

render();
restartAutoplay();

// ---- Mobile menu ----
const posts = [
  {
    title: "Python web freymvorkini yozish. II qism.",
    date: "23 fevral 2019",
    desc: "Flask va Django kabi o'z Python freymvorkimizni yozadigan seriyaning ikkinchi posti."
  },
  {
    title: "Python web freymvorkini yozish. I qism.",
    date: "09 fevral 2019",
    desc: "Bu seriyaning birinchisi bo'lib, unda Flask va Django kabi o'z freymvorkimizni yozamiz."
  },
  {
    title: "Siz dasturchisiz, hayotingizni avtomatlashtiring!",
    date: "03 fevral 2019",
    desc: "Har kuni bir xil zerikarli ishlarni qayta-qayta bajarishni kim yoqtiradi? Ularni avtomatlashtiring!"
  },
  {
    title: "Django statik fayllar",
    date: "07 iyun 2018",
    desc: "Boshlovchilar uchun Django statik fayllari"
  },
  {
    title: "Branch by Abstraction",
    date: "08 aprel 2018",
    desc: "Branch by Abstraction nima va uni qanday amalga oshirish mumkin"
  },
  {
    title: "Python'da statik sayt generatori",
    date: "31 mart 2018",
    desc: "Statik sayt generatorlari nima? Python'da o'zingiznikini qanday yozish mumkin?"
  },
  {
    title: "Men o'qigan eng yaxshi kitoblar",
    date: "18 mart 2018",
    desc: "Bir necha yil davomida o'qigan eng yaxshi kitoblarim va ularning qisqacha mazmuni"
  },
  {
    title: "Katta dasturchi bo'lish qanday kechadi",
    date: "25 fevral 2018",
    desc: "Men qanday qilib katta dasturchi bo'ldim va siz ham buni qanday qila olasiz"
  },
  {
    title: "Kubernetes bilan uzilishsiz joylashtirish",
    date: "10 fevral 2018",
    desc: "Kubernetes yordamida uzilishsiz joylashtirishga qanday erishish mumkin"
  }
];

function renderPosts(list) {
  const container = document.getElementById('postsList');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p class="text-gray-400">Hech narsa topilmadi.</p>';
    return;
  }

  list.forEach(p => {
    const div = document.createElement('div');
    div.className = 'mb-5';
    div.innerHTML = `
      <div class="text-base">
        <a href="#" class="text-blue-600 font-semibold no-underline hover:underline">${p.title}</a>
        <span class="text-gray-500 text-sm font-normal">— ${p.date}</span>
      </div>
      <div class="ml-5 mt-1 text-gray-800 text-[15px]">${p.desc}</div>
    `;
    container.appendChild(div);
  });
}

renderPosts(posts);

document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
  );
  renderPosts(filtered);
});
