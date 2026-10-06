---
layout: splash
title: "Spread the propaganda"
permalink: /hire-me/spread/
author_profile: false
---

<style>
.spread-page {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  min-height: calc(100svh - 9rem);
  display: grid;
  place-items: center;
  padding: 2rem 1.25rem;
  text-align: center;
  background: var(--global-bg-color, #1f2523);
  color: var(--global-text-color, #e6ece9);
}

.spread-card {
  width: min(100%, 26rem);
}

.spread-card h1 {
  margin: 0 0 0.4rem;
  font-size: clamp(1.8rem, 6vw, 2.6rem);
  line-height: 1.05;
  color: var(--global-text-color, #e6ece9);
}

.spread-card p {
  margin: 0.4rem 0 1.2rem;
  font-size: 1.05rem;
}

.qr-tile {
  display: inline-block;
  padding: 1rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 0.75rem 2.5rem rgba(0, 0, 0, 0.5);
}

#qr-canvas {
  display: block;
  width: min(70vw, 18rem);
  height: min(70vw, 18rem);
  image-rendering: pixelated;
}

.qr-url {
  margin-top: 1rem;
  font-size: 0.9rem;
  word-break: break-all;
  opacity: 0.8;
}

.spread-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  margin-top: 1.2rem;
}

.spread-actions a,
.spread-actions button {
  padding: 0.6rem 1.1rem;
  border: 2px solid var(--global-link-color, #6dc2b8);
  border-radius: 0.4rem;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  color: var(--global-link-color, #6dc2b8);
  background: transparent;
}

.spread-actions .primary {
  background: var(--global-link-color, #6dc2b8);
  color: var(--global-bg-color, #1f2523);
}

@media print {
  .spread-actions { display: none; }
}
</style>

<div class="spread-page">
  <section class="spread-card">
    <h1>Scan it. Hire Amman.</h1>
    <p>Show this to anyone who might have a job. Or a friend with a phone.</p>
    <div class="qr-tile"><canvas id="qr-canvas" aria-label="QR code linking to the hire-me page"></canvas></div>
    <div class="qr-url" id="qr-url"></div>
    <div class="spread-actions">
      <button class="primary" id="share-btn" type="button">Share link</button>
      <button id="download-btn" type="button">Download QR</button>
      <a href="{{ '/hire-me/' | relative_url }}">Back to the spiral</a>
    </div>
  </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
<script>
(function () {
  var target = window.location.origin + "{{ '/hire-me/' | relative_url }}";
  document.getElementById('qr-url').textContent = target;

  var qr = qrcode(0, 'M');
  qr.addData(target);
  qr.make();

  var n = qr.getModuleCount();
  var scale = 12, quiet = 2;
  var size = (n + quiet * 2) * scale;
  var canvas = document.getElementById('qr-canvas');
  canvas.width = size; canvas.height = size;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#111';
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      if (qr.isDark(r, c)) ctx.fillRect((c + quiet) * scale, (r + quiet) * scale, scale, scale);
    }
  }

  document.getElementById('download-btn').addEventListener('click', function () {
    var a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'hire-amman-qr.png';
    a.click();
  });

  var shareBtn = document.getElementById('share-btn');
  shareBtn.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({ title: 'Hire Amman', url: target }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(target).then(function () {
        shareBtn.textContent = 'Link copied';
        setTimeout(function () { shareBtn.textContent = 'Share link'; }, 1800);
      });
    }
  });
})();
</script>