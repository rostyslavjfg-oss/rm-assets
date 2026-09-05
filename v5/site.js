(function(){
  var html=document.documentElement; html.classList.add('js');
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  $$('img[data-src]').forEach(function(im){ im.setAttribute('src',im.getAttribute('data-src')); });


  /* pixel icons: 8x8 maps, rendered as crisp SVG rects */
  var PX={
    spark:['...#....','...#....','.#.#.#..','..###...','#######.','..###...','.#.#.#..','...#....'],
    clock:['..####..','.#....#.','#..#...#','#..#...#','#..##..#','#......#','.#....#.','..####..'],
    rocket:['...#....','..###...','..#.#...','.#####..','.#.#.#..','#######.','#.#.#.#.','..#.#...'],
    chart:['......#.','.....##.','....###.','..#.###.','.##.###.','####.##.','######..','########'],
    euro:['...####.','..#.....','.#......','#####...','.#......','#####...','.#......','..#####.'],
    face:['..####..','.#....#.','#.#..#.#','#......#','#.#..#.#','#..##..#','.#....#.','..####..'],
    bolt:['....##..','...##...','..##....','.######.','....##..','...##...','..##....','.#......'],
    folder:['........','.###....','#...####','#......#','#......#','#......#','#......#','.######.'],
    heart:['.##..##.','#..##..#','#......#','#......#','.#....#.','..#..#..','...##...','........'],
    mail:['........','########','#.....##','#.#..#.#','#..##..#','#......#','########','........'],
    pin:['..####..','.#....#.','#..##..#','#..##..#','.#....#.','..#..#..','...##...','...##...'],
    cam:['........','.######.','#......#','#..##..#','#.#..#.#','#..##..#','#......#','.######.'],
    link:['........','.##..##.','#..##..#','#......#','#......#','#..##..#','.##..##.','........'],
    x:['#......#','.#....#.','..#..#..','...##...','...##...','..#..#..','.#....#.','#......#'],
    down:['...##...','...##...','...##...','...##...','#..##..#','.#.##.#.','..####..','...##...'],
    right:['....#...','....##..','....###.','########','########','....###.','....##..','....#...'],
    left:['...#....','..##....','.###....','########','########','.###....','..##....','...#....']
  };
  function pxSvg(name){ var m=PX[name]; if(!m) return ''; var r=''; for(var y=0;y<8;y++){ for(var x=0;x<8;x++){ if(m[y][x]==='#') r+='<rect x="'+x+'" y="'+y+'" width="1" height="1"/>'; } } return '<svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">'+r+'</svg>'; }
  $$('[data-px]').forEach(function(el){ el.innerHTML=pxSvg(el.getAttribute('data-px')); });

  /* ---------- languages (same storage key as the live site) ---------- */
  var I18N={"cta": {"en": "Get in touch <span aria-hidden=\"true\">→</span>", "uk": "Співпрацюймо <span aria-hidden=\"true\">→</span>"}, "nav_about": {"en": "About", "uk": "Про мене"}, "nav_services": {"en": "Services", "uk": "Послуги"}, "nav_results": {"en": "Results", "uk": "Результати"}, "nav_cases": {"en": "Cases", "uk": "Кейси"}, "nav_testi": {"en": "Testimonials", "uk": "Відгуки"}, "nav_contact": {"en": "Contact", "uk": "Контакти"}, "nav_blog": {"en": "Blog", "uk": "Блог"}, "foot_privacy": {"en": "Privacy policy", "uk": "Політика конфіденційності"}, "foot_legal": {"en": "Legal notice", "uk": "Юридична інформація"}, "blog_title": {"en": "Blog", "uk": "Блог"}, "blog_sub": {"en": "Notes on performance marketing, analytics and growth — from real campaigns.", "uk": "Нотатки про performance‑маркетинг, аналітику та зростання — з реальних кампаній."}, "back_home": {"en": "Back to home", "uk": "На головну"}, "nf_title": {"en": "Page not found.", "uk": "Сторінку не знайдено."}, "nf_text": {"en": "The link is wrong or the page has moved.", "uk": "Посилання хибне або сторінку перенесено."}, "availability": {"en": "Available for new projects", "uk": "Доступний для нових проєктів"}, "menu_loc": {"en": "Bratislava, SK · remote<br>Performance marketing \u0026amp; brand", "uk": "Братислава, SK · remote<br>Performance marketing \u0026amp; brand"}, "h_intro": {"en": "From strategy to results — I help brands grow through performance marketing and data.", "uk": "Від стратегії до результатів — допомагаю брендам зростати через performance‑маркетинг і дані."}, "stat1": {"en": "years in marketing", "uk": "років у маркетингу"}, "stat2": {"en": "campaigns launched", "uk": "запущених кампаній"}, "stat3s": {"en": "average ROAS", "uk": "середній ROAS"}, "stat4s": {"en": "ad spend", "uk": "ad spend"}, "stat3": {"en": "average client ROAS", "uk": "середній ROAS клієнтів"}, "stat4": {"en": "managed ad spend", "uk": "керований ad spend"}, "scroll": {"en": "scroll", "uk": "скрол"}, "h_panel_title": {"en": "I specialize in performance marketing that delivers measurable results.", "uk": "Спеціалізуюсь на performance‑маркетингу, що дає вимірювані результати."}, "h_panel_para": {"en": "I combine data, creative and strategy so every ad euro works hard. No fluff, just clear reporting.", "uk": "Поєдную дані, креатив і стратегію, щоб кожне євро в рекламі працювало на повну. Без зайвого, з чіткими звітами."}, "about_heading": {"en": "Hi, I’m <span class=\"ghost\">Rostyslav</span>", "uk": "Привіт, я <span class=\"ghost\">Rostyslav</span>"}, "flip_hint": {"en": "<i class=\"pxi\" data-px=\"right\"></i> Flip the card to learn more about me", "uk": "<i class=\"pxi\" data-px=\"right\"></i> Переверни картку — дізнаєшся більше про мене"}, "card_role": {"en": "Performance marketing \u0026amp; brand", "uk": "Performance marketing \u0026amp; brand"}, "dt_where": {"en": "Where", "uk": "Де"}, "dt_exp": {"en": "Experience", "uk": "Досвід"}, "dt_tools": {"en": "Tools", "uk": "Інструменти"}, "dt_award": {"en": "Award", "uk": "Нагорода"}, "dt_status": {"en": "Status", "uk": "Статус"}, "dd_exp": {"en": "6+ years · 500+ campaigns · €5M+ ad spend", "uk": "6+ років · 500+ кампаній · €5M+ ad spend"}, "dd_award": {"en": "Digital Pie Awards 2026 · 2nd place · Performance", "uk": "Digital Pie Awards 2026 · 2‑ге місце · Performance"}, "exp_title": {"en": "Where I’ve worked", "uk": "Де я працював"}, "xp1": {"en": "Digital Marketing Specialist · TRIAD Advertising <em>Mar 2026 — Present</em>", "uk": "Digital Marketing Specialist · TRIAD Advertising <em>Бер 2026 — дотепер</em>"}, "xp2": {"en": "Digital Marketing Consultant · Freelance <em>Jan 2021 — Present</em>", "uk": "Digital marketing консультант · Freelance <em>Січ 2021 — дотепер</em>"}, "xp3": {"en": "PRJCTR Community Ambassador · Projector <em>Dec 2025 — Present</em>", "uk": "PRJCTR Community Ambassador · Projector <em>Гру 2025 — дотепер</em>"}, "xp4": {"en": "PPC \u0026amp; Digital Media Marketing Specialist · High5 <em>Apr 2024 — Mar 2026</em>", "uk": "PPC \u0026amp; Digital Media Marketing Specialist · High5 <em>Кві 2024 — Бер 2026</em>"}, "xp5": {"en": "Marketing Strategist · JFG.education <em>Jun 2020 — Oct 2025</em>", "uk": "Marketing Strategist · JFG.education <em>Чер 2020 — Жов 2025</em>"}, "about_bio": {"en": "Freelance marketer focused on performance campaigns and brand. For the past 6 years I’ve helped e‑shops and B2B brands grow through <b>data and creative</b>.", "uk": "Фриланс‑маркетолог із фокусом на performance‑кампанії та бренд. Останні 6 років допомагаю e‑shop і B2B‑брендам зростати через <b>дані й креатив</b>."}, "serv_title": {"en": "What I can do <span class=\"ghost\">for you</span>", "uk": "Що я можу зробити <span class=\"ghost\">для тебе</span>"}, "svc1_t": {"en": "Performance<br>/ PPC ads", "uk": "Performance<br>/ PPC реклама"}, "svc1_d": {"en": "Meta, Google, X, TikTok, Spotify, Reddit and more — ads that pay off, from strategy to daily optimization.", "uk": "Meta, Google, X, TikTok, Spotify, Reddit та інші — реклама, що приносить прибуток, від стратегії до щоденної оптимізації."}, "svc2_t": {"en": "Brand<br>\u0026amp; strategy", "uk": "Бренд<br>і стратегія"}, "svc2_d": {"en": "Positioning and messaging that set the brand apart and sell.", "uk": "Позиціонування та посил, що вирізняють бренд і продають."}, "svc3_t": {"en": "Email marketing<br>\u0026amp; automation", "uk": "E‑mail маркетинг<br>і автоматизація"}, "svc3_d": {"en": "Flows and campaigns that sell on autopilot.", "uk": "Flow і кампанії, що продають на автопілоті."}, "svc4_t": {"en": "Analytics<br>\u0026amp; reporting", "uk": "Аналітика<br>і звітність"}, "svc4_d": {"en": "GA4 \u0026amp; Looker Studio without the chaos — data you can read.", "uk": "GA4 та Looker Studio без хаосу — дані, які зрозумілі."}, "svc5_t": {"en": "Consulting<br>/ mentoring", "uk": "Консультації<br>/ менторство"}, "svc5_d": {"en": "Clear direction for teams and solos who want to grow.", "uk": "Чіткий напрям для команд і соло‑фахівців, які прагнуть зростати."}, "stats_title": {"en": "Numbers that speak <span class=\"ghost\">for the work</span>", "uk": "Цифри, що говорять <span class=\"ghost\">за результат</span>"}, "award_p": {"en": "2nd place in the Performance category · issued by Digital Pie · Apr 2026 · in collaboration with agency High5.", "uk": "2‑ге місце в категорії Performance · видано Digital Pie · квітень 2026 · у співпраці з агенцією High5."}, "award_roas": {"en": "ROAS (from 62.7%)", "uk": "ROAS (з 62,7%)"}, "award_conv": {"en": "Conversions", "uk": "Конверсії"}, "award_rev": {"en": "Revenue growth", "uk": "Зростання виручки"}, "award_link": {"en": "View case study <span aria-hidden=\"true\">→</span>", "uk": "Дивитися кейс <span aria-hidden=\"true\">→</span>"}, "cases_title": {"en": "Selected projects <span class=\"ghost\">\u0026amp; results</span>", "uk": "Вибрані проєкти <span class=\"ghost\">та результати</span>"}, "cases_sub": {"en": "Real numbers from real campaigns — no sugar‑coating.", "uk": "Реальні цифри з реальних кампаній — без прикрас."}, "c1_tag": {"en": "Pools · Meta Ads", "uk": "Басейни · Meta Ads"}, "c1_t": {"en": "Pools sold in a single summer", "uk": "Проданих басейнів за одне літо"}, "c1_m": {"en": "ROAS 10×+ · €4,911.89 spend · CPA €3.15–6.01", "uk": "ROAS 10×+ · витрати 4 911,89 € · вартість покупки 3,15–6,01 €"}, "c2_tag": {"en": "E‑commerce · year over year", "uk": "E‑commerce · рік до року"}, "c2_t": {"en": "Czech Mint: ROAS up to 140", "uk": "Чеський Монетний Двір: ROAS до 140"}, "c2_m": {"en": "140.56 · March 2024 · €74,400 revenue from €529", "uk": "140,56 · березень 2024 · 74 400 € доходу з 529 € витрат"}, "c3_tag": {"en": "Korean cosmetics · E‑commerce", "uk": "Корейська косметика · E‑commerce"}, "c3_t": {"en": "€170,000 in revenue for a cosmetics distributor", "uk": "170 000 € доходу для дистриб’ютора косметики"}, "c3_m": {"en": "3,120 purchases · €2.93 per purchase · €9,141.33 spend", "uk": "3 120 покупок · 2,93 € за покупку · витрати 9 141,33 €"}, "c4_tag": {"en": "Dentistry · lead gen", "uk": "Стоматологія · лідогенерація"}, "c4_t": {"en": "943 leads at €0.30 for a dental clinic", "uk": "943 ліди по 0,30 € для стоматологічної клініки"}, "c4_m": {"en": "€284.28 total spend · Meta", "uk": "загальні витрати 284,28 € · Meta"}, "c5_tag": {"en": "Cosmetics · new markets", "uk": "Косметика · нові ринки"}, "c5_t": {"en": "Natural cosmetics: entering Poland and Hungary", "uk": "Вихід натуральної косметики на Польщу та Угорщину"}, "c5_m": {"en": "CPA in Hungary €4.40 · CTR ×3 in 2 months", "uk": "CPA в Угорщині 4,40 € · CTR ×3 за 2 місяці"}, "c6_tag": {"en": "Education · Meta Ads", "uk": "Освіта · Meta Ads"}, "c6_t": {"en": "ROI 24,622% on services for students", "uk": "ROI 24 622% на послугах для студентів"}, "c6_m": {"en": "106 leads · €52,920 revenue · €2.02 per lead", "uk": "106 лідів · 52 920 € доходу · 2,02 € за лід"}, "testi_title": {"en": "What people <span class=\"ghost\">say</span>", "uk": "Що про мене <span class=\"ghost\">кажуть</span>"}, "contact_title": {"en": "Let’s grow <span class=\"ghost\">together</span>", "uk": "Зростаймо <span class=\"ghost\">разом</span>"}, "contact_sub": {"en": "Drop a few lines about your project and I’ll reply within 24 hours.", "uk": "Напиши кілька рядків про проєкт — відповім протягом 24 годин."}, "f_mail": {"en": "<i class=\"pxi\" data-px=\"mail\"></i><b>email</b> · use the form", "uk": "<i class=\"pxi\" data-px=\"mail\"></i><b>e‑mail</b> · напиши через форму"}, "f_loc": {"en": "<i class=\"pxi\" data-px=\"pin\"></i><b>Bratislava, SK</b> · remote", "uk": "<i class=\"pxi\" data-px=\"pin\"></i><b>Братислава, SK</b> · remote"}, "f_av": {"en": "<i class=\"pxi\" data-px=\"spark\"></i><b>Available</b> for projects", "uk": "<i class=\"pxi\" data-px=\"spark\"></i><b>Доступний</b> для проєктів"}, "l_name": {"en": "Name", "uk": "Імʼя"}, "l_email": {"en": "Email", "uk": "E‑mail"}, "l_msg": {"en": "Message", "uk": "Повідомлення"}, "send": {"en": "Send <span aria-hidden=\"true\">→</span>", "uk": "Надіслати <span aria-hidden=\"true\">→</span>"}, "foot_big": {"en": "Available for new projects.<br><a href=\"#kontakt\" data-hover>Get in touch →</a>", "uk": "Доступний для нових проєктів.<br><a href=\"#kontakt\" data-hover>Співпрацюймо →</a>"}, "rights": {"en": "© 2026 Rostyslav · All rights reserved", "uk": "© 2026 Rostyslav · Всі права захищені"}, "egg_h": {"en": "You found<br>the hidden mask.", "uk": "Ви знайшли<br>приховану маску."}, "egg_p": {"en": "<b>−15 %</b> off the first month of working together.<br>Just mention it in your message.", "uk": "<b>−15 %</b> на перший місяць співпраці.<br>Просто згадайте це в повідомленні."}};
  var I18N_PH={"ph_name": {"en": "Your name", "uk": "Твоє імʼя"}, "ph_email": {"en": "you@email.com", "uk": "твій@email.com"}, "ph_msg": {"en": "What are you working on?", "uk": "Над чим працюєш?"}};
  var ROLL={sk:['Rostyslav','Marketing','Performance','Výsledky','Stratégia','Dáta','Rast'],en:['Rostyslav','Marketing','Performance','Results','Strategy','Data','Growth'],uk:['Rostyslav','Маркетинг','Performance','Результати','Стратегія','Дані','Зростання']};
  var MENU_LABEL={sk:['Menu','Zavrieť'],en:['Menu','Close'],uk:['Меню','Закрити']};
  var LANG='sk';
  function applyLang(lang){
    if(['sk','en','uk'].indexOf(lang)===-1) lang='sk'; LANG=lang;
    try{ localStorage.setItem('rosw_lang',lang); }catch(e){}
    html.setAttribute('lang',lang);
    $$('[data-i18n]').forEach(function(el){ if(el.dataset.sk===undefined) el.dataset.sk=el.innerHTML; var tr=I18N[el.getAttribute('data-i18n')]; el.innerHTML=(lang==='sk'||!tr||!tr[lang])?el.dataset.sk:tr[lang]; });
    $$('[data-i18n-ph]').forEach(function(el){ if(el.dataset.skph===undefined) el.dataset.skph=el.getAttribute('placeholder')||''; var tr=I18N_PH[el.getAttribute('data-i18n-ph')]; el.setAttribute('placeholder',(lang==='sk'||!tr||!tr[lang])?el.dataset.skph:tr[lang]); });
    $$('#lang button').forEach(function(bt){ bt.classList.toggle('is-on',bt.dataset.lang===lang); });
    $$('[data-px]').forEach(function(el){ if(!el.firstChild) el.innerHTML=pxSvg(el.getAttribute('data-px')); });
    $$('.ghost').forEach(function(g){ g.setAttribute('data-text',g.textContent); });
    var rt=$('#rollTrack'); if(rt){ var ws=ROLL[lang]; [].slice.call(rt.children).forEach(function(sp,k){ sp.textContent=ws[k%ws.length]; }); }
    var CF={sk:['Tvoje meno','E-mail','Na čom pracuješ?','Odoslať →'],en:['Your name','Email','What are you working on?','Send →'],uk:['Твоє імʼя','E-mail','Над чим працюєш?','Надіслати →']}[lang];
    var fn=$('#cf7wrap [name="your-name"]'), fe=$('#cf7wrap [name="your-email"]'), fm=$('#cf7wrap [name="your-message"]'), fs=$('#cf7wrap .wpcf7-submit');
    if(fn) fn.setAttribute('placeholder',CF[0]); if(fe) fe.setAttribute('placeholder',CF[1]); if(fm) fm.setAttribute('placeholder',CF[2]); if(fs) fs.value=CF[3];
    var mb=$('[data-label]'); if(mb) mb.textContent=MENU_LABEL[lang][html.classList.contains('menu-open')?1:0];
  }
  var savedLang='sk'; try{ savedLang=localStorage.getItem('rosw_lang')||'sk'; }catch(e){}
  applyLang(savedLang);

  /* pixelate reveal: photos resolve from big pixels to sharp; re-pixelate on hover */
  function pixelate(img){
    if(reduced) return;
    var box=img.parentElement; var cv=document.createElement('canvas'); cv.className='pxc'; box.appendChild(cv); var ctx=cv.getContext('2d');
    function fit(){ var r=box.getBoundingClientRect(); cv.width=Math.max(2,Math.round(r.width/2)); cv.height=Math.max(2,Math.round(r.height/2)); }
    function drawBlock(px){ fit(); var W=cv.width,H=cv.height; var iw=img.naturalWidth,ih=img.naturalHeight; if(!iw) return;
      var s=Math.max(W/iw,H/ih); var dw=iw*s,dh=ih*s; var pos=(getComputedStyle(img).objectPosition||'50% 20%').split(' '); var py=parseFloat(pos[1]||'50')/100; var dx=(W-dw)/2, dy=(H-dh)*py;
      var sw=Math.max(1,Math.round(W/px)), sh=Math.max(1,Math.round(H/px));
      var off=document.createElement('canvas'); off.width=sw; off.height=sh; var oc=off.getContext('2d'); oc.imageSmoothingEnabled=true; oc.drawImage(img,dx/px,dy/px,dw/px,dh/px);
      ctx.imageSmoothingEnabled=false; ctx.clearRect(0,0,W,H); ctx.drawImage(off,0,0,sw,sh,0,0,W,H); }
    var running=false;
    function run(from,to,dur,done){ if(running) return; running=true; cv.classList.add('is-on'); var t0=performance.now();
      (function step(now){ var t=Math.min(1,(now-t0)/dur); var e=1-Math.pow(1-t,3); var px=from+(to-from)*e; drawBlock(Math.max(1,px)); if(t<1) requestAnimationFrame(step); else { running=false; if(done) done(); } })(t0); }
    function reveal(){ run(28,1,900,function(){ cv.classList.remove('is-on'); }); }
    if(img.complete){ if(img.naturalWidth){ reveal(); } } else img.addEventListener('load',reveal);
  }
  $$('[data-pixelate]').forEach(pixelate);

  $$('.ghost').forEach(function(g){ g.setAttribute('data-text',g.textContent); });
  var cur=$('#cur');
  if(cur){ window.addEventListener('pointermove',function(e){ cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px'; },{passive:true});
    document.addEventListener('pointerover',function(e){ if(e.target.closest('[data-hover],a,button')) cur.classList.add('is-big'); });
    document.addEventListener('pointerout',function(e){ if(e.target.closest('[data-hover],a,button')) cur.classList.remove('is-big'); }); }

  /* split headings into words for the masked line reveal */
  function splitWords(root){ var kids=[].slice.call(root.childNodes); var i=0;
    kids.forEach(function(n){ if(n.nodeType===3){ var parts=n.textContent.split(/(\s+)/); var frag=document.createDocumentFragment();
        parts.forEach(function(p){ if(!p) return; if(/^\s+$/.test(p)){ frag.appendChild(document.createTextNode(' ')); return; } var w=document.createElement('span'); w.className='w'; w.style.setProperty('--i',i++); var s=document.createElement('span'); s.textContent=p; w.appendChild(s); frag.appendChild(w); });
        root.replaceChild(frag,n); }
      else if(n.nodeType===1){ if(n.tagName==='BR') return; var w2=document.createElement('span'); w2.className='w'; w2.style.setProperty('--i',i++); root.insertBefore(w2,n); w2.appendChild(n); } }); }
  $$('.split').forEach(function(h){ $$('h2,h3,.big',h).concat(h.matches('h2')?[h]:[]).forEach(splitWords); });
  $$('.stag').forEach(function(s){ [].slice.call(s.children).forEach(function(ch,k){ ch.style.setProperty('--i',k); }); });


  $$('#lang button').forEach(function(bt){ bt.addEventListener('click',function(){ applyLang(bt.dataset.lang);
    $$('.split').forEach(function(h){ $$('h2,h3,.big',h).concat(h.matches('h2')?[h]:[]).forEach(function(el){ if(el.querySelector('.w')) return; splitWords(el); }); h.classList.add('is-in'); }); }); });
  var rv=$$('.rv,.split,.stag,.wipe');
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target);} }); },{threshold:.12,rootMargin:'0px 0px -6% 0px'}); rv.forEach(function(el){ io.observe(el); }); }
  else rv.forEach(function(el){ el.classList.add('is-in'); });

  var menu=$('#menu'), btn=$('#menuBtn');
  function setMenu(on){ menu.classList.toggle('is-open',on); html.classList.toggle('menu-open',on); btn.setAttribute('aria-expanded',on?'true':'false'); $('[data-label]',btn).textContent=MENU_LABEL[LANG][on?1:0]; }
  btn.addEventListener('click',function(){ setMenu(!menu.classList.contains('is-open')); });
  $$('[data-close]',menu).forEach(function(a){ a.addEventListener('click',function(){ setMenu(false); }); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') setMenu(false); });

  /* rolling headline: the words the live site cycles, sliding up like a counter */
  var track=$('#rollTrack');
  if(track){ if(!reduced){ var n=track.children.length, ri=0;
    setTimeout(function(){ setInterval(function(){ ri+=1; track.style.transform='translateY(-'+(ri*100/n)+'%)';
      if(ri===n-1){ setTimeout(function(){ track.style.transition='none'; ri=0; track.style.transform='translateY(0)'; void track.offsetHeight; track.style.transition=''; },950); } },2600); },1800); } }


  /* hover: gentle 3D tilt toward the cursor + soft glare, photo stays crisp */
  var fine=false; try{ fine=window.matchMedia('(pointer:fine)').matches; }catch(e){}
  $$('.tilt').forEach(function(el){ if(reduced||!fine) return; var rx=0,ry=0,tx=0,ty=0,raf=0;
    function frame(){ raf=0; rx+=(tx-rx)*.16; ry+=(ty-ry)*.16; el.style.transform='perspective(1200px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)'; if(Math.abs(tx-rx)>.02||Math.abs(ty-ry)>.02) raf=requestAnimationFrame(frame); }
    el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height; tx=(.5-y)*7; ty=(x-.5)*7; el.style.setProperty('--mx',(x*100).toFixed(1)+'%'); el.style.setProperty('--my',(y*100).toFixed(1)+'%'); $$('.glare',el).forEach(function(g){ g.style.setProperty('--mx',(x*100).toFixed(1)+'%'); g.style.setProperty('--my',(y*100).toFixed(1)+'%'); }); if(!raf) raf=requestAnimationFrame(frame); });
    el.addEventListener('pointerleave',function(){ tx=0; ty=0; if(!raf) raf=requestAnimationFrame(frame); }); });

  /* header slips away on scroll down, returns on scroll up */
  var lastY=0; window.addEventListener('scroll',function(){ var y=scrollY; var down=false; if(y>lastY){ if(y>160){ if(!html.classList.contains('menu-open')) down=true; } } html.classList.toggle('hide-top',down); lastY=y; },{passive:true});

  var hf=$('#hflip');
  if(hf){ var hflip=function(){ var on=!hf.classList.contains('is-flipped'); hf.classList.toggle('is-flipped',on); hf.setAttribute('aria-pressed',on?'true':'false'); };
    hf.addEventListener('click',hflip); hf.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); hflip(); } }); }

  var card=$('#card');
  if(card){ var flip=function(){ var on=!card.classList.contains('is-flipped'); card.classList.toggle('is-flipped',on); card.setAttribute('aria-pressed',on?'true':'false'); };
    card.addEventListener('click',flip); card.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); flip(); } }); }

  var nums=$$('[data-count]');
  if('IntersectionObserver' in window){ var io2=new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting||reduced) return; var el=e.target; if(el.dataset.done) return; el.dataset.done='1'; var to=parseFloat(el.dataset.count), t0=performance.now(), D=1400; (function step(now){ var t=Math.min(1,(now-t0)/D); el.textContent=String(Math.round(to*(1-Math.pow(1-t,3)))); if(t<1) requestAnimationFrame(step); })(t0); io2.unobserve(el); }); },{threshold:.5}); nums.forEach(function(n){ io2.observe(n); }); }

  var strip=$('#strip'), idx=$('#stripIdx'), slides=strip?$$('.slide',strip):[];
  if(strip){
  function slideW(){ return slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(strip).columnGap||'32'); }
  function updIdx(){ var i=Math.round(strip.scrollLeft/slideW()); i=Math.max(0,Math.min(slides.length-1,i)); idx.textContent=('0'+(i+1)).slice(-2)+' / '+('0'+slides.length).slice(-2); }
  strip.addEventListener('scroll',updIdx,{passive:true});
  $('#next').addEventListener('click',function(){ strip.scrollBy({left:slideW(),behavior:'smooth'}); });
  $('#prev').addEventListener('click',function(){ strip.scrollBy({left:-slideW(),behavior:'smooth'}); });
  var drag=false,sx=0,sl=0;
  strip.addEventListener('pointerdown',function(e){ if(e.pointerType!=='mouse') return; drag=true; sx=e.clientX; sl=strip.scrollLeft; strip.classList.add('is-drag'); strip.setPointerCapture(e.pointerId); });
  strip.addEventListener('pointermove',function(e){ if(!drag) return; strip.scrollLeft=sl-(e.clientX-sx); });
  function endDrag(){ if(!drag) return; drag=false; strip.classList.remove('is-drag'); var i=Math.round(strip.scrollLeft/slideW()); strip.scrollTo({left:i*slideW(),behavior:'smooth'}); }
  strip.addEventListener('pointerup',endDrag); strip.addEventListener('pointercancel',endDrag); strip.addEventListener('pointerleave',endDrag);
  }

  var quotes=$$('#voice blockquote'), auth=$('#auth'), vcnt=$('#vcnt'), vi=0, vt=0;
  var AUTH=[['Lívia Jankajová','SMM · Content creator · Digital marketing'],['Samuel Urbanec','Performance marketing'],['Adam Kovaľ','Graphic Designer · Founder of yeba.sk'],['Kristián Mockovčiak','Digital Account Manager'],['Konstantin Demidov','Founder QuadRise · Growth Marketing']];
  function showV(i){ vi=(i+quotes.length)%quotes.length; quotes.forEach(function(q,k){ q.classList.toggle('is-on',k===vi); }); if(auth) auth.innerHTML='<b>'+AUTH[vi][0]+'</b><span>'+AUTH[vi][1]+'</span>'; if(vcnt) vcnt.textContent='0'+(vi+1)+' / 0'+quotes.length; clearTimeout(vt); if(!reduced) vt=setTimeout(function(){ showV(vi+1); },9000); }
  var vp=$('#vprev'), vn=$('#vnext'); if(vp) vp.addEventListener('click',function(){ showV(vi-1); }); if(vn) vn.addEventListener('click',function(){ showV(vi+1); });
  if(quotes.length){ if(!reduced) vt=setTimeout(function(){ showV(1); },9000); }

  $$('.scrollcue i').forEach(function(i){ i.outerHTML='<span class="pxi" data-px="down" style="width:14px;height:14px;color:var(--accent)">'+pxSvg('down')+'</span>'; });
  var fm=$('.foot__mask'), foot=$('.foot');
  if(fm){ if(!reduced){ var fmTick=function(){ var r=foot.getBoundingClientRect(); var vh=innerHeight; var p=Math.max(0,Math.min(1,(vh-r.top)/(r.height*0.9))); var ty=40-40*p; var sc=.92+.08*p; var rot=(1-p)*-4; fm.style.transform='translate(-50%,'+ty.toFixed(2)+'%) scale('+sc.toFixed(3)+') rotate('+rot.toFixed(2)+'deg)'; };
    window.addEventListener('scroll',fmTick,{passive:true}); window.addEventListener('resize',fmTick); fmTick(); } else fm.style.transform='translate(-50%,0)'; }

  /* ---- lead source: remember where the visitor came from (first touch of the visit + first ever visit)
     and append it to the contact form message right before Contact Form 7 sends it (the visitor's textarea stays clean) ---- */
  (function(){
    var loc=window.location, own=loc.hostname.replace(/^www\./,''), AMP='\u0026';
    function parseQuery(){ var out={}; var s=loc.search.replace(/^\?/,''); if(!s) return out; s.split(AMP).forEach(function(kv){ var p=kv.split('='); if(!p[0]) return; try{ out[decodeURIComponent(p[0])]=decodeURIComponent((p[1]||'').replace(/\+/g,' ')); }catch(e){} }); return out; }
    function hostOf(u){ try{ return new URL(u).hostname.replace(/^www\./,''); }catch(e){ return ''; } }
    var KNOWN=[[/chatgpt\.com|chat\.openai\.com|openai\.com/,'ChatGPT'],[/perplexity\.ai/,'Perplexity'],[/gemini\.google\.com|bard\.google\.com/,'Google Gemini'],[/claude\.ai/,'Claude'],[/copilot\.microsoft\.com/,'Microsoft Copilot'],[/^google\./,'Google – organické vyhľadávanie'],[/^bing\.com/,'Bing'],[/duckduckgo\.com/,'DuckDuckGo'],[/^search\.seznam\.cz|^seznam\.cz/,'Seznam'],[/yahoo\./,'Yahoo'],[/^ecosia\.org/,'Ecosia'],[/instagram\.com/,'Instagram'],[/facebook\.com|^fb\.com|^fb\.me|^m\.facebook\.com|messenger\.com/,'Facebook'],[/linkedin\.com|^lnkd\.in/,'LinkedIn'],[/^t\.co$|twitter\.com|^x\.com/,'X / Twitter'],[/youtube\.com|^youtu\.be/,'YouTube'],[/tiktok\.com/,'TikTok'],[/threads\.(net|com)/,'Threads'],[/reddit\.com/,'Reddit'],[/pinterest\./,'Pinterest'],[/mail\.google\.com|outlook\.(live|office)\.com|email\.seznam\.cz/,'E-mail']];
    function label(h,q){
      if(q.utm_source) return 'UTM: '+q.utm_source+(q.utm_medium?' / '+q.utm_medium:'')+(q.utm_campaign?' / '+q.utm_campaign:'');
      if(q.gclid) return 'Google Ads (gclid)'; if(q.fbclid) return 'Meta Ads / Facebook (fbclid)'; if(q.msclkid) return 'Microsoft Ads (msclkid)'; if(q.ttclid) return 'TikTok Ads (ttclid)'; if(q.li_fat_id) return 'LinkedIn Ads';
      if(!h) return 'Priamy vstup (zadaná adresa alebo záložka)';
      for(var i=0;i<KNOWN.length;i+=1){ if(KNOWN[i][0].test(h)) return KNOWN[i][1]+' ('+h+')'; }
      return 'Odkaz z webu: '+h;
    }
    var store=null; try{ store=window.sessionStorage; }catch(e){}
    var rec=null; try{ rec=JSON.parse(store.getItem('rm_src')||'null'); }catch(e){}
    if(!rec){
      var q=parseQuery(); var ref=document.referrer||''; var rh=hostOf(ref); if(rh===own) rh='';
      var tags=[]; Object.keys(q).forEach(function(k){ if(/^utm_|^gclid$|^fbclid$|^msclkid$|^ttclid$|^li_fat_id$/.test(k)) tags.push(k+'='+q[k]); });
      rec={src:label(rh,q),ref:rh?ref.slice(0,180):'',land:(loc.pathname+loc.search).slice(0,120),t:new Date().toISOString(),utm:tags.join(' ')};
      try{ store.setItem('rm_src',JSON.stringify(rec)); }catch(e){}
    }
    var first=null; try{ first=JSON.parse(localStorage.getItem('rm_first_src')||'null'); if(!first){ first=rec; localStorage.setItem('rm_first_src',JSON.stringify(rec)); } }catch(e){}
    function summary(){
      var L=['Zdroj návštevy: '+rec.src];
      if(rec.ref) L.push('Odkazujúca URL: '+rec.ref);
      if(rec.utm) L.push('Parametre: '+rec.utm);
      L.push('Vstupná stránka: '+rec.land);
      L.push('Odoslané zo stránky: '+loc.pathname+(loc.hash||''));
      if(first){ if(first.t!==rec.t) L.push('Prvá návšteva webu: '+first.src+' ('+first.t.slice(0,10)+')'); }
      var mob=false; try{ mob=matchMedia('(max-width:820px)').matches; }catch(e){}
      L.push('Jazyk webu: '+String(LANG||'sk').toUpperCase()+' · Zariadenie: '+(mob?'mobil':'desktop'));
      return L.join('\n');
    }
    document.addEventListener('wpcf7beforesubmit',function(e){
      var d=e.detail; if(!d) return; var fd=d.formData; if(!fd) return; if(typeof fd.get!=='function') return;
      var msg=fd.get('your-message'); if(msg===null) return;
      if(String(msg).indexOf('Zdroj návštevy:')!==-1) return;
      fd.set('your-message',String(msg)+'\n\n--\n'+summary());
      if(fd.has('lead-source')) fd.set('lead-source',rec.src);
    });
  })();

  var clock=$('#clock');
  function tick2(){ try{ clock.textContent=new Intl.DateTimeFormat('sk-SK',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Bratislava'}).format(new Date()); }catch(e){} }
  tick2(); setInterval(tick2,20000);
})();