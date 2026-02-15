// Pasaport Endeksi - Ana Uygulama
document.addEventListener('DOMContentLoaded', () => {
    const data = PASAPORT_DATA.sort((a, b) => a.sira - b.sira);
    const turkiye = data.find(d => d.kod === 'TR');

                            // Hero istatistiği
                            if (turkiye) {
                                  document.getElementById('stat-visa-free').textContent = turkiye.vizesiz + turkiye.varistaSiz;
                            }

                            // Pasaport Grid
                            renderPassportGrid(data, 'all');

                            // Sıralama Tablosu
                            renderRankingTable(data);

                            // Karşılaştır select doldur
                            fillSelects(data);

                            // Harita
                            initMap();

                            // Türkiye Spotlight
                            renderTurkeySpotlight(turkiye);

                            // Event Listeners
                            initEventListeners(data);
});

// ===== PASAPORT GRID =====
function renderPassportGrid(data, filter) {
    const grid = document.getElementById('passport-grid');
    let filtered = [...data];
    if (filter === 'top-20') filtered = filtered.slice(0, 20);
    else if (filter === 'visa-free') filtered = filtered.filter(d => d.vizesiz >= 100);
    grid.innerHTML = filtered.map(d => `
        <article class="passport-card" data-code="${d.kod}" tabindex="0" aria-label="${d.ulke} pasaportu, puan: ${d.puan}">
              <span class="rank-badge">#${d.sira}</span>
                    <span class="flag">${d.bayrak}</span>
                          <span class="country-name">${d.ulke}</span>
                                <span class="score">${d.puan}</span>
                                    </article>
                                      `).join('');
}

// ===== SIRALAMA TABLOSU =====
function renderRankingTable(data) {
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = data.map(d => `
        <tr>
              <td class="rank-col">${d.sira}</td>
                    <td><div class="country-col"><span class="flag">${d.bayrak}</span> ${d.ulke}</div></td>
                          <td class="visa-free">${d.vizesiz}</td>
                                <td class="visa-arrival">${d.varistaSiz}</td>
                                      <td class="evisa">${d.evize}</td>
                                            <td class="visa-required">${d.vizeGerekli}</td>
                                                  <td class="score-col">${d.puan}</td>
                                                      </tr>
                                                        `).join('');
}

// ===== SELECT DOLDUR =====
function fillSelects(data) {
    const selects = ['compare-select-1', 'compare-select-2', 'map-country-select'];
    selects.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          data.forEach(d => {
                  const opt = document.createElement('option');
                  opt.value = d.kod;
                  opt.textContent = `${d.bayrak} ${d.ulke}`;
                  el.appendChild(opt);
          });
    });
}

// ===== KARŞILAŞTIR =====
function renderCompare(id, country) {
    const el = document.getElementById(id);
    if (!country) { el.innerHTML = ''; return; }
    const total = country.vizesiz + country.varistaSiz + country.evize;
    el.innerHTML = `
        <span class="compare-flag">${country.bayrak}</span>
            <div class="compare-country-name">${country.ulke}</div>
                <div class="compare-stat"><span class="compare-stat-label">Pasaport Gücü</span><span class="compare-stat-value">${country.puan}</span></div>
                    <div class="compare-stat"><span class="compare-stat-label">Dünya Sırası</span><span class="compare-stat-value">#${country.sira}</span></div>
                        <div class="compare-stat"><span class="compare-stat-label">Vizesiz</span><span class="compare-stat-value" style="color:#2ecc71">${country.vizesiz}</span></div>
                            <div class="compare-stat"><span class="compare-stat-label">Varışta Vize</span><span class="compare-stat-value" style="color:#f39c12">${country.varistaSiz}</span></div>
                                <div class="compare-stat"><span class="compare-stat-label">E-Vize</span><span class="compare-stat-value" style="color:#3498db">${country.evize}</span></div>
                                    <div class="compare-stat"><span class="compare-stat-label">Vize Gerekli</span><span class="compare-stat-value" style="color:#e74c3c">${country.vizeGerekli}</span></div>
                                        <div class="compare-stat"><span class="compare-stat-label">Toplam Erişim</span><span class="compare-stat-value">${total} ülke</span></div>
                                            <div class="compare-stat"><span class="compare-stat-label">Nüfus</span><span class="compare-stat-value">${country.nufus}</span></div>
                                              `;
}

// ===== HARİTA =====
let map, geoLayer;
function initMap() {
    map = L.map('world-map', {
          center: [30, 20],
          zoom: 2,
          minZoom: 2,
          maxZoom: 6,
          scrollWheelZoom: true,
          zoomControl: true
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
    }).addTo(map);
}

// ===== TÜRKİYE SPOTLIGHT =====
function renderTurkeySpotlight(tr) {
    if (!tr) return;
    const statsEl = document.getElementById('turkey-stats');
    const total = tr.vizesiz + tr.varistaSiz + tr.evize;
    statsEl.innerHTML = `
        <div class="spotlight-stat-item"><span class="label">Pasaport Gücü</span><span class="value">${tr.puan}</span></div>
            <div class="spotlight-stat-item"><span class="label">Dünya Sırası</span><span class="value">#${tr.sira}</span></div>
                <div class="spotlight-stat-item"><span class="label">Vizesiz Giriş</span><span class="value">${tr.vizesiz} ülke</span></div>
                    <div class="spotlight-stat-item"><span class="label">Varışta Vize</span><span class="value">${tr.varistaSiz} ülke</span></div>
                        <div class="spotlight-stat-item"><span class="label">E-Vize</span><span class="value">${tr.evize} ülke</span></div>
                            <div class="spotlight-stat-item"><span class="label">Vize Gerekli</span><span class="value">${tr.vizeGerekli} ülke</span></div>
                                <div class="spotlight-stat-item"><span class="label">Toplam Erişim</span><span class="value">${total} ülke</span></div>
                                    <div class="spotlight-stat-item"><span class="label">Nüfus</span><span class="value">${tr.nufus}</span></div>
                                      `;
    // Chart
  const ctx = document.getElementById('turkey-chart');
    if (ctx && typeof Chart !== 'undefined') {
          new Chart(ctx, {
                  type: 'line',
                  data: {
                            labels: TURKIYE_GECMIS.map(d => d.yil),
                            datasets: [{
                                        label: 'Pasaport Gücü',
                                        data: TURKIYE_GECMIS.map(d => d.puan),
                                        borderColor: '#f5c518',
                                        backgroundColor: 'rgba(245,197,24,0.1)',
                                        fill: true,
                                        tension: 0.4,
                                        pointBackgroundColor: '#f5c518',
                                        pointRadius: 5,
                                        pointHoverRadius: 8
                            }]
                  },
                  options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                        legend: { display: false },
                                        tooltip: {
                                                      backgroundColor: '#1a1a2e',
                                                      titleColor: '#f5c518',
                                                      bodyColor: '#fff',
                                                      borderColor: 'rgba(245,197,24,0.3)',
                                                      borderWidth: 1
                                        }
                            },
                            scales: {
                                        x: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                                        y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: 60 }
                            }
                  }
          });
    }
}

// ===== EVENT LISTENERS =====
function initEventListeners(data) {
    // Filtre butonları
  document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPassportGrid(data, btn.dataset.filter);
        });
  });

  // Karşılaştır
  document.getElementById('compare-select-1')?.addEventListener('change', e => {
        const c = data.find(d => d.kod === e.target.value);
        renderCompare('compare-result-1', c);
  });
    document.getElementById('compare-select-2')?.addEventListener('change', e => {
          const c = data.find(d => d.kod === e.target.value);
          renderCompare('compare-result-2', c);
    });

  // Arama
  const searchInput = document.getElementById('ulke-ara');
    const searchBox = searchInput?.parentElement;
    if (searchInput && searchBox) {
          let resultsDiv = document.createElement('div');
          resultsDiv.className = 'search-results';
          searchBox.appendChild(resultsDiv);

      searchInput.addEventListener('input', e => {
              const q = e.target.value.toLowerCase().trim();
              if (q.length < 2) { resultsDiv.classList.remove('active'); return; }
              const results = data.filter(d => d.ulke.toLowerCase().includes(q)).slice(0, 8);
              if (results.length === 0) { resultsDiv.classList.remove('active'); return; }
              resultsDiv.innerHTML = results.map(d => `
                      <div class="search-result-item" data-code="${d.kod}">
                                <span class="flag">${d.bayrak}</span> ${d.ulke} <span style="color:#f5c518;margin-left:auto">${d.puan}</span>
                                        </div>
                                              `).join('');
              resultsDiv.classList.add('active');
      });

      resultsDiv.addEventListener('click', e => {
              const item = e.target.closest('.search-result-item');
              if (item) {
                        const code = item.dataset.code;
                        const country = data.find(d => d.kod === code);
                        if (country) {
                                    document.getElementById('compare-select-1').value = code;
                                    renderCompare('compare-result-1', country);
                                    document.getElementById('karsilastir').scrollIntoView({ behavior: 'smooth' });
                        }
                        resultsDiv.classList.remove('active');
                        searchInput.value = '';
              }
      });

      document.addEventListener('click', e => {
              if (!searchBox.contains(e.target)) resultsDiv.classList.remove('active');
      });
    }

  // Mobil menü
  const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    menuBtn?.addEventListener('click', () => {
          nav.classList.toggle('open');
          menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

  // Smooth scroll nav
  document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          nav?.classList.remove('open');
                          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                          link.classList.add('active');
                }
        });
  });

  // Header scroll effect
  window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        else header.style.boxShadow = 'none';
  });
}
