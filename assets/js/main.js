// ==============================
// Active nav link
// ==============================
(() => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href.endsWith('index.html')) || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
})();

// ==============================
// Smooth scrolling for hash links
// ==============================
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ==============================
// Load releases.json on downloads page
// ==============================
async function loadReleases() {
  const wrap = document.getElementById('releases');
  if (!wrap) return;

  try {
    const res = await fetch('data/releases.json');
    const data = await res.json();

    wrap.innerHTML = data.releases.map(r => `
      <div class="card">
        <h3>${r.version} <small class="muted">(${r.date})</small></h3>
        <p>${r.notes}</p>

        <!-- Platform badges -->
        <div class="kv">
          <span>Xbox Test</span>
          <span>Steam</span>
          <span>PlayStation</span>
          <span>Epic Store</span>
          <span>PC</span>
        </div>

        <p>
          <a class="btn primary" href="${r.url}" download>Download</a>
          ${r.video ? `<a class="btn ghost" href="${r.video}" target="_blank" rel="noopener">🎥 Watch Video</a>` : ''}
        </p>
      </div>
    `).join('');
  } catch (e) {
    console.error('Error loading releases:', e);
    wrap.innerHTML = `<div class="alert">Could not load releases.</div>`;
  }
}
loadReleases();

// ==============================
// Simple lightbox for images (showcase)
// ==============================
(() => {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.9);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:9999;
  `;
  const img = document.createElement('img');
  img.style.maxWidth = '92vw';
  img.style.maxHeight = '92vh';
  img.style.border = '1px solid #103a25';
  img.style.borderRadius = '12px';
  overlay.appendChild(img);
  overlay.addEventListener('click', () => (overlay.style.display = 'none'));
  document.body.appendChild(overlay);

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.matches('.lightbox-grid img')) {
      img.src = t.src;
      overlay.style.display = 'flex';
    }
  });
})();
