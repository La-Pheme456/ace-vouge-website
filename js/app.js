document.addEventListener("DOMContentLoaded", () => {
  /* ACE VOUGE - shared logic. Edit PRODUCTS and CONFIG below. */
  const CONFIG = {
    email: "hello@acevouge.example", // PLACEHOLDER: contact form opens a mail draft to this address
    phone: "+234 911 576 6872",
    address: "Address to be added",
    social: {
      Instagram: "#",
      TikTok: "#",
      X: "#",
      WhatsApp: "https://wa.me/2349115766872",
    },
  };
  const SIZES = ["S", "M", "L", "XL"];
  const PRODUCTS = [
    // PLACEHOLDER prices (NGN) and descriptions: edit freely
    {
      id: "silence-tee",
      name: "Silence. Strategy. Success. Tee",
      cat: "Tops",
      price: 25000,
      color: "White",
      colorHex: "#F2F3F0",
      date: 3,
      dark: false,
      a: "img/tee-ss-front.png",
      b: "img/tee-ss-back.png",
      desc: "An oversized white tee. A small spade mark sits on the chest. Across the back, the line the label is built on: Silence. Strategy. Success.",
      det: [
        ["Fit", "Oversized (as shown in photography)"],
        ["Front", "Spade mark, chest"],
        ["Back", "Silence. Strategy. Success."],
        ["Fabric and care", "Details to be added"],
      ],
    },
    {
      id: "logo-tee",
      name: "Ace VOUGE Logo Tee",
      cat: "Tops",
      price: 22000,
      color: "White",
      colorHex: "#F2F3F0",
      date: 2,
      dark: false,
      a: "img/tee-logo-front.png",
      b: "img/tee-logo-back.png",
      desc: "An oversized white tee with the Ace VOUGE mark and wordmark in black on the chest. A clean, plain back.",
      det: [
        ["Fit", "Oversized (as shown in photography)"],
        ["Front", "Ace VOUGE mark and wordmark, chest"],
        ["Back", "Plain"],
        ["Fabric and care", "Details to be added"],
      ],
    },
    {
      id: "denim-knickers",
      name: "Washed Denim Knickers",
      cat: "Bottoms",
      price: 38000,
      color: "Washed black",
      colorHex: "#2a2c30",
      date: 1,
      dark: true,
      a: "img/knicker-front.png",
      b: "img/knicker-back.png",
      desc: "Knee-length black denim with a washed finish and a wide leg. A silver chain hangs from the belt loop, the Ace VOUGE mark sits on the front, and a woven label finishes the back waistband.",
      det: [
        ["Length", "Knee-length (as shown in photography)"],
        ["Detail", "Silver chain, front logo, back label"],
        ["Colour", "Washed black"],
        ["Fabric and care", "Details to be added"],
      ],
    },
    {
      id: "logo-tank-white",
      name: "Ace VOUGE Logo Tank",
      cat: "Tops",
      price: 22000,
      color: "White",
      colorHex: "#f2f3f0",
      date: 6,
      newIn: true,
      dark: false,
      single: true,
      a: "img/tank-white.png",
      b: "img/tank-white.png",
      desc: "A clean white tank with the Ace VOUGE mark at the chest. Easy on its own, easy to layer.",
      det: [
        ["Fit", "Sleeveless, as shown in photography"],
        ["Front", "Ace VOUGE mark at chest"],
        ["Back", "Plain"],
        ["Fabric and care", "Details to be added"],
      ],
    },
    {
      id: "logo-tank-grey",
      name: "Ace VOUGE Logo Tank",
      cat: "Tops",
      price: 22000,
      color: "Grey",
      colorHex: "#a9aaac",
      date: 5,
      newIn: true,
      dark: false,
      single: true,
      a: "img/tank-grey.png",
      b: "img/tank-grey.png",
      desc: "A soft grey tank with the Ace VOUGE mark at the chest. An understated everyday layer.",
      det: [
        ["Fit", "Sleeveless, as shown in photography"],
        ["Front", "Ace VOUGE mark at chest"],
        ["Back", "Plain"],
        ["Fabric and care", "Details to be added"],
      ],
    },
    {
      id: "logo-tank-black",
      name: "Ace VOUGE Logo Tank",
      cat: "Tops",
      price: 22000,
      color: "Black",
      colorHex: "#111214",
      date: 4,
      newIn: true,
      dark: true,
      single: true,
      a: "img/tank-black.png",
      b: "img/tank-black.png",
      desc: "A black tank with a quiet Ace VOUGE chest mark. A versatile piece for warm days and easy layering.",
      det: [
        ["Fit", "Sleeveless, as shown in photography"],
        ["Front", "Ace VOUGE mark at chest"],
        ["Back", "Plain"],
        ["Fabric and care", "Details to be added"],
      ],
    },
  ];
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => "\u20A6" + n.toLocaleString("en-NG");
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem("av_cart")) || [];
  } catch (e) {}
  const page = document.body.dataset.page;
  if (!window.gsap || !window.ScrollTrigger)
    document.documentElement.classList.add("flat"); // graceful fallback if the animation library cannot load

  /* ---------- shell ---------- */
  const nav = [
    ["shop.html", "Shop", "shop"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
  ];
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<a class="sm" href="#main" style="position:absolute;left:-999px">Skip to content</a>
  <header class="hd"><a class="lg" href="index.html" aria-label="Ace VOUGE home"><img src="img/logo.png" alt="Ace VOUGE"></a>
  <div class="rt"><nav id="nv" aria-label="Main">${nav.map((n) => `<a href="${n[0]}" class="${page === n[2] ? "on" : ""}">${n[1]}</a>`).join("")}</nav>
  <button class="ct" id="oc" aria-label="Open cart">Cart (<span id="cc">0</span>)</button><button class="bg" id="bg" aria-label="Menu" aria-expanded="false"><i></i><i></i></button></div></header>
  <div class="cur" id="cur"></div><div id="shd"></div>
  <aside id="cart" aria-label="Cart" aria-hidden="true"><header><h2>Cart</h2><button class="lnk" id="xc">Close</button></header><ul id="cl"></ul>
  <div class="ctot"><div><span>Subtotal</span><span id="st">${money(0)}</span></div><button class="btn solid" id="co">Checkout</button><small id="cn" role="status"></small></div></aside>`,
  );
  const so = Object.entries(CONFIG.social)
    .map(
      ([k, v]) =>
        `<li><a href="${v}" ${v === "#" ? 'aria-disabled="true" title="Link coming soon"' : 'target="_blank" rel="noopener"'}>${k}</a></li>`,
    )
    .join("");
  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer class="ft"><div class="tp"><div><img src="img/logo.png" alt="Ace VOUGE" style="height:90px;margin-bottom:18px"><p>Silence. Strategy. Success.</p></div>
  <div><h4>Explore</h4><ul><li><a href="shop.html">Shop all</a></li><li><a href="shop.html?cat=New%20in">New in</a></li><li><a href="shop.html?cat=Tops">Tops</a></li><li><a href="shop.html?cat=Bottoms">Bottoms</a></li></ul></div>
  <div><h4>Brand</h4><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></div>
  <div><h4>Follow</h4><ul>${so}</ul></div></div><div class="big" aria-hidden="true">Ace VOUGE</div>
  <div class="note">&copy; <span id="yr"></span> Ace VOUGE.</div></footer>`,
  );
  $("#yr").textContent = new Date().getFullYear();
  $$("a[aria-disabled]").forEach((a) =>
    a.addEventListener("click", (e) => e.preventDefault()),
  );
  const mainEl = $("main");
  if (mainEl) mainEl.id = "main";

  /* menu, transitions */
  $("#bg").onclick = () => {
    const o = document.body.classList.toggle("nav-open");
    $("#bg").setAttribute("aria-expanded", o);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (
      !a ||
      a.target ||
      e.metaKey ||
      e.ctrlKey ||
      a.hasAttribute("aria-disabled")
    )
      return;
    const u = new URL(a.href, location.href);
    if (
      u.origin !== location.origin ||
      (u.pathname === location.pathname && u.search === location.search)
    )
      return;
    e.preventDefault();
    $("#cur").classList.add("in");
    setTimeout(() => (location.href = a.href), 400);
  });
  addEventListener("pageshow", () => {
    $("#cur").classList.remove("in");
    document.body.classList.remove("nav-open");
  });

  /* ---------- cart ---------- */
  const save = () => {
    try {
      localStorage.setItem("av_cart", JSON.stringify(cart));
    } catch (e) {}
    render();
  };
  function render() {
    $("#cc").textContent = cart.reduce((s, i) => s + i.qty, 0);
    $("#cl").innerHTML = cart.length
      ? cart
          .map((i, n) => {
            const p = byId(i.id);
            return `<li><img src="${p.a}" alt=""><div><h3>${p.name}</h3><small>Size ${i.size} / ${money(p.price)}</small><div class="q"><button data-q="${n}" data-d="-1" aria-label="Decrease">&minus;</button><span>${i.qty}</span><button data-q="${n}" data-d="1" aria-label="Increase">+</button></div></div><button class="x" data-r="${n}">Remove</button></li>`;
          })
          .join("")
      : '<li style="display:block;border:0;color:var(--frost)">Your cart is empty. <a class="lnk" href="shop.html">Browse the shop</a></li>';
    $("#st").textContent = money(
      cart.reduce((s, i) => s + i.qty * byId(i.id).price, 0),
    );
  }
  const openCart = (o) => {
    $("#cart").classList.toggle("open", o);
    $("#shd").classList.toggle("open", o);
    $("#cart").setAttribute("aria-hidden", !o);
    if (o) $("#xc").focus();
  };
  $("#oc").onclick = () => openCart(true);
  $("#xc").onclick = $("#shd").onclick = () => openCart(false);
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") openCart(false);
  });
  $("#cl").addEventListener("click", (e) => {
    const q = e.target.dataset;
    if (q.q !== undefined) {
      cart[q.q].qty += +q.d;
      if (cart[q.q].qty < 1) cart.splice(q.q, 1);
      save();
    }
    if (q.r !== undefined) {
      cart.splice(q.r, 1);
      save();
    }
  });
  $("#co").onclick = () => {
    if (!cart.length) {
      $("#cn").textContent = "Add something to your cart first.";
      return;
    }

    const items = cart
      .map((item) => ({ item, product: byId(item.id) }))
      .filter((entry) => entry.product);

    if (!items.length) {
      $("#cn").textContent =
        "Your cart needs updating. Please add your items again.";
      return;
    }

    const itemCount = items.reduce((sum, entry) => sum + entry.item.qty, 0);
    const total = items.reduce(
      (sum, entry) => sum + entry.item.qty * entry.product.price,
      0,
    );
    const lines = items.map(
      ({ item, product }) =>
        `• ${product.name} — ${product.color}, size ${item.size}\n` +
        `  ${money(product.price)} × ${item.qty} = ${money(product.price * item.qty)}`,
    );

    const message = [
      "Hello Ace VOUGE! I hope you’re doing well. I’d like to place this order:",
      "",
      ...lines,
      "",
      `Number of pieces: ${itemCount}`,
      `Total: ${money(total)}`,
      "",
      "Please let me know the next steps. Thank you!",
    ].join("\n");

    const url = `https://wa.me/2349115766872?text=${encodeURIComponent(message)}`;
    const checkoutWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (!checkoutWindow) {
      location.href = url;
    } else {
      $("#cn").textContent =
        "Your order message is ready in WhatsApp. Review it and tap Send.";
    }
  };
  function add(id, size, qty = 1) {
    const f = cart.find((i) => i.id === id && i.size === size);
    f ? (f.qty += qty) : cart.push({ id, size, qty });
    save();
    $("#cn").textContent = "";
    openCart(true);
  }
  render();

  /* ---------- cards + tilt ---------- */
  const card = (
    p,
  ) => `<article class="card" data-id="${p.id}"><a class="cm ${p.dark ? "lt" : ""}" data-tilt href="product.html?id=${p.id}" aria-label="${p.name}, ${p.color}"><img class="a" src="${p.a}" alt="${p.name} in ${p.color}${p.single ? ", front and back" : ", front"}">${p.single ? "" : `<img class="b" src="${p.b}" alt="${p.name} in ${p.color}, back" loading="lazy">`}</a>
  <div class="ci"><div><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><small class="card-color">${p.color}</small></div><span>${money(p.price)}</span></div>
  <div class="sz" role="group" aria-label="Size">${SIZES.map((s) => `<button aria-pressed="${s === "M"}" data-s="${s}">${s}</button>`).join("")}</div><button class="btn" data-add>Add to cart</button></article>`;
  document.addEventListener("click", (e) => {
    const s = e.target.closest(".card .sz button");
    if (s) {
      $$("button", s.parentNode).forEach((b) =>
        b.setAttribute("aria-pressed", b === s),
      );
    }
    if (e.target.closest("[data-add]") && e.target.closest(".card")) {
      const c = e.target.closest(".card");
      add(c.dataset.id, $("[aria-pressed=true]", c).dataset.s);
    }
  });
  document.addEventListener("mousemove", (e) => {
    const t = e.target.closest && e.target.closest("[data-tilt]");
    if (!t || matchMedia("(hover:none)").matches) return;
    const r = t.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    $$("img", t).forEach(
      (i) =>
        (i.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.04)`),
    );
  });
  document.addEventListener("mouseout", (e) => {
    const t = e.target.closest && e.target.closest("[data-tilt]");
    if (t) $$("img", t).forEach((i) => (i.style.transform = ""));
  });

  /* ---------- pages ---------- */
  const qs = new URLSearchParams(location.search);
  if (page === "home") {
    $("#best").innerHTML = [
      "logo-tank-white",
      "logo-tee",
      "denim-knickers",
      "silence-tee",
    ]
      .map(byId)
      .map(card)
      .join("");
    const rail = $("#showroom-rail"),
      info = $("#showroom-info");
    const copy = (p, i, extra = "") =>
      `<div class="showcase-copy ${extra}" role="group" aria-label="${i + 1} of ${PRODUCTS.length}: ${p.name}, ${p.color}"><p class="eyebrow">${p.cat.toUpperCase()} <span>·</span> ${p.color.toUpperCase()}</p><h2>${p.name}</h2><p class="showcase-desc">${p.desc}</p><div class="showcase-meta"><div class="showcase-price"><span>THE PIECE</span><b>${money(p.price)}</b></div><div class="showcase-sizes"><span>AVAILABLE SIZES</span><b>${SIZES.join("　")}</b></div></div><a class="btn solid showcase-cta" href="product.html?id=${p.id}">Shop now <span aria-hidden="true">↗</span></a></div>`;
    rail.innerHTML = PRODUCTS.map(
      (
        p,
        i,
      ) => `<article class="showcase-slide" data-dark="${p.dark}" role="group" aria-roledescription="product" aria-label="${i + 1} of ${PRODUCTS.length}: ${p.name}, ${p.color}">
    <a class="showcase-visual ${p.single ? "one-image" : ""}" href="product.html?id=${p.id}" tabindex="-1" aria-hidden="true"><span class="showcase-aura"></span><div class="showcase-product">${p.single ? "" : `<img class="showcase-back" src="${p.b}" alt="" loading="lazy">`}<img class="showcase-front" src="${p.a}" alt="" loading="lazy"></div><span class="showcase-visual-label">ACE VOUGE · ${String(i + 1).padStart(2, "0")}</span></a>${copy(p, i, "showcase-static-copy")}
   </article>`,
    ).join("");
    info.innerHTML = PRODUCTS.map((p, i) => copy(p, i)).join("");
    $("#showroom-total").textContent = String(PRODUCTS.length).padStart(2, "0");
  }
  if (page === "shop") {
    let cat = qs.get("cat") || "All";
    const g = $("#grid"),
      q = $("#q"),
      so = $("#so");
    q.value = qs.get("q") || "";
    const draw = () => {
      let l = PRODUCTS.filter(
        (p) =>
          (cat === "All" || (cat === "New in" ? p.newIn : p.cat === cat)) &&
          (p.name + " " + p.color)
            .toLowerCase()
            .includes(q.value.trim().toLowerCase()),
      );
      const k = so.value;
      l.sort((a, b) =>
        k === "lo"
          ? a.price - b.price
          : k === "hi"
            ? b.price - a.price
            : k === "az"
              ? a.name.localeCompare(b.name)
              : b.date - a.date,
      );
      g.innerHTML = l.length
        ? l.map(card).join("")
        : '<p class="empty">No products match. Clear the search or choose All.</p>';
      $$("#cats button").forEach((b) =>
        b.setAttribute("aria-pressed", b.dataset.c === cat),
      );
      $("#cnt").textContent =
        l.length + (l.length === 1 ? " piece" : " pieces");
    };
    $("#cats").onclick = (e) => {
      if (e.target.dataset.c) {
        cat = e.target.dataset.c;
        draw();
      }
    };
    q.oninput = so.onchange = draw;
    draw();
  }
  if (page === "product") {
    const p = byId(qs.get("id")) || PRODUCTS[0];
    document.title = p.name + " | Ace VOUGE";
    let size = "M",
      qty = 1,
      flipped = false;
    $("#pv").innerHTML =
      `<div class="pst ${p.dark ? "lt" : ""} ${p.single ? "single" : ""}" data-pt><div class="pfl" id="pf"><img src="${p.a}" alt="${p.name} in ${p.color}, front and back">${p.single ? "" : `<img class="b" src="${p.b}" alt="${p.name}, back">`}</div>${p.single ? "" : '<button class="turn" id="tn">Turn over</button>'}</div>`;
    $("#pi").innerHTML =
      `<p class="sm" style="color:var(--steel)">${p.cat}</p><h1>${p.name}</h1><div class="pr">${money(p.price)}</div><p>${p.desc}</p>
   <div class="opt"><h4>Colour</h4><span class="sw"><i style="background:${p.colorHex}"></i>${p.color}</span>${p.id.startsWith("logo-tank-") ? `<div class="colour-links">${["white", "grey", "black"].map((c) => `<a href="product.html?id=logo-tank-${c}" aria-label="View ${c} tank" class="${p.id.endsWith(c) ? "selected" : ""}" style="--swatch:${c === "white" ? "#f2f3f0" : c === "grey" ? "#a9aaac" : "#111214"}"></a>`).join("")}</div>` : ""}</div>
   <div class="opt"><h4>Size</h4><div class="sz" id="sz">${SIZES.map((s) => `<button aria-pressed="${s === size}" data-s="${s}">${s}</button>`).join("")}</div></div>
   <div class="opt"><h4>Quantity</h4><div class="qty"><button id="qm" aria-label="Decrease">&minus;</button><output id="qv">1</output><button id="qp" aria-label="Increase">+</button></div></div>
   <div class="buy"><button class="btn solid" id="ab">Add to cart</button><a class="lnk" href="shop.html">Keep shopping</a></div>
   <div class="dl">${p.det.map((d) => `<div><span>${d[0]}</span><b>${d[1]}</b></div>`).join("")}</div>`;
    const pf = $("#pf"),
      rot = (x = 0, y = 0) =>
        (pf.style.transform = `rotateY(${(flipped ? 180 : 0) + x}deg) rotateX(${y}deg)`);
    if (!p.single) {
      $("#tn").onclick = () => {
        flipped = !flipped;
        rot();
      };
      $("[data-pt]").addEventListener("mousemove", (e) => {
        if (matchMedia("(hover:none)").matches) return;
        const r = e.currentTarget.getBoundingClientRect();
        pf.style.transition = "transform .15s";
        rot(
          ((e.clientX - r.left) / r.width - 0.5) * 16,
          -((e.clientY - r.top) / r.height - 0.5) * 10,
        );
      });
      $("[data-pt]").addEventListener("mouseleave", () => {
        pf.style.transition = "";
        rot();
      });
    }
    $("#sz").onclick = (e) => {
      if (e.target.dataset.s) {
        size = e.target.dataset.s;
        $$("#sz button").forEach((b) =>
          b.setAttribute("aria-pressed", b === e.target),
        );
      }
    };
    $("#qm").onclick = () =>
      ($("#qv").textContent = qty = Math.max(1, qty - 1));
    $("#qp").onclick = () => ($("#qv").textContent = ++qty);
    $("#ab").onclick = () => add(p.id, size, qty);
    $("#rel").innerHTML = PRODUCTS.filter((x) => x.id !== p.id)
      .map(card)
      .join("");
  }
  if (page === "contact") {
    const f = $("#cf"),
      v = {
        name: (x) => x.trim().length > 1 || "Enter your name.",
        email: (x) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x) ||
          "Enter a valid email address.",
        message: (x) =>
          x.trim().length >= 10 || "Write at least 10 characters.",
      };
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      Object.keys(v).forEach((k) => {
        const r = v[k](f[k].value),
          m = $("#e-" + k);
        m.textContent = r === true ? "" : r;
        f[k].setAttribute("aria-invalid", r !== true);
        if (r !== true) ok = false;
      });
      if (!ok) {
        f.querySelector("[aria-invalid=true]").focus();
        return;
      }
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Message from " + f.name.value)}&body=${encodeURIComponent(f.message.value + "\n\n" + f.email.value)}`;
      $("#ok").textContent =
        "Thanks. Your email app should open with the message ready to send.";
      f.reset();
    });
  }

  /* ---------- motion ---------- */
  const mqFlat = matchMedia(
    "(max-width:860px),(prefers-reduced-motion:reduce)",
  );
  mqFlat.addEventListener("change", () => location.reload());
  const REDUCE = matchMedia("(prefers-reduced-motion:reduce)").matches;
  addEventListener("load", () => {
    const ld = $("#ld");
    const start = () => {
      $("#cur").classList.remove("in");
      if (window.gsap && window.ScrollTrigger) motion();
    };
    if (ld && window.gsap && !sessionStorage.getItem("av_seen") && !REDUCE) {
      sessionStorage.setItem("av_seen", "1");
      gsap
        .timeline({
          onComplete: () => {
            ld.remove();
            start();
          },
        })
        .to("#ld img", { opacity: 1, duration: 0.7 })
        .to("#ld i", { width: 160, duration: 0.6 }, "<.2")
        .to(
          "#ld",
          { yPercent: -100, duration: 0.7, ease: "power3.inOut" },
          "+=.25",
        );
    } else {
      ld && ld.remove();
      start();
    }
  });
  function motion() {
    gsap.registerPlugin(ScrollTrigger);
    if (REDUCE) return;
    const st = (el, s, e) => ({ trigger: el, start: s, end: e, scrub: true });
    if (page === "home") {
      gsap
        .timeline()
        .from(".home-copy .eyebrow", {
          opacity: 0,
          y: 14,
          duration: 0.6,
          ease: "power2.out",
        })
        .from(
          ".home-copy h1",
          { opacity: 0, y: 32, rotateX: 8, duration: 0.9, ease: "power3.out" },
          "-=.25",
        )
        .from(
          ".home-copy>p:not(.eyebrow),.home-copy .btn",
          {
            opacity: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=.35",
        );
      gsap.fromTo(
        ".hero-image-main",
        { y: 36, rotateY: -7, rotateX: 4, opacity: 0 },
        {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.2,
          ease: "power3.out",
        },
      );
      gsap.fromTo(
        ".hero-image-side",
        { y: 48, rotateY: 8, rotateX: 5, opacity: 0 },
        {
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1,
          delay: 0.35,
          ease: "power3.out",
        },
      );
      gsap.to(".hero-image-main img", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: st(".home-hero", "top top", "bottom top"),
      });
      $$(".category-card,.home-products .card").forEach((el, i) =>
        gsap.fromTo(
          el,
          { y: 38, rotateX: 3, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            delay: (i % 3) * 0.06,
          },
        ),
      );
      gsap.fromTo(
        ".home-note-mark",
        { y: 20, rotateY: -18 },
        {
          y: -10,
          rotateY: 18,
          ease: "none",
          scrollTrigger: st(".home-note", "top bottom", "bottom top"),
        },
      );
      const showroom = $("#showroom"),
        rail = $("#showroom-rail"),
        info = $("#showroom-info"),
        slides = $$(".showcase-slide", rail),
        copies = $$(".showcase-copy:not(.showcase-static-copy)", info),
        count = slides.length;
      if (showroom && rail && count > 1) {
        const progress = $(".showroom-progress"),
          fill = $("#showroom-progress"),
          current = $("#showroom-current");
        const syncCarousel = (rawProgress) => {
          const position = rawProgress * (count - 1),
            pct = Math.round(rawProgress * 100),
            activeIndex = Math.min(count - 1, Math.floor(position + 0.5)),
            index = activeIndex + 1;
          fill.style.transform = `scaleX(${rawProgress})`;
          progress.setAttribute("aria-valuenow", pct);
          current.textContent = String(index).padStart(2, "0");
          slides.forEach((slide, i) => {
            const distance = Math.abs(i - position),
              weight =
                distance < 1 ? 0.5 + 0.5 * Math.cos(Math.PI * distance) : 0;
            const object = $(".showcase-product", slide),
              copy = copies[i],
              delta = i - position;
            const imageAlpha = weight ? 0.28 + weight * 0.72 : 0,
              scale = 0.77 + weight * 0.28,
              depth = -170 + weight * 230,
              rotation = Math.max(-19, Math.min(19, delta * 16));
            object.style.opacity = imageAlpha.toFixed(3);
            object.style.visibility = weight > 0.005 ? "visible" : "hidden";
            object.style.transform = `translate3d(0,${delta * 14}px,${depth}px) rotateY(${rotation}deg) scale(${scale})`;
            const isActive = i === activeIndex,
              panelAlpha = isActive ? 1 - 0.35 * Math.min(1, distance * 2) : 0;
            copy.style.opacity = panelAlpha.toFixed(3);
            copy.style.visibility = isActive ? "visible" : "hidden";
            copy.style.transform = `translate3d(0,${delta * 16}px,0)`;
            $(".showcase-price", copy).style.clipPath =
              `inset(0 0 ${Math.min(34, distance * 68)}% 0)`;
            $(".showcase-cta", copy).style.opacity = (
              isActive ? 1 - 0.3 * Math.min(1, distance * 2) : 0
            ).toFixed(3);
            $(".showcase-cta", copy).style.transform =
              `translateY(${distance * 12}px)`;
          });
        };
        const horizontal = gsap.to(rail, {
          x: () => -(rail.scrollWidth - innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: showroom,
            start: "top top",
            end: () =>
              `+=${Math.max(1, (count - 1) * Math.max(innerWidth, innerHeight))}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              syncCarousel(self.progress);
            },
          },
        });
        syncCarousel(horizontal.scrollTrigger.progress);
        ScrollTrigger.refresh();
      }
      return;
    }
    $$(
      "[data-rv],.sh,.tx,.look figure,.cp,.ab-h .im,.promo>*,.ct-l,#cf",
    ).forEach((el) =>
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: st(el, "top 95%", "top 72%"),
        },
      ),
    );
    $$("[data-clip]").forEach((el) =>
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          ease: "none",
          scrollTrigger: st(el, "top 95%", "top 55%"),
        },
      ),
    );
    $$("[data-par]").forEach((el) =>
      gsap.fromTo(
        el,
        { yPercent: -+el.dataset.par },
        {
          yPercent: +el.dataset.par,
          ease: "none",
          scrollTrigger: st(el.parentElement, "top bottom", "bottom top"),
        },
      ),
    );
  }
  if (page === "contact") {
    $("#em").innerHTML = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;
    $("#ph").textContent = CONFIG.phone;
    $("#ad").textContent = CONFIG.address;
    $("#so2").innerHTML = Object.entries(CONFIG.social)
      .map(
        ([k, v]) =>
          `<a href="${v}" ${v === "#" ? 'aria-disabled="true"' : 'target="_blank" rel="noopener"'}>${k}</a>`,
      )
      .join(", ");
    $$("#so2 a[aria-disabled]").forEach((a) =>
      a.addEventListener("click", (e) => e.preventDefault()),
    );
  }
});
