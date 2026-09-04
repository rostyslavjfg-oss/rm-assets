/* rostyslav-marketing.com intro overlay */
(function () {
  'use strict';
  var root = document.getElementById('rm-intro');
  if (!root) return;
  var html = document.documentElement;
  if (html.className.indexOf('rm-intro-skip') !== -1) { if (root.parentNode) root.parentNode.removeChild(root); return; }
  var stage = root.querySelector('[data-rm-stage]');
  var scene = root.querySelector('[data-rm-scene]');
  var figure = root.querySelector('[data-rm-figure]');
  var zoom = root.querySelector('[data-rm-zoom]');
  var hint = root.querySelector('[data-rm-hint]');
  var closed = root.querySelector('[data-rm-img="closed"]');
  var open = root.querySelector('[data-rm-img="open"]');
  var dust = root.querySelector('[data-rm-dust]');
  var shards = root.querySelector('[data-rm-shards]');
  if (!stage || !scene || !figure || !zoom || !closed || !open) return;
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var mobile = false;
  try { mobile = window.matchMedia('(max-width: 749px)').matches; } catch (e) {}
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var mode = 'idle';
  var entered = false;
  var fxT = 0;
  var flickT = 0;
  var glitchOff = 0;
  var hidden = false;
  html.classList.add('rm-intro-lock');

  /* the overlay bleeds 64px above the viewport; the admin bar shifts fixed boxes, so re-anchor by measurement */
  var BLEED = 64;
  function anchor() {
    var r = root.getBoundingClientRect();
    var d = r.top + BLEED;
    if (Math.abs(d) < 0.5) return;
    var cur = parseFloat(root.style.top || '');
    if (isNaN(cur)) cur = -BLEED;
    root.style.top = (cur - d) + 'px';
  }

  /* hint in the visitor's language (same key the site runtime uses) */
  var HINT = { sk: 'vstúpiť', en: 'enter', uk: 'увійти' };
  var lang = 'sk';
  try { lang = localStorage.getItem('rosw_lang') || 'sk'; } catch (e) {}
  if (!HINT[lang]) lang = 'sk';
  if (hint) hint.textContent = HINT[lang];

  /* ---- sound: ambient noise loop, glitch ticks, zoom whoosh (browsers need a gesture before audio) ---- */
  var AUD = 'https://cdn.jsdelivr.net/gh/rostyslavjfg-oss/rm-assets@c39cc8a/v5/audio/';
  var SND = { sk: ['zvuk', 'zap', 'vyp'], en: ['sound', 'on', 'off'], uk: ['звук', 'увімк', 'вимк'] };
  var sndBtn = root.querySelector('[data-rm-snd]');
  var sndMuted = false;
  var sndLive = false;
  var armed = false;
  var noise = null, whoosh = null, ticks = [], tickI = 0, fadeT = 0;
  try { sndMuted = sessionStorage.getItem('rm_sound') === '0'; } catch (e) {}
  function mkAudio(name, vol, loop) {
    var a = new Audio(AUD + name);
    a.preload = 'auto';
    a.loop = !!loop;
    try { a.volume = vol; } catch (e) {}
    return a;
  }
  function sndInit() {
    if (noise) return;
    noise = mkAudio('noise-loop.mp3', 0, true);
    whoosh = mkAudio('zoom.mp3', 1, false);
    for (var i = 0; i < 3; i += 1) ticks.push(mkAudio('glitch.mp3', 0.6, false));
  }
  function quiet(p) { if (p) { if (p.then) p.then(null, function () {}); } }
  function fadeNoise(to, ms, then) {
    clearInterval(fadeT);
    if (!noise) return;
    var from = noise.volume, t0 = performance.now();
    fadeT = setInterval(function () {
      var k = Math.min(1, (performance.now() - t0) / ms);
      try { noise.volume = from + (to - from) * k; } catch (e) {}
      if (k >= 1) { clearInterval(fadeT); if (then) then(); }
    }, 40);
  }
  function sndLabel() {
    if (!sndBtn) return;
    var L = SND[lang] || SND.sk;
    var t = sndBtn.querySelector('span');
    if (t) t.textContent = L[0] + ' · ' + (sndLive ? L[1] : L[2]);
    sndBtn.setAttribute('aria-pressed', sndLive ? 'true' : 'false');
    root.classList.toggle('is-sound', sndLive);
  }
  function sndStart() {
    if (sndMuted) return;
    if (mode !== 'idle') return;
    sndInit();
    if (sndLive) return;
    var p = null;
    try { noise.volume = 0; p = noise.play(); } catch (e) {}
    if (!p) return;
    if (!p.then) return;
    p.then(function () {
      if (mode !== 'idle') { try { noise.pause(); } catch (e) {} return; }
      sndLive = true;
      armed = true;
      fadeNoise(1, 1800);
      sndLabel();
    }, function () {});
  }
  function sndStop(ms) {
    sndLive = false;
    sndLabel();
    if (!noise) return;
    fadeNoise(0, ms, function () { try { noise.pause(); } catch (e) {} });
  }
  function sfxGlitch(hard) {
    if (sndMuted) return;
    if (!armed) return;
    var a = ticks[tickI];
    tickI = (tickI + 1) % ticks.length;
    if (!a) return;
    try {
      a.pause();
      a.currentTime = 0;
      a.volume = hard ? 0.9 : 0.55;
      a.playbackRate = hard ? 0.7 + Math.random() * 0.3 : 0.9 + Math.random() * 0.5;
      quiet(a.play());
    } catch (e) {}
  }
  function sfxZoom() {
    if (sndMuted) return;
    sndInit();
    armed = true;
    try { whoosh.currentTime = 0; quiet(whoosh.play()); } catch (e) {}
    if (sndLive) fadeNoise(0, 2000);
  }
  function sndKill() {
    clearInterval(fadeT);
    try { if (noise) noise.pause(); } catch (e) {}
    for (var i = 0; i < ticks.length; i += 1) { try { ticks[i].pause(); } catch (e) {} }
  }
  if (sndBtn) {
    sndBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      armed = true;
      if (sndLive) {
        sndMuted = true;
        try { sessionStorage.setItem('rm_sound', '0'); } catch (err) {}
        sndStop(300);
      } else {
        sndMuted = false;
        try { sessionStorage.setItem('rm_sound', '1'); } catch (err) {}
        sndStart();
      }
    });
  }
  sndLabel();

  /* frames are attached from JS so the WordPress image CDN never rewrites the URLs */
  var URLS = {
    closed: mobile ? closed.getAttribute('data-rm-m') : closed.getAttribute('data-rm-d'),
    open: mobile ? open.getAttribute('data-rm-m') : open.getAttribute('data-rm-d')
  };
  closed.setAttribute('src', URLS.closed);
  open.setAttribute('src', URLS.open);
  var isOpen = false;
  function setOpen(on) {
    isOpen = !!on;
    root.classList.toggle('is-open', isOpen);
  }

  /* mask fades in from the dark once the first frame is decoded */
  var readyDone = false;
  function ready() { if (readyDone) return; readyDone = true; root.classList.add('is-ready'); sizeShards(); sndStart(); }
  if (closed.complete) { if (closed.naturalWidth > 0) ready(); }
  closed.addEventListener('load', ready);
  closed.addEventListener('error', ready);
  setTimeout(ready, 2200);

  /* ---- dust: slow drifting motes over the whole stage ---- */
  var dctx = null;
  var parts = [];
  var dw = 0, dh = 0, lastDust = 0;
  if (dust) { if (!reduced) dctx = dust.getContext('2d'); }
  function sizeDust() {
    if (!dctx) return;
    dw = stage.clientWidth; dh = stage.clientHeight;
    dust.width = Math.round(dw * DPR); dust.height = Math.round(dh * DPR);
  }
  function seedDust() {
    if (!dctx) return;
    parts = [];
    var n = mobile ? 70 : 140;
    for (var i = 0; i < n; i += 1) {
      var big = Math.random() < 0.08;
      parts.push({
        x: Math.random() * dw, y: Math.random() * dh,
        r: big ? 1.8 + Math.random() * 2.2 : 0.4 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.09, vy: -(0.015 + Math.random() * 0.075),
        a: big ? 0.05 + Math.random() * 0.08 : 0.08 + Math.random() * 0.4,
        ph: Math.random() * 6.283, tw: 0.4 + Math.random() * 1.4
      });
    }
  }
  function drawDust(now) {
    if (!dctx) return;
    dctx.clearRect(0, 0, dust.width, dust.height);
    for (var i = 0; i < parts.length; i += 1) {
      var p = parts[i];
      p.x += p.vx + Math.sin(now / 1500 + p.ph) * 0.05;
      p.y += p.vy;
      if (p.y < -4) { p.y = dh + 4; p.x = Math.random() * dw; }
      if (p.x < -4) p.x = dw + 4;
      if (p.x > dw + 4) p.x = -4;
      var al = p.a * (0.5 + 0.5 * Math.sin(now / 700 * p.tw + p.ph));
      dctx.fillStyle = 'rgba(216,212,204,' + al.toFixed(3) + ')';
      dctx.beginPath();
      dctx.arc(p.x * DPR, p.y * DPR, p.r * DPR, 0, 6.2832);
      dctx.fill();
    }
  }

  /* ---- shards: tiny displaced fragments of the mask, drawn on a canvas over the figure ---- */
  var sctx = null;
  var shardEnd = 0, shardNext = 0, shardHard = false, shardsDirty = false;
  if (shards) { if (!reduced) sctx = shards.getContext('2d'); }
  function sizeShards() {
    if (!sctx) return;
    var w = figure.clientWidth, h = figure.clientHeight;
    if (!w || !h) return;
    shards.width = Math.round(w * DPR); shards.height = Math.round(h * DPR);
  }
  function burst(hard, dur) {
    if (!sctx) return;
    sfxGlitch(hard);
    shardHard = !!hard;
    shardEnd = performance.now() + dur;
    shardNext = 0;
    root.classList.add('is-glitch');
    clearTimeout(glitchOff);
    glitchOff = setTimeout(function () { root.classList.remove('is-glitch'); }, dur);
  }
  function drawShards(now) {
    if (!sctx) return;
    if (now >= shardEnd) {
      if (shardsDirty) { sctx.clearRect(0, 0, shards.width, shards.height); shardsDirty = false; }
      return;
    }
    if (now < shardNext) return;
    shardNext = now + 42;
    var img = isOpen ? open : closed;
    if (!img.naturalWidth) return;
    var W = shards.width, H = shards.height;
    if (!W || !H) return;
    sctx.clearRect(0, 0, W, H);
    var k = shardHard ? 2.1 : 1;
    var sx = img.naturalWidth / W, sy = img.naturalHeight / H;
    var n = Math.round((shardHard ? 12 : 6) + Math.random() * 4);
    var i, x0, y0, wid, hgt, dx, dy;
    for (i = 0; i < n; i += 1) {
      y0 = (0.08 + Math.random() * 0.86) * H;
      hgt = (1 + Math.random() * 5) * DPR;
      x0 = (0.12 + Math.random() * 0.5) * W;
      wid = (0.05 + Math.random() * 0.22) * W;
      dx = (Math.random() - 0.5) * 2 * (2 + Math.random() * 8) * DPR * k;
      sctx.drawImage(img, x0 * sx, y0 * sy, wid * sx, hgt * sy, x0 + dx, y0, wid, hgt);
    }
    var m = Math.round((shardHard ? 48 : 30) + Math.random() * 14);
    for (i = 0; i < m; i += 1) {
      x0 = (0.2 + Math.random() * 0.6) * W;
      y0 = (0.06 + Math.random() * 0.9) * H;
      wid = (1 + Math.random() * 2.6) * DPR;
      dx = (Math.random() - 0.5) * 2 * (5 + Math.random() * 26) * DPR * k;
      dy = (Math.random() - 0.5) * 2 * (2 + Math.random() * 9) * DPR * k;
      sctx.drawImage(img, x0 * sx, y0 * sy, wid * sx, wid * sy, x0 + dx, y0 + dy, wid, wid);
    }
    if (Math.random() < 0.5) {
      sctx.globalAlpha = 0.28;
      sctx.fillStyle = Math.random() < 0.5 ? 'rgb(255,70,70)' : 'rgb(70,200,255)';
      sctx.fillRect((0.2 + Math.random() * 0.4) * W, Math.random() * H, (0.04 + Math.random() * 0.18) * W, DPR);
      sctx.globalAlpha = 1;
    }
    shardsDirty = true;
  }

  /* ---- one loop for dust and shards ---- */
  function tick(now) {
    if (mode === 'done') return;
    if (!hidden) {
      if (now - lastDust > 33) { lastDust = now; drawDust(now); }
      drawShards(now);
    }
    requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', function () {
    hidden = !!document.hidden;
    if (!noise) return;
    if (hidden) { try { noise.pause(); } catch (e) {} return; }
    if (sndLive) { if (mode === 'idle') { try { quiet(noise.play()); } catch (e) {} } }
  });

  /* pointer parallax (idle only) */
  var tx = 0, ty = 0, trx = 0, tryy = 0, cx = 0, cy = 0, crx = 0, cry = 0, raf = 0;
  var fly = { s: 1 };
  function apply() {
    raf = 0;
    cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12; crx += (trx - crx) * 0.12; cry += (tryy - cry) * 0.12;
    scene.style.transform = 'perspective(1200px) translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0) rotateX(' + crx.toFixed(3) + 'deg) rotateY(' + cry.toFixed(3) + 'deg)';
    zoom.style.transform = 'scale(' + fly.s.toFixed(4) + ')';
    if (mode !== 'idle') return;
    var moving = Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05 || Math.abs(trx - crx) > 0.01 || Math.abs(tryy - cry) > 0.01;
    if (moving) ask();
  }
  function ask() { if (!raf) raf = requestAnimationFrame(apply); }
  if (!reduced) {
    window.addEventListener('pointermove', function (e) {
      if (mode !== 'idle') return;
      var x = e.clientX / Math.max(window.innerWidth, 1) - 0.5;
      var y = e.clientY / Math.max(window.innerHeight, 1) - 0.5;
      tx = x * 18; ty = y * 10; trx = -y * 2.2; tryy = x * 2.6;
      ask();
    }, { passive: true });
  }

  /* idle rhythm: every 3-4 s a small shard glitch; sometimes the jaw chatters with it */
  function chatter() {
    if (mode !== 'idle') return;
    var seq = [[true, 120], [false, 110], [true, 150], [false, 0]];
    var i = 0;
    function step() {
      if (mode !== 'idle') return;
      var st = seq[i];
      if (!st) return;
      setOpen(st[0]);
      i += 1;
      setTimeout(step, st[1]);
    }
    step();
  }
  function scheduleFx() {
    if (mode !== 'idle') return;
    fxT = setTimeout(function () {
      if (mode !== 'idle') return;
      burst(false, 140 + Math.random() * 120);
      if (Math.random() < 0.4) chatter();
      scheduleFx();
    }, 3000 + Math.random() * 1000);
  }
  function flicker() {
    if (mode !== 'idle') return;
    flickT = setTimeout(function () {
      if (mode !== 'idle') return;
      root.classList.add('is-flicker');
      setTimeout(function () { root.classList.remove('is-flicker'); }, 50 + Math.random() * 50);
      if (Math.random() < 0.45) {
        setTimeout(function () {
          if (mode !== 'idle') return;
          root.classList.add('is-flicker');
          setTimeout(function () { root.classList.remove('is-flicker'); }, 40 + Math.random() * 40);
        }, 140 + Math.random() * 120);
      }
      flicker();
    }, 6000 + Math.random() * 7000);
  }

  /* fly-in easing: slow push, fast middle, soft landing */
  function clamp(n) { return Math.max(0, Math.min(1, n)); }
  function ease(n) {
    if (n <= 0) return 0;
    if (n >= 1) return 1;
    if (n < 0.38) { var a = n / 0.38; return 0.22 * a * a; }
    if (n < 0.82) { var b = (n - 0.38) / 0.44; return 0.22 + 0.68 * (b * b * (3 - 2 * b)); }
    var c = (n - 0.82) / 0.18;
    return 0.9 + 0.1 * (1 - Math.pow(1 - c, 1.35));
  }
  function signalEnter() {
    if (entered) return;
    entered = true;
    html.classList.add('rm-intro-enter');
    try { document.dispatchEvent(new CustomEvent('rm-intro-enter')); } catch (e) {}
  }
  function finish() {
    mode = 'done';
    clearTimeout(fxT);
    clearTimeout(flickT);
    clearTimeout(glitchOff);
    root.classList.remove('is-glitch');
    root.classList.remove('is-flicker');
    root.classList.add('is-done');
    root.classList.remove('is-flying');
    sndKill();
    html.classList.remove('rm-intro-lock');
    try { sessionStorage.setItem('rm_intro_seen', '1'); } catch (e) {}
    signalEnter();
    setTimeout(function () { if (root.parentNode) root.parentNode.removeChild(root); }, 800);
  }
  function flyIn() {
    if (mode !== 'idle') return;
    mode = 'flying';
    clearTimeout(fxT);
    clearTimeout(flickT);
    root.classList.add('is-flying');
    sfxZoom();
    setOpen(true);
    if (reduced) { setTimeout(finish, 180); return; }
    burst(true, 420);
    tx = 0; ty = 0; trx = 0; tryy = 0;
    var started = performance.now();
    var DUR = 2400;
    var midBurst = false;
    function run(now) {
      var t = clamp((now - started) / DUR);
      var e = ease(t);
      fly.s = 1 + e * 11;
      var dark = clamp((t - 0.42) / 0.46);
      var fade = clamp((t - 0.8) / 0.18);
      zoom.style.filter = 'brightness(' + (1 - dark * 0.94).toFixed(3) + ')';
      zoom.style.opacity = (1 - fade).toFixed(3);
      if (t >= 0.46) { if (!midBurst) { midBurst = true; burst(true, 360); } }
      if (t >= 0.62) signalEnter();
      apply();
      if (t < 1) requestAnimationFrame(run); else finish();
    }
    requestAnimationFrame(run);
  }

  function layout() {
    anchor();
    sizeDust();
    seedDust();
    sizeShards();
  }
  layout();
  window.addEventListener('resize', layout, { passive: true });
  stage.addEventListener('click', flyIn);
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flyIn(); }
  });
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var seen = false;
    try { seen = sessionStorage.getItem('rm_intro_seen') === '1'; } catch (err) {}
    if (seen) { if (mode !== 'done') finish(); }
  });
  if (!reduced) {
    scheduleFx();
    flicker();
    requestAnimationFrame(tick);
  }
  apply();
})();
