   
   document.addEventListener('DOMContentLoaded', function () {

 
  'use strict';

  const INDEX_INFO = {
    shannon: {
      icon:           '📈',
      title:          "Shannon-Wiener Diversity Index (H′)",
      value:          "H′ = 1.37",
      meaning:        "The Shannon-Wiener Index measures both species richness (how many different species are present) and species evenness (how evenly distributed the individuals are among those species). Higher values indicate greater diversity. The index typically ranges from 0 (no diversity) to 4-5 (very high diversity).",
      interpretation: "Our campus value of 1.37 indicates low to moderate diversity. This suggests that while we have several species groups present, the distribution is skewed — a few groups (like trees at ~50% and terrestrial plants at ~25%) dominate the ecosystem. There's significant room for biodiversity enhancement through habitat restoration and species introduction programs."
    },
    simpson: {
      icon:           '📉',
      title:          "Simpson's Diversity Index (1−D)",
      value:          "1−D = 0.542",
      meaning:        "Simpson's Index measures the probability that two randomly selected individuals belong to different species. The value ranges from 0 to 1, where 0 means infinite diversity and 1 means no diversity. We use (1−D) so higher values indicate greater diversity. This index is less sensitive to rare species and more focused on dominant ones.",
      interpretation: "Our campus value of 0.542 indicates moderate diversity with some dominance by certain species groups. This means if you pick two random organisms on campus, there's about a 54% chance they belong to different taxonomic groups. The inverse (D = 0.458) tells us there's a 46% probability they're from the same group, reflecting the dominance of trees and terrestrial plants in our ecosystem."
    },
    evenness: {
      icon:           '⚖️',
      title:          "Evenness Index (J)",
      value:          "J = 0.59",
      meaning:        "The Evenness Index (also called Pielou's Evenness) measures how evenly individuals are distributed across different species. It ranges from 0 to 1, where 1 means all species have equal abundance (perfectly even), and values closer to 0 indicate dominance by one or a few species. It's calculated by dividing the Shannon Index by its maximum possible value.",
      interpretation: "Our campus value of 0.59 indicates uneven distribution of species across the campus. This confirms what we see in the raw data: trees and terrestrial plants heavily dominate (making up 75% of observations), while other groups like mammals, reptiles, and amphibians are relatively rare. A more balanced ecosystem would have an evenness value closer to 0.8-1.0."
    }
  };


  /* ============================================================
     MAP SETUP
     ============================================================ */

  const map = L.map('map', { zoomControl: true }).setView([17.5449, 78.5718], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  /* Campus boundary */
  const campusLayer = L.geoJSON({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[[78.5668, 17.5485], [78.5790, 17.5485], [78.5790, 17.5380], [78.5668, 17.5380], [78.5668, 17.5485]]]
      }
    }]
  }, {
    style: { color: '#3fb950', weight: 2, fillColor: '#3fb950', fillOpacity: 0.05 }
  }).addTo(map);

  /* Urban transects */
  const TRANSECT_COORDS = [
    { id: 'L1',  pts: [[78.571010, 17.542245], [78.571856, 17.541848]] },
    { id: 'L2',  pts: [[78.575180, 17.541521], [78.575576, 17.542335]] },
    { id: 'L3',  pts: [[78.576902, 17.544862], [78.576484, 17.544049]] },
    { id: 'L4',  pts: [[78.577358, 17.544505], [78.576913, 17.543636]] },
    { id: 'L5',  pts: [[78.574620, 17.544121], [78.575478, 17.543732]] },
    { id: 'L6',  pts: [[78.576459, 17.540301], [78.576849, 17.541120]] },
    { id: 'L7',  pts: [[78.569134, 17.546008], [78.569576, 17.546806]] },
    { id: 'L8',  pts: [[78.572231, 17.544418], [78.572213, 17.544064], [78.572325, 17.543832], [78.572560, 17.543646]] },
    { id: 'L9',  pts: [[78.573085, 17.546857], [78.573978, 17.546542]] },
    { id: 'L10', pts: [[78.571318, 17.545896], [78.571716, 17.546722]] }
  ];

  const urbanTransects = L.geoJSON({
    type: 'FeatureCollection',
    features: TRANSECT_COORDS.map(t => ({
      type: 'Feature',
      properties: { id: t.id },
      geometry: { type: 'LineString', coordinates: t.pts }
    }))
  }, {
    style: { color: '#d29922', weight: 4, opacity: 0.9 },
    onEachFeature: (f, l) => l.bindPopup(`<b>Urban Transect ${f.properties.id}</b><br>Length: ~100m`)
  }).addTo(map);

  /* Forest quadrats */
  const QUADRAT_COORDS = {
    '1_1': [[78.568758,17.547811],[78.568758,17.547382],[78.568309,17.547382],[78.568309,17.547811],[78.568758,17.547811]],
    '1_2': [[78.568758,17.546954],[78.568758,17.546526],[78.568309,17.546526],[78.568309,17.546954],[78.568758,17.546954]],
    '1_3': [[78.569207,17.548239],[78.569207,17.547811],[78.568758,17.547811],[78.568758,17.548239],[78.569207,17.548239]],
    '1_4': [[78.569207,17.547382],[78.569207,17.546954],[78.568758,17.546954],[78.568758,17.547382],[78.569207,17.547382]],
    '1_5': [[78.570555,17.547811],[78.570555,17.547382],[78.570106,17.547382],[78.570106,17.547811],[78.570555,17.547811]],
    '2_1': [[78.568054,17.543482],[78.568054,17.543054],[78.567605,17.543054],[78.567605,17.543482],[78.568054,17.543482]],
    '2_2': [[78.568503,17.545623],[78.568503,17.545195],[78.568054,17.545195],[78.568054,17.545623],[78.568503,17.545623]],
    '3_1': [[78.570938,17.547167],[78.570938,17.546739],[78.570489,17.546739],[78.570489,17.547167],[78.570938,17.547167]],
    '4_1': [[78.569260,17.545005],[78.569260,17.544577],[78.568811,17.544577],[78.568811,17.545005],[78.569260,17.545005]]
  };

  const ZONE_STYLES = {
    1: { color: '#e91e63', fill: '#e91e63' },
    2: { color: '#f44336', fill: '#f44336' },
    3: { color: '#2196f3', fill: '#2196f3' }
  };

  const ZONE_GROUPS = { 1: L.featureGroup(), 2: L.featureGroup(), 3: L.featureGroup() };

  Object.entries(QUADRAT_COORDS).forEach(([id, ring]) => {
    const zone  = id.startsWith('1_') ? 1 : id.startsWith('2_') ? 2 : 3;
    const style = ZONE_STYLES[zone];
    L.polygon(ring.map(c => [c[1], c[0]]), {
      color:       style.color,
      weight:      2,
      fillColor:   style.fill,
      fillOpacity: 0.25
    })
    .bindPopup(`<b>Quadrat ${id}</b><br>Zone ${zone} (Forested)<br>Size: 50×50m`)
    .addTo(ZONE_GROUPS[zone]);
  });

  Object.values(ZONE_GROUPS).forEach(g => g.addTo(map));
  const forestQuadrats = L.featureGroup(Object.values(ZONE_GROUPS));

  /* Garden & Water sampling points */
  const GARDEN_POINTS = [
    { id: 'P1', lat: 17.544619, lon: 78.572950 },
    { id: 'P2', lat: 17.543966, lon: 78.572558 },
    { id: 'P3', lat: 17.541329, lon: 78.574112 },
    { id: 'P4', lat: 17.541171, lon: 78.574551 },
    { id: 'P5', lat: 17.544723, lon: 78.574424 },
    { id: 'P6', lat: 17.542566, lon: 78.574784 },
    { id: 'P7', lat: 17.545151, lon: 78.571053 },
    { id: 'P8', lat: 17.545941, lon: 78.569690 }
  ];

  const WATER_POINTS = [
    { id: 'W1', lat: 17.544299, lon: 78.573217 },
    { id: 'W2', lat: 17.546605, lon: 78.571864 }
  ];

  function makeMarker(p, color, emoji) {
    const m = L.circleMarker([p.lat, p.lon], {
      radius:      8,
      color:       color,
      fillColor:   color,
      fillOpacity: 0.7,
      weight:      2
    });
    m.bindPopup(
      `<b>${emoji} Point ${p.id}</b><br>` +
      `Lat: ${p.lat.toFixed(6)}<br>` +
      `Lon: ${p.lon.toFixed(6)}<br>` +
      `<button class="view-species-btn" onclick="openSpeciesModal('${p.id}')">🌿 View Species</button>`
    );
    return m;
  }

  const gardensLayer    = L.featureGroup(GARDEN_POINTS.map(p => makeMarker(p, '#9b59b6', '🌿'))).addTo(map);
  const waterBodiesLayer = L.featureGroup(WATER_POINTS.map(p  => makeMarker(p, '#58a6ff', '💧'))).addTo(map);
  const pointsLayer     = L.featureGroup([gardensLayer, waterBodiesLayer]);

  map.fitBounds(
    L.featureGroup([campusLayer, urbanTransects, forestQuadrats, pointsLayer]).getBounds(),
    { padding: [20, 20] }
  );

  L.control.layers(null, {
    'Urbanized areas':  urbanTransects,
    'Forested areas':   forestQuadrats,
    'Water bodies':     waterBodiesLayer,
    'Gardens & lawns':  gardensLayer
  }, { collapsed: false, position: 'topright' }).addTo(map);

  /* Map navigation buttons */
  document.getElementById('btn-campus').onclick  = () => map.fitBounds(campusLayer.getBounds(),    { padding: [20, 20] });
  document.getElementById('btn-urban').onclick   = () => map.fitBounds(urbanTransects.getBounds(), { padding: [20, 20] });
  document.getElementById('btn-forests').onclick = () => map.fitBounds(forestQuadrats.getBounds(), { padding: [20, 20] });
  document.getElementById('btn-points').onclick  = () => map.fitBounds(pointsLayer.getBounds(),    { padding: [20, 20] });


  /* ============================================================
     SPECIES MODAL
     ============================================================ */
window.openSpeciesModal = function(id) {
    const d = SPECIES[id];
    if (!d) return;

    document.getElementById('speciesImg').src      = d.img;
    document.getElementById('sp-name').textContent      = d.name;
    document.getElementById('sp-sci').textContent       = d.sci;
    document.getElementById('sp-name-back').textContent = d.name;
    document.getElementById('sp-location').textContent  = d.location;
    document.getElementById('sp-habitat').textContent   = d.habitat;
    document.getElementById('sp-desc').textContent      = d.desc;
    document.getElementById('sp-extra').textContent     = d.extra;

    document.getElementById('flipCard').classList.remove('flipped');
    document.getElementById('speciesModal').classList.add('open');
  }

 window.closeSpeciesModal = function() {
  document.getElementById('speciesModal').classList.remove('open');
  setTimeout(() => document.getElementById('flipCard').classList.remove('flipped'), 300);
}

window.flipCard = function() {
  document.getElementById('flipCard').classList.toggle('flipped');
}

  document.getElementById('speciesModal').addEventListener('click', e => {
    if (e.target === document.getElementById('speciesModal')) closeSpeciesModal();
  });


  /* ============================================================
     SHARED CHART DEFAULTS
     ============================================================ */

  const CHART_DEFAULTS = {
    responsive:          true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(22, 27, 38, 0.98)',
        titleColor:      '#e6edf3',
        bodyColor:       '#8b96a5',
        borderColor:     '#3d4a5e',
        borderWidth:     1,
        padding:         14
      }
    }
  };

  function destroyChart(ref) {
    if (ref) ref.destroy();
    return null;
  }


  /* ============================================================
     COMPARATIVE INDEX MODAL
     ============================================================ */

  let indexChart = null;
window.openIndexModal= function(type) {
    const d = INDEX_DATA[type];
    if (!d) return;
    document.getElementById('idx-icon').textContent       = d.icon;
    document.getElementById('idx-title').textContent      = d.title;
    document.getElementById('idx-col-header').textContent = d.colHeader;

    indexChart = destroyChart(indexChart);
    indexChart = new Chart(document.getElementById('indexChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels:   d.rows.map(r => r.habitat),
        datasets: [{
          data:            d.rows.map(r => r.value),
          backgroundColor: d.rows.map(r => r.color),
          borderColor:     d.rows.map(r => r.color),
          borderWidth:     2,
          borderRadius:    8
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        scales: {
          y: { beginAtZero: true, ticks: { color: '#8b96a5' }, grid: { color: '#2a3441' } },
          x: { ticks: { color: '#8b96a5' }, grid: { display: false } }
        },
        plugins: {
          ...CHART_DEFAULTS.plugins,
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: { label: ctx => `${d.colHeader}: ${ctx.parsed.y.toFixed(3)}` }
          }
        }
      }
    });

    document.getElementById('idx-table-body').innerHTML = d.rows
      .map(r => `<tr><td class="habitat-label">${r.habitat}</td><td><strong>${r.value.toFixed(3)}</strong></td></tr>`)
      .join('');

    document.getElementById('idx-insights').innerHTML = d.insights
      .map(i => `<div class="insight-card"><h3>${i.title}</h3><p>${i.text}</p></div>`)
      .join('') +
      `<div class="insight-card" style="grid-column: 1 / -1;">
        <h3>📌 Key Takeaway</h3><p>${d.takeaway}</p>
      </div>`;

    document.getElementById('indexModal').classList.add('open');
  }

  window.closeIndexModal = function() {
  document.getElementById('indexModal').classList.remove('open');
  indexChart = destroyChart(indexChart);
}

  document.getElementById('indexModal').addEventListener('click', e => {
    if (e.target === document.getElementById('indexModal')) closeIndexModal();
  });


  /* ============================================================
     HABITAT COMPOSITION MODAL
     ============================================================ */

  let habBarChart = null;


  window.openHabitatModal = function(type) {
    const d = HABITAT_DATA[type];
    if (!d) return;

    document.getElementById('hab-icon').textContent  = d.icon;
    document.getElementById('hab-title').innerHTML   = `${d.title} <span style="font-size:16px;font-weight:400;opacity:0.7">${d.subtitle}</span>`;
    document.getElementById('hab-desc').textContent  = d.desc;

    habBarChart = destroyChart(habBarChart);
    habBarChart = new Chart(document.getElementById('habBarChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels:   d.rows.map(r => r.label),
        datasets: [{
          data:            d.rows.map(r => r.count),
          backgroundColor: d.rows.map(r => r.color),
          borderColor:     d.rows.map(r => r.color),
          borderWidth:     2,
          borderRadius:    6
        }]
      },
      options: {
        ...CHART_DEFAULTS,
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, ticks: { color: '#8b96a5', font: { size: 11 } }, grid: { color: '#2a3441' } },
          y: { ticks: { color: '#8b96a5', font: { size: 11 } }, grid: { display: false } }
        },
        plugins: {
          ...CHART_DEFAULTS.plugins,
          tooltip: {
            ...CHART_DEFAULTS.plugins.tooltip,
            callbacks: { label: ctx => `Count: ${ctx.parsed.x.toLocaleString()}` }
          }
        }
      }
    });

    document.getElementById('habitatModal').classList.add('open');
  }

 window.closeHabitatModal = function() {
  document.getElementById('habitatModal').classList.remove('open');
  habBarChart = destroyChart(habBarChart);
}

  document.getElementById('habitatModal').addEventListener('click', e => {
    if (e.target === document.getElementById('habitatModal')) closeHabitatModal();
  });


  /* ============================================================
     ORNAMENTAL GALLERY MODAL
     ============================================================ */

  let ornGallery = [];
  let ornIdx     = 0;


  window.openOrnamentalGallery = function(type) {
    const d = ORNAMENTAL_DATA[type];
    if (!d || !d.images.length) return;

    ornGallery = d.images;
    ornIdx     = 0;

    document.getElementById('orn-title').textContent = d.title;
    renderOrnamental();
    document.getElementById('ornamentalModal').classList.add('open');
  }

  function renderOrnamental() {
    const img = ornGallery[ornIdx];
    document.getElementById('orn-img').src              = img.src;
    document.getElementById('orn-name').textContent     = img.name;
    document.getElementById('orn-counter').textContent  = `${ornIdx + 1} / ${ornGallery.length}`;
    document.getElementById('orn-prev').disabled        = ornIdx === 0;
    document.getElementById('orn-next').disabled        = ornIdx === ornGallery.length - 1;
  }

  window.ornNavigate = function(dir) {
  ornIdx = Math.max(0, Math.min(ornGallery.length - 1, ornIdx + dir));
  renderOrnamental();
}

  window.closeOrnamentalModal = function() {
  document.getElementById('ornamentalModal').classList.remove('open');
}

  document.getElementById('ornamentalModal').addEventListener('click', e => {
    if (e.target === document.getElementById('ornamentalModal')) closeOrnamentalModal();
  });


  /* ============================================================
     INDEX INFO MODAL
     ============================================================ */

  window.openIndexInfo = function(type)  {
    const info = INDEX_INFO[type];
    if (!info) return;

    document.getElementById('info-icon').textContent           = info.icon;
    document.getElementById('info-title').textContent          = info.title;
    document.getElementById('info-value').textContent          = info.value;
    document.getElementById('info-meaning').textContent        = info.meaning;
    document.getElementById('info-interpretation').textContent = info.interpretation;

    document.getElementById('indexInfoModal').classList.add('open');
  }

window.closeIndexInfoModal = function() {
  document.getElementById('indexInfoModal').classList.remove('open');
}

  document.getElementById('indexInfoModal').addEventListener('click', e => {
    if (e.target === document.getElementById('indexInfoModal')) closeIndexInfoModal();
  });


});