// Sayfadaki hareketin tamami burada. Uc kural:
// 1) Rota cizgisi ve gecis cumleleri kaydirmayi birebir izler.
// 2) Sema ekrana ilk girdiginde bir kez cizilir.
// 3) "Hareketi azalt" aciksa hicbiri oynamaz; her sey bitmis haliyle durur.
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const wide = matchMedia("(min-width: 1024px)");
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  const sheet = document.querySelector(".sheet");
  const sections = [...document.querySelectorAll("[data-section]")];
  const stops = sections.map((s) => document.querySelector(`[data-stop="${s.id}"]`));
  const segs = Object.fromEntries([...document.querySelectorAll("[data-seg]")].map((li) => [li.dataset.seg, li]));

  // Okuma cizgisinin sayfadaki yeri. Sayfanin son ekraninda cizgi alta dogru
  // hizlanir; boylece en alttaki bolume de ulasilir.
  function readingY(fraction) {
    const max = Math.max(1, root.scrollHeight - innerHeight);
    const tail = clamp((scrollY - (max - innerHeight)) / innerHeight);
    return scrollY + innerHeight * (fraction + (1 - fraction) * tail);
  }
  const pageTop = (el) => el.getBoundingClientRect().top + scrollY;

  /* ---------- Ust bar: hangi duraktayiz, aradaki cizgi ne kadar doldu ---------- */

  function updateStops() {
    const y = readingY(0.4);
    const tops = sections.map(pageTop);
    let current = 0;
    tops.forEach((top, i) => {
      if (top <= y) current = i;
    });
    stops.forEach((stop, i) => {
      if (!stop) return;
      if (i === current) stop.setAttribute("aria-current", "true");
      else stop.removeAttribute("aria-current");
      stop.classList.toggle("is-past", i < current);
    });
    const between = (i) => clamp((y - tops[i]) / Math.max(1, tops[i + 1] - tops[i]));
    const set = (key, p) => segs[key]?.style.setProperty("--p", p.toFixed(3));
    set("0", between(0));
    set("1", between(1));
    // Deneyim ile GitHub arasindaki cizgi ismin iki yanina bolunur
    set("2a", clamp(between(2) * 2));
    set("2b", clamp(between(2) * 2 - 1));
    set("3", between(3));
    set("4", between(4));
  }

  /* ---------- Gecis cumleleri: kelimeler sirayla murekkebe doner ---------- */

  // Cumle iki dilde de durur; her dilin kelimeleri ayri bolunur
  const bridgeTexts = [...document.querySelectorAll("[data-bridge]")].flatMap((host) =>
    host.querySelector("[lang]") ? [...host.querySelectorAll("[lang]")] : [host],
  );
  const bridges = bridgeTexts.map((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    const spans = words.map((word, i) => {
      const span = document.createElement("span");
      span.className = "w";
      span.textContent = word;
      el.append(span, i < words.length - 1 ? " " : "");
      return span;
    });
    return { el, spans };
  });

  function updateBridges() {
    const start = innerHeight * 0.86;
    const end = innerHeight * 0.46;
    for (const { el, spans } of bridges) {
      const top = el.getBoundingClientRect().top;
      const lit = Math.round(clamp((start - top) / (start - end)) * spans.length);
      spans.forEach((span, i) => span.classList.toggle("on", i < lit));
    }
  }

  /* ---------- Rota: bolumden bolume gecen cizgi, ucunda isaretci ---------- */

  const route = {
    svg: document.querySelector(".route"),
    base: document.querySelector(".route-base"),
    ink: document.querySelector(".route-ink"),
    ptr: document.querySelector(".route-ptr"),
    end: document.querySelector("[data-route-end]"),
    crossings: [...document.querySelectorAll(".bridge"), document.querySelector(".contact")],
    map: [],
    total: 0,
    current: 0,
    target: 0,
    active: false,
  };
  const CORNER = 14;

  function buildRoute() {
    route.active = wide.matches && Boolean(route.svg);
    root.classList.toggle("has-route", route.active);
    if (!route.active) return;

    const box = sheet.getBoundingClientRect();
    const relY = (el) => el.getBoundingClientRect().top - box.top;
    const gutter = parseFloat(getComputedStyle(sections[0]).paddingLeft);
    const left = Math.round(gutter / 2);
    const right = Math.round(sheet.clientWidth - gutter / 2);
    const r = CORNER;

    // Sagdan baslar; her geciste serit degistirir ve solda, e-posta butonunda biter
    let d = `M${right} ${Math.round(relY(sections[0]) + 28)}`;
    route.map = [];
    const lengthOf = (path) => {
      route.base.setAttribute("d", path);
      return route.base.getTotalLength();
    };
    // Her parca icin: okuma cizgisi t0..t1 arasindayken cizgi l0..l1 uzunlugunda
    const add = (fragment, t0, t1) => {
      const l0 = route.map.length ? route.map.at(-1).l1 : 0;
      d += fragment;
      route.map.push({ t0, t1: Math.max(t1, t0 + 1), l0, l1: lengthOf(d) });
    };

    let x = right;
    let t = relY(sections[0]) + 28;
    for (const el of route.crossings) {
      const y = Math.round(relY(el));
      const next = x === left ? right : left;
      const dir = next > x ? 1 : -1;
      // Yatay gecis, kaydirmanin kisa bir bandinda bastan sona cizilir
      const band = Math.min(innerHeight * 0.4, el.offsetHeight * 0.7);
      add(` V${y - r}`, t, y);
      add(` Q${x} ${y} ${x + dir * r} ${y} H${next - dir * r} Q${next} ${y} ${next} ${y + r}`, y, y + band);
      x = next;
      t = y + band;
    }
    // Son durak: e-posta butonunun hemen solunda biter
    const endBox = route.end.getBoundingClientRect();
    const endY = Math.round(endBox.top - box.top + endBox.height / 2);
    const endX = Math.round(endBox.left - box.left - 14);
    add(` V${endY - r}`, t, endY - 24);
    add(` Q${x} ${endY} ${x + r} ${endY} H${Math.max(x + r, endX)}`, endY - 24, endY + 24);

    route.total = route.map.at(-1).l1;
    route.ink.setAttribute("d", d);
    route.ink.style.strokeDasharray = `${route.total}`;
  }

  function routeLengthAt(y) {
    if (!route.map.length || y <= route.map[0].t0) return 0;
    for (const part of route.map) {
      if (y <= part.t1) return part.l0 + (part.l1 - part.l0) * clamp((y - part.t0) / (part.t1 - part.t0));
    }
    return route.total;
  }

  function drawRoute() {
    const at = route.current;
    route.ink.style.strokeDashoffset = `${route.total - at}`;
    const tip = route.base.getPointAtLength(at);
    const before = route.base.getPointAtLength(Math.max(0, at - 2));
    const angle = at < 2 ? 90 : (Math.atan2(tip.y - before.y, tip.x - before.x) * 180) / Math.PI;
    route.ptr.setAttribute("transform", `translate(${tip.x.toFixed(1)} ${tip.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
  }

  // Kaydirmayi yumusak izler (sonumlu takip; sekme yok)
  let frame = 0;
  let lastTime = 0;
  function follow(now) {
    const dt = Math.min(64, now - lastTime || 16);
    lastTime = now;
    route.current += (route.target - route.current) * (1 - Math.exp(-dt / 110));
    if (Math.abs(route.target - route.current) < 0.5) route.current = route.target;
    drawRoute();
    frame = route.current === route.target ? 0 : requestAnimationFrame(follow);
  }

  function updateRoute() {
    if (!route.active) return;
    if (reduce.matches) {
      route.current = route.target = route.total;
      drawRoute();
      return;
    }
    const sheetTop = pageTop(sheet);
    route.target = routeLengthAt(readingY(0.62) - sheetTop);
    if (!frame && route.current !== route.target) {
      lastTime = 0;
      frame = requestAnimationFrame(follow);
    }
  }

  /* ---------- Kaydirma ve boyut ---------- */

  /* ---------- Deneyim: okuma cizgisini gecen durak murekkebe doner ---------- */

  const xpRows = [...document.querySelectorAll(".xp-row")];

  function updateExperience() {
    const line = innerHeight * 0.72;
    let current = -1;
    xpRows.forEach((row, i) => {
      if (row.getBoundingClientRect().top <= line) current = i;
    });
    xpRows.forEach((row, i) => {
      row.classList.toggle("is-on", i <= current);
      row.classList.toggle("is-passed", i < current);
      row.classList.toggle("is-current", i === current);
    });
  }

  function update() {
    updateStops();
    if (root.classList.contains("motion")) {
      updateBridges();
      updateExperience();
    }
    updateRoute();
  }

  let queued = false;
  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  }

  function layout() {
    root.classList.toggle("motion", !reduce.matches);
    buildRoute();
    update();
  }

  addEventListener("scroll", queue, { passive: true });
  reduce.addEventListener("change", layout);
  wide.addEventListener("change", layout);
  // Yazi tipi ya da gorsel yuklenince yukseklik degisir; rota yeniden olculur
  new ResizeObserver(() => requestAnimationFrame(layout)).observe(sheet);
  layout();

  /* ---------- Dil: TR / EN ---------- */

  const langInputs = [...document.querySelectorAll('input[name="lang"]')];
  const translated = [...document.querySelectorAll("[data-i18n]")];

  // alt, aria-label gibi ozelliklerin Ingilizcesi data-en-* icinde durur (build.mjs yazar)
  function applyAttributes(lang) {
    for (const el of translated) {
      for (const { name, value } of [...el.attributes]) {
        if (!name.startsWith("data-en-")) continue;
        const target = name.slice(8);
        const keep = `data-tr-${target}`;
        if (!el.hasAttribute(keep)) el.setAttribute(keep, el.getAttribute(target) ?? "");
        el.setAttribute(target, lang === "en" ? value : el.getAttribute(keep));
      }
    }
  }

  function setLang(lang, remember) {
    // Okunan bolum yerinde kalsin: degisimden once ve sonra ayni bolumun yerine bakilir
    const anchor = sections.findLast((s) => s.getBoundingClientRect().top <= innerHeight * 0.4) ?? sections[0];
    const before = anchor.getBoundingClientRect().top;
    root.lang = lang;
    applyAttributes(lang);
    langInputs.forEach((input) => {
      input.checked = input.value === lang;
    });
    document.dispatchEvent(new Event("langchange"));
    layout();
    scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" });
    if (!remember) return;
    try {
      localStorage.setItem("portfolio-lang", lang);
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch {
      // Kayit kapaliysa (gizli mod, file://) secim bu oturumda kalir
    }
  }

  langInputs.forEach((input) => input.addEventListener("change", () => setLang(input.value, true)));
  setLang(root.lang === "en" ? "en" : "tr", false);

  /* ---------- Bir kez cizilen: sema ---------- */

  const once = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        once.unobserve(entry.target);
      }
    },
    { threshold: 0.35 },
  );
  document.querySelectorAll("[data-diagram]").forEach((el) => once.observe(el));

  /* ---------- Sema: ustune gelinen parca dolar, altinda adi ve isi yazar ---------- */

  const diagram = document.querySelector("[data-diagram]");
  const caption = document.querySelector("[data-diagram-cap]");
  if (diagram && caption) {
    const hint = [...caption.childNodes];
    const parts = Object.fromEntries(
      [...document.querySelectorAll("[data-diagram-parts] [data-part]")].map((li) => [li.dataset.part, li]),
    );
    const nodes = [...diagram.querySelectorAll(".dg-node")];

    const show = (part) => {
      nodes.forEach((node) => node.classList.toggle("is-on", node.dataset.part === part));
      const item = part && parts[part];
      if (!item) return caption.replaceChildren(...hint);
      const name = document.createElement("span");
      name.className = "cap-name";
      name.textContent = `${item.dataset.name}: `;
      const text = item.querySelector(`[lang="${root.lang}"]`) ?? item;
      caption.replaceChildren(name, text.textContent.trim());
    };
    document.addEventListener("langchange", () => show(null));
    nodes.forEach((node) => {
      node.addEventListener("pointerenter", () => show(node.dataset.part));
      node.addEventListener("pointerleave", (event) => {
        if (event.pointerType === "mouse") show(null);
      });
      // Dokunmatik: ayni parcaya ikinci dokunus kapatir
      node.addEventListener("click", () => show(node.classList.contains("is-on") ? null : node.dataset.part));
    });
  }

  /* ---------- Adresi kopyala ---------- */

  const copyButton = document.querySelector("[data-copy]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton && copyStatus) {
    let timer = 0;
    const say = (text, isError) => {
      copyStatus.textContent = text;
      copyStatus.classList.toggle("is-error", isError);
      copyStatus.classList.add("is-shown");
      clearTimeout(timer);
      timer = setTimeout(() => copyStatus.classList.remove("is-shown"), 2400);
    };
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        say(root.lang === "en" ? "Copied" : "Kopyalandı", false);
      } catch {
        say(root.lang === "en" ? "Could not copy. Select the address and copy it by hand." : "Kopyalanamadı. Adresi seçip elle kopyala.", true);
      }
    });
  }
})();
