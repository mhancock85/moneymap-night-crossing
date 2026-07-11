/* ============================================================
   MY MONEY MAP — light-first redesign
   Hero armillary (three.js, scoped to hero, paused off-screen)
   GSAP reveals · ten-year growth chart · EN/PT i18n
   Native scrolling throughout: no scroll hijack, no scrubbed
   full-page effects.
   ============================================================ */

(() => {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    /* ================= i18n ================= */
    const translations = {
        en: {
            "nav.services": "Services",
            "nav.instrument": "Calculator",
            "nav.about": "About",
            "nav.contact": "Contact",
            "nav.cta": "Book a free call",
            "hero.kicker": "Personal finance coaching · UK & Brazil",
            "hero.l1": "Where does",
            "hero.l2": "your money",
            "hero.l3": "actually go?",
            "hero.desc": "Marcia is a certified personal finance consultant. She helps you build a budget that holds, clear debt faster and start investing, in plain words, with a plan you can actually follow.",
            "hero.cta1": "Book a free call",
            "hero.cta2": "See how it works",
            "hero.scroll": "Scroll to explore",
            "services.kicker": "What Marcia helps with",
            "services.t1": "Four services,",
            "services.t2": "one plan.",
            "services.sub": "Every client starts in a different place. These are the four areas Marcia covers, and your plan can mix all of them.",
            "services.1.name": "Budgeting & planning",
            "services.1.desc": "A realistic spending plan that fits your life now and still protects your long-term goals.",
            "services.2.name": "Debt management",
            "services.2.desc": "A clear order for paying off what you owe, so interest stops eating your income.",
            "services.3.name": "Investing basics",
            "services.3.desc": "The stock market explained in plain words, and a diversified portfolio you understand.",
            "services.4.name": "Miles & discounts",
            "services.4.desc": "Get more from the spending you already do: points, miles and everyday savings.",
            "instrument.kicker": "Try it yourself",
            "instrument.t1": "How much could",
            "instrument.t2": "your money grow?",
            "instrument.sub": "Slide the dial to set a monthly amount. The chart shows what it could become in ten years at a steady 8% a year.",
            "instrument.figcap": "The Money Map planner",
            "instrument.permonth": "Set aside per month",
            "instrument.note": "After ten years, that habit could be worth",
            "instrument.endsub": "after 10 years",
            "instrument.foot": "8% is a conservative take on long-term stock market history: the S&P 500 has averaged around 10% a year over the past 50 years. Illustration only, not financial advice, and past performance doesn't guarantee future returns.",
            "about.kicker": "About Marcia",
            "about.t1": "Your partner in",
            "about.t2": "wealth building.",
            "about.desc": "Financial freedom is not really about the numbers. It is the confidence to live the life you want. As a Certified Personal Finance Consultant working between the UK and Brazil, Marcia turns complex financial ideas into simple daily habits.",
            "about.c1": "Certified Personal Finance Consultant (C.P.F.E.®)",
            "about.c2": "Member of the Personal Finance Society (UK) and ABEFIN (Brazil)",
            "about.c3": "Cross-border money mentoring sessions",
            "about.c4": "Approachable, inclusive, non-judgemental",
            "about.c5": "Tailored roadmaps for every client",
            "about.cta": "Book a free discovery call",
            "contact.kicker": "Get in touch",
            "contact.t1": "Ready to make",
            "contact.t2": "a start?",
            "contact.sub": "Send a message and Marcia will reply within 24 hours.",
            "contact.name": "Your name",
            "contact.email": "Your email",
            "contact.message": "Your goal",
            "contact.placeholder": "e.g. 'Start investing', 'Travel planning'",
            "contact.submit": "Send message",
            "contact.sending": "Sending…",
            "contact.success": "Thank you. Marcia will be in touch soon.",
            "contact.error": "Something went wrong. Please try again or email directly.",
            "contact.figcap": "Let's start growing your money.",
            "footer.tag": "Empowering your financial future.",
            "footer.copy": "© 2026 My Money Map. All rights reserved.",
            "footer.credit": "Designed and built by Claude Fable 5"
        },
        pt: {
            "nav.services": "Serviços",
            "nav.instrument": "Calculadora",
            "nav.about": "Sobre",
            "nav.contact": "Contato",
            "nav.cta": "Agende uma conversa",
            "hero.kicker": "Consultoria financeira pessoal · Reino Unido & Brasil",
            "hero.l1": "Para onde vai",
            "hero.l2": "o seu dinheiro,",
            "hero.l3": "de verdade?",
            "hero.desc": "A Marcia é consultora de finanças pessoais certificada. Ela ajuda você a montar um orçamento que funciona, quitar dívidas mais rápido e começar a investir, em palavras simples e com um plano que dá para seguir.",
            "hero.cta1": "Agende uma conversa",
            "hero.cta2": "Veja como funciona",
            "hero.scroll": "Role para explorar",
            "services.kicker": "Como a Marcia ajuda",
            "services.t1": "Quatro serviços,",
            "services.t2": "um plano.",
            "services.sub": "Cada cliente começa de um ponto diferente. Estas são as quatro áreas que a Marcia cobre, e o seu plano pode combinar todas elas.",
            "services.1.name": "Orçamento & planejamento",
            "services.1.desc": "Um plano de gastos realista, que cabe na sua vida de hoje e ainda protege seus objetivos de longo prazo.",
            "services.2.name": "Gestão de dívidas",
            "services.2.desc": "Uma ordem clara para quitar o que você deve, para os juros pararem de corroer a sua renda.",
            "services.3.name": "Investimentos para iniciantes",
            "services.3.desc": "O mercado financeiro explicado em palavras simples, e uma carteira diversificada que você entende.",
            "services.4.name": "Milhas & descontos",
            "services.4.desc": "Aproveite melhor os gastos que você já tem: pontos, milhas e economias no dia a dia.",
            "instrument.kicker": "Experimente",
            "instrument.t1": "Quanto o seu dinheiro",
            "instrument.t2": "poderia crescer?",
            "instrument.sub": "Deslize o controle para definir um valor mensal. O gráfico mostra o que ele pode virar em dez anos, com 8% ao ano.",
            "instrument.figcap": "O planner Money Map",
            "instrument.permonth": "Guardado por mês",
            "instrument.note": "Depois de dez anos, esse hábito pode valer",
            "instrument.endsub": "após 10 anos",
            "instrument.foot": "8% é uma estimativa conservadora baseada no histórico de longo prazo do mercado de ações: o S&P 500 rendeu em média cerca de 10% ao ano nos últimos 50 anos. Apenas ilustrativo, não é aconselhamento financeiro, e rentabilidade passada não garante retornos futuros.",
            "about.kicker": "Sobre a Marcia",
            "about.t1": "Sua parceira na",
            "about.t2": "construção de patrimônio.",
            "about.desc": "Liberdade financeira não é só sobre números. É a confiança de viver a vida que você quer. Como Consultora de Finanças Pessoais Certificada, atuando entre o Reino Unido e o Brasil, a Marcia transforma ideias financeiras complexas em hábitos simples do dia a dia.",
            "about.c1": "Consultora de Finanças Pessoais Certificada (C.P.F.E.®)",
            "about.c2": "Membro da Personal Finance Society (Reino Unido) e da ABEFIN (Brasil)",
            "about.c3": "Mentorias financeiras internacionais, entre países",
            "about.c4": "Acolhedora, inclusiva e sem julgamentos",
            "about.c5": "Roteiros personalizados para cada cliente",
            "about.cta": "Agende uma conversa gratuita",
            "contact.kicker": "Fale com a Marcia",
            "contact.t1": "Pronto para",
            "contact.t2": "começar?",
            "contact.sub": "Envie uma mensagem e a Marcia responde em até 24 horas.",
            "contact.name": "Seu nome",
            "contact.email": "Seu e-mail",
            "contact.message": "Seu objetivo",
            "contact.placeholder": "ex.: 'Começar a investir', 'Planejar viagens'",
            "contact.submit": "Enviar mensagem",
            "contact.sending": "Enviando…",
            "contact.success": "Obrigada. A Marcia entrará em contato em breve.",
            "contact.error": "Algo deu errado. Tente novamente ou envie um e-mail diretamente.",
            "contact.figcap": "Vamos começar a fazer o seu dinheiro crescer.",
            "footer.tag": "Fortalecendo o seu futuro financeiro.",
            "footer.copy": "© 2026 My Money Map. Todos os direitos reservados.",
            "footer.credit": "Desenhado e construído por Claude Fable 5"
        }
    };

    let currentLang = localStorage.getItem("mmm-fable-lang") || "en";

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem("mmm-fable-lang", lang);
        document.body.dataset.lang = lang;
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        const dict = translations[lang];
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.dataset.i18n;
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });
        document.querySelectorAll(".lang-btn").forEach(btn => {
            const active = btn.dataset.lang === lang;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-pressed", String(active));
        });
        if (window.__renderChart) window.__renderChart(true);
    }

    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.addEventListener("click", () => applyLang(btn.dataset.lang)));

    applyLang(currentLang);

    /* ================= Hero armillary sphere (scoped, paused off-screen) ================= */
    const heroCanvas = document.getElementById("heroCanvas");
    if (heroCanvas && typeof THREE !== "undefined") {
        const hero = document.getElementById("hero");
        const renderer = new THREE.WebGLRenderer({ canvas: heroCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 34);

        // Line-art instrument in light-surface colours: slate + amber deep
        const slateMat = new THREE.LineBasicMaterial({ color: 0x3A4A5F, transparent: true, opacity: 0.4 });
        const accentMat = new THREE.LineBasicMaterial({ color: 0xB87515, transparent: true, opacity: 0.8 });
        const softMat = new THREE.LineBasicMaterial({ color: 0x6B5B8A, transparent: true, opacity: 0.35 });

        const armillary = new THREE.Group();

        function makeRing(radius, material, segments = 160) {
            const pts = [];
            for (let k = 0; k <= segments; k++) {
                const a = (k / segments) * Math.PI * 2;
                pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
            }
            return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), material);
        }

        for (let m = 0; m < 3; m++) {
            const ring = makeRing(9, slateMat);
            ring.rotation.y = (m / 3) * Math.PI;
            armillary.add(ring);
        }
        const equator = makeRing(9, softMat);
        equator.rotation.x = Math.PI / 2;
        armillary.add(equator);
        const ecliptic = makeRing(9.9, accentMat);
        ecliptic.rotation.x = Math.PI / 2 - 0.408;
        armillary.add(ecliptic);
        const inner = makeRing(5.4, slateMat);
        inner.rotation.x = Math.PI / 3;
        inner.rotation.y = Math.PI / 5;
        armillary.add(inner);
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, -11.5, 0), new THREE.Vector3(0, 11.5, 0)
        ]);
        armillary.add(new THREE.Line(axisGeo, accentMat));
        const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.55, 16, 16),
            new THREE.MeshBasicMaterial({ color: 0xB87515 })
        );
        armillary.add(core);

        armillary.rotation.z = 0.18;
        scene.add(armillary);

        let mouseX = 0, mouseY = 0;
        if (!isTouch) {
            window.addEventListener("pointermove", e => {
                mouseX = e.clientX / window.innerWidth - 0.5;
                mouseY = e.clientY / window.innerHeight - 0.5;
            }, { passive: true });
        }

        function resize() {
            const w = heroCanvas.clientWidth, h = heroCanvas.clientHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);

        let rafId = null;
        function tick(now) {
            const t = now * 0.001;
            armillary.rotation.y = t * 0.12;
            armillary.rotation.x = Math.sin(t * 0.07) * 0.08 + mouseY * 0.12;
            armillary.position.x = mouseX * 1.2;
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(tick);
        }

        if (prefersReduced) {
            renderer.render(scene, camera);   // one static frame
        } else {
            // Render only while the hero is on screen
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.isIntersecting && !document.hidden) {
                        if (!rafId) rafId = requestAnimationFrame(tick);
                    } else if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                });
            }).observe(hero);
            document.addEventListener("visibilitychange", () => {
                if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = null; }
                else if (!document.hidden && !rafId) rafId = requestAnimationFrame(tick);
            });
        }
    }

    /* ================= GSAP: entrance + scroll reveals (no scrubbing) ================= */
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        if (!prefersReduced) {
            // Initial states set from JS so no-JS visitors see everything
            gsap.set(".reveal", { opacity: 0, y: 34 });
            gsap.set(".hero-title .line-inner", { yPercent: 115 });
            gsap.set(".hero-kicker, .hero-desc, .hero-ctas, .hero-scroll", { opacity: 0 });

            // Hero entrance, straight in: no loader
            gsap.timeline({ delay: 0.15 })
                .to(".hero-title .line-inner", {
                    yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power3.out"
                })
                .to(".hero-kicker, .hero-desc, .hero-ctas, .hero-scroll", {
                    opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power2.out"
                }, "-=0.7");

            // Scroll reveals
            gsap.utils.toArray(".reveal").forEach(el => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 86%" }
                });
            });

            // Image clip reveals
            document.querySelectorAll(".reveal-img").forEach(wrap => {
                gsap.fromTo(wrap,
                    { clipPath: "inset(0 0 100% 0)" },
                    {
                        clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut",
                        scrollTrigger: { trigger: wrap, start: "top 82%" }
                    });
                gsap.fromTo(wrap.querySelector("img"),
                    { scale: 1.16 },
                    {
                        scale: 1, duration: 1.6, ease: "power2.out",
                        scrollTrigger: { trigger: wrap, start: "top 82%" }
                    });
            });

            // Service diagrams: stroke-draw + star pop, once, on enter
            document.querySelectorAll(".constellation").forEach(svg => {
                const line = svg.querySelector(".c-line");
                const len = line.getTotalLength();
                gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
                gsap.set(svg.querySelectorAll(".c-star"), { scale: 0, transformOrigin: "center" });

                ScrollTrigger.create({
                    trigger: svg, start: "top 84%",
                    onEnter: () => {
                        gsap.to(line, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
                        gsap.to(svg.querySelectorAll(".c-star"), {
                            scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2.5)", delay: 0.2
                        });
                    },
                    once: true
                });
            });
        } else {
            gsap.set(".reveal", { opacity: 1, y: 0 });
        }

        // Nav: solid after scroll, hide going down, show coming up
        const nav = document.getElementById("nav");
        ScrollTrigger.create({
            start: "top -80",
            onUpdate: self => {
                nav.classList.toggle("is-hidden", self.direction === 1 && window.scrollY > 300);
                nav.classList.toggle("is-scrolled", window.scrollY > 80);
            },
            onLeaveBack: () => { nav.classList.remove("is-hidden", "is-scrolled"); }
        });
    }

    /* ================= Nav: highlight the section in view ================= */
    const navLinks = [...document.querySelectorAll(".nav-link")];
    if ("IntersectionObserver" in window && navLinks.length) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                navLinks.forEach(a =>
                    a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        ["hero", "services", "instrument", "about", "contact"].forEach(id => {
            const el = document.getElementById(id);
            if (el) io.observe(el);   // hero has no matching link: clears the highlight at the top
        });
    }

    /* ================= Ten-year growth chart ================= */
    const range = document.getElementById("amountRange");
    if (range) {
        const svgNS = "http://www.w3.org/2000/svg";
        const gridG = document.getElementById("chartGrid");
        const starsG = document.getElementById("chartStars");
        const endG = document.getElementById("chartEndLabel");
        const linePath = document.getElementById("chartLine");
        const fillPath = document.getElementById("chartFill");
        const dialValue = document.getElementById("dialValue");
        const projValue = document.getElementById("projValue");

        // Geometry
        const W = 720, H = 400, L = 64, R = 176, T = 46, B = 52;
        const plotW = W - L - R, plotH = H - T - B;

        // FV of monthly contributions at 8%/yr after k years
        const i = 0.08 / 12;
        const fvFactor = years => ((Math.pow(1 + i, years * 12) - 1) / i) * (1 + i);
        const Y_MAX = 1000 * fvFactor(10) * 1.04; // headroom above max slider value

        const fmt = v => "£" + Math.round(v).toLocaleString(currentLang === "pt" ? "pt-BR" : "en-GB");

        const xFor = year => L + (year / 10) * plotW;
        const yFor = value => T + plotH - (value / Y_MAX) * plotH;

        // Static grid: three horizontal references + year labels
        [50000, 100000, 150000].forEach(v => {
            const gl = document.createElementNS(svgNS, "line");
            gl.setAttribute("x1", L); gl.setAttribute("x2", W - R + 40);
            gl.setAttribute("y1", yFor(v)); gl.setAttribute("y2", yFor(v));
            gl.setAttribute("class", "chart-gridline");
            gridG.appendChild(gl);
            const tx = document.createElementNS(svgNS, "text");
            tx.setAttribute("x", L - 8); tx.setAttribute("y", yFor(v) + 4);
            tx.setAttribute("text-anchor", "end");
            tx.setAttribute("class", "chart-gridlabel");
            tx.textContent = "£" + (v / 1000) + "k";
            gridG.appendChild(tx);
        });
        [0, 5, 10].forEach(yr => {
            const tx = document.createElementNS(svgNS, "text");
            tx.setAttribute("x", xFor(yr)); tx.setAttribute("y", H - 18);
            tx.setAttribute("text-anchor", "middle");
            tx.setAttribute("class", "chart-axislabel");
            tx.textContent = yr + "y";
            gridG.appendChild(tx);
        });
        const base = document.createElementNS(svgNS, "line");
        base.setAttribute("x1", L); base.setAttribute("x2", W - R + 40);
        base.setAttribute("y1", yFor(0)); base.setAttribute("y2", yFor(0));
        base.setAttribute("class", "chart-gridline");
        base.style.strokeDasharray = "none";
        gridG.appendChild(base);

        // Eleven stars: year 0 through 10
        const starEls = [];
        for (let yr = 0; yr <= 10; yr++) {
            const c = document.createElementNS(svgNS, "circle");
            c.setAttribute("class", "chart-star");
            c.setAttribute("r", yr === 10 ? 7 : 3.2 + yr * 0.28);
            starsG.appendChild(c);
            starEls.push(c);
        }

        const endValue = document.createElementNS(svgNS, "text");
        endValue.setAttribute("class", "chart-endlabel");
        endG.appendChild(endValue);
        const endSub = document.createElementNS(svgNS, "text");
        endSub.setAttribute("class", "chart-endlabel-sub");
        endG.appendChild(endSub);

        const state = { amount: Number(range.value), shown: Number(range.value) };

        function renderChart(instant) {
            const m = state.shown;
            let d = "";
            for (let yr = 0; yr <= 10; yr++) {
                const x = xFor(yr), y = yFor(m * fvFactor(yr));
                starEls[yr].setAttribute("cx", x);
                starEls[yr].setAttribute("cy", y);
                d += (yr === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
            }
            linePath.setAttribute("d", d);
            fillPath.setAttribute("d",
                d + "L " + xFor(10).toFixed(1) + " " + yFor(0) + " L " + xFor(0).toFixed(1) + " " + yFor(0) + " Z");

            const endY = yFor(m * fvFactor(10));
            const final = m * fvFactor(10);
            const labelY = Math.min(Math.max(endY + 8, T + 24), T + plotH - 18);
            endValue.setAttribute("x", xFor(10) + 16);
            endValue.setAttribute("y", labelY);
            endValue.textContent = fmt(final);
            endSub.setAttribute("x", xFor(10) + 16);
            // Near the baseline the sub-label ducks above the value to clear the axis
            endSub.setAttribute("y", labelY >= T + plotH - 30 ? labelY - 24 : labelY + 20);
            endSub.textContent = translations[currentLang]["instrument.endsub"];

            projValue.textContent = fmt(final);
            dialValue.textContent = fmt(state.amount);
            range.style.setProperty("--fill", (state.amount / 10) + "%");
        }

        window.__renderChart = renderChart;

        function update() {
            state.amount = Number(range.value);
            if (typeof gsap !== "undefined" && !prefersReduced) {
                gsap.to(state, { shown: state.amount, duration: 0.55, ease: "power2.out", overwrite: true, onUpdate: renderChart });
            } else {
                state.shown = state.amount;
                renderChart(true);
            }
            dialValue.textContent = fmt(state.amount);
        }

        range.addEventListener("input", update);
        state.shown = state.amount;
        renderChart(true);
    }

    /* ================= Contact form (production Apps Script endpoint) ================= */
    const form = document.getElementById("contactForm");
    if (form) {
        const submitBtn = document.getElementById("submitBtn");
        const formMsg = document.getElementById("formMsg");
        const ENDPOINT = "https://script.google.com/macros/s/AKfycbyJsso4KsPVc1xsnP0p_YmVTsP5mkt5xBe5h2n2CTx6D8hIr3GTLFq6tdaPcpiAkaOnAA/exec";

        form.addEventListener("submit", async e => {
            e.preventDefault();
            if (!form.reportValidity()) return;
            const dict = translations[currentLang];
            submitBtn.disabled = true;
            submitBtn.textContent = dict["contact.sending"];
            formMsg.textContent = "";
            formMsg.className = "form-msg mono";

            try {
                await fetch(ENDPOINT, {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: document.getElementById("contactName").value,
                        email: document.getElementById("contactEmail").value,
                        message: document.getElementById("contactMessage").value
                    })
                });
                formMsg.textContent = dict["contact.success"];
                formMsg.classList.add("ok");
                form.reset();
            } catch (err) {
                console.error("Form submission error:", err);
                formMsg.textContent = dict["contact.error"];
                formMsg.classList.add("err");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = dict["contact.submit"];
            }
        });
    }
})();
