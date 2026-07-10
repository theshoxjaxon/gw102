
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






// ---------- Import-graph hero visualization ----------
(function () {
  const skills = ['react', 'typescript', 'node', 'vite', 'next.js', 'graphql', 'vue', 'docker'];
  const cx = 450, cy = 350, r = 240;
  const nodesG = document.getElementById('nodes');
  const edgesG = document.getElementById('edges');
  const colors = ['#8b7cff', '#2ee6b0', '#ff6b9d'];

  // center node
  const center = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  center.innerHTML = `
    <circle cx="${cx}" cy="${cy}" r="10" fill="#0a0d14" stroke="#2ee6b0" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="10" fill="none" stroke="#2ee6b0" stroke-width="1" opacity="0.5">
      <animate attributeName="r" values="10;26;10" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
    </circle>
    <text x="${cx}" y="${cy + 34}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="#8891a8">core.js</text>
  `;
  nodesG.appendChild(center);

  skills.forEach((name, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    const rr = r * (0.85 + (i % 3) * 0.08);
    const x = cx + Math.cos(angle) * rr;
    const y = cy + Math.sin(angle) * rr;
    const color = colors[i % colors.length];

    const edge = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    edge.setAttribute('x1', cx);
    edge.setAttribute('y1', cy);
    edge.setAttribute('x2', x);
    edge.setAttribute('y2', y);
    edge.setAttribute('stroke', color);
    edge.setAttribute('stroke-opacity', '0.35');
    edgesG.appendChild(edge);

    const node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    node.innerHTML = `
      <circle cx="${x}" cy="${y}" r="5.5" fill="${color}">
        <animate attributeName="r" values="5.5;7.5;5.5" dur="${2.5 + i * 0.3}s" repeatCount="indefinite"/>
      </circle>
      <text x="${x}" y="${y - 14}" text-anchor="middle" font-family="JetBrains Mono" font-size="11" fill="#565f75">${name}</text>
    `;
    nodesG.appendChild(node);
  });
})();

// ---------- Terminal typing effect ----------
(function () {
  const el = document.getElementById('typedBody');

  const html =
`<span class="text-violet">const</span> nurmuhammad = {
  <span class="text-[#f0c674]">role</span>: <span class="text-teal">'Frontend Engineer'</span>,
  <span class="text-[#f0c674]">stack</span>: [<span class="text-teal">'React'</span>, <span class="text-teal">'TypeScript'</span>, <span class="text-teal">'Node.js'</span>],
  <span class="text-[#f0c674]">focus</span>: <span class="text-teal">'interfaces that feel inevitable'</span>,
  <span class="text-[#f0c674]">status</span>: <span class="text-teal">'open to opportunities'</span>
};

<span class="text-violet">export default</span> nurmuhammad;`;

  const cursor = '<span class="inline-block w-[7px] h-[15px] bg-teal ml-0.5 animate-blink align-text-bottom"></span>';

  let i = 0;
  const full = html;
  const plainLength = full.replace(/<[^>]*>/g, '').length;

  function typeWriter() {
    let inTag = false;
    let count = 0;
    let result = '';
    for (let idx = 0; idx < full.length; idx++) {
      const ch = full[idx];
      result += ch;
      if (ch === '<') inTag = true;
      if (!inTag) count++;
      if (ch === '>') inTag = false;
      if (count >= i) break;
    }
    el.innerHTML = result + cursor;
    if (i < plainLength) {
      i++;
      requestAnimationFrame(() => setTimeout(typeWriter, 14));
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.innerHTML = full;
  } else {
    typeWriter();
  }
})();

// ---------- Scroll reveal ----------
(function () {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((it) => io.observe(it));
})();