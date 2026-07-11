/* ============================================================
   MY MONEY MAP — The Night Crossing
   Persistent WebGL sky · armillary sphere · scroll-driven dawn
   GSAP choreography · ten-year star chart · EN/PT i18n
   ============================================================ */

(() => {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;

    /* ================= i18n ================= */
    const translations = {
        en: {
            "nav.services": "Constellations",
            "nav.instrument": "Instrument",
            "nav.about": "Navigator",
            "nav.contact": "First light",
            "nav.cta": "Book a free call",
            "hero.kicker": "Polaris · the fixed point · personal finance coaching",
            "hero.l1": "The night sky",
            "hero.l2": "was the first",
            "hero.l3": "map.",
            "hero.desc": "Money can feel like open water after dark. Marcia teaches you to steer by fixed points: a budget that holds, debt that shrinks, investments that quietly compound. Personal finance coaching, charted properly.",
            "hero.cta1": "Chart your course",
            "hero.cta2": "Meet the navigator",
            "hero.scroll": "Begin the crossing",
            "services.kicker": "The constellations · four fixed points",
            "services.t1": "Four constellations,",
            "services.t2": "one clear sky.",
            "services.sub": "Every route Marcia charts uses the same four fixed points. Learn to read them, and the dark stops being frightening.",
            "services.1.const": "The Scales",
            "services.1.name": "Budgeting & planning",
            "services.1.desc": "A realistic spending plan that balances the life you have now against the goals you refuse to give up.",
            "services.2.const": "The Anchor",
            "services.2.name": "Debt management",
            "services.2.desc": "Weigh anchor. A clear order for clearing what you owe, so the interest stops steering your life.",
            "services.3.const": "The Plough",
            "services.3.name": "Investing basics",
            "services.3.desc": "The Plough points to Polaris. A diversified portfolio, explained in plain words, pointing the same way for decades.",
            "services.4.const": "The Swallow",
            "services.4.name": "Miles & discounts",
            "services.4.desc": "Fly further for less. Points, miles and the quiet discounts hiding in the spending you already do.",
            "instrument.kicker": "Vega · the instrument",
            "instrument.t1": "Ten years,",
            "instrument.t2": "plotted tonight.",
            "instrument.sub": "Slide the dial. A monthly amount, kept up for ten years at a steady 8%, plots a curve you can navigate by.",
            "instrument.figcap": "Field notes: the Money Map planner",
            "instrument.permonth": "Set aside per month",
            "instrument.note": "After ten years of that habit, the chart reads",
            "instrument.endsub": "after 10 years",
            "instrument.foot": "8% is a conservative take on long-term stock market history: the S&P 500 has averaged around 10% a year over the past 50 years. Illustration only, not financial advice, and past performance doesn't guarantee future returns.",
            "about.kicker": "Sirius · the navigator",
            "about.t1": "Charts are paper.",
            "about.t2": "Marcia is the navigator.",
            "about.desc": "Financial freedom is not really about the numbers. It is the confidence to live the life you want. As a Certified Personal Finance Consultant working between the UK and Brazil, Marcia bridges the gap between complex financial concepts and the habits you keep on an ordinary Tuesday.",
            "about.c1": "Certified Personal Finance Consultant (C.P.F.E.®)",
            "about.c2": "Member of the Personal Finance Society (UK) and ABEFIN (Brazil)",
            "about.c3": "Cross-border money mentoring sessions",
            "about.c4": "Approachable, inclusive, non-judgemental",
            "about.c5": "Tailored roadmaps for every client",
            "about.cta": "Book a free discovery call",
            "contact.kicker": "Civil dawn 04:58 · first light",
            "contact.t1": "The sky is lightest",
            "contact.t2": "just before you start.",
            "contact.sub": "Send a message and Marcia will reply within 24 hours.",
            "contact.name": "Your name",
            "contact.email": "Your email",
            "contact.message": "Your goal",
            "contact.placeholder": "e.g. 'Start investing', 'Travel planning'",
            "contact.submit": "Send message",
            "contact.sending": "Sending…",
            "contact.success": "Thank you. Marcia will be in touch soon.",
            "contact.error": "Something went wrong. Please try again or email directly.",
            "contact.figcap": "Coffee first. Then the crossing.",
            "footer.tag": "Empowering your financial future.",
            "footer.copy": "© 2026 My Money Map. All rights reserved.",
            "footer.credit": "Designed and built by Claude Fable 5"
        },
        pt: {
            "nav.services": "Constelações",
            "nav.instrument": "Instrumento",
            "nav.about": "Navegadora",
            "nav.contact": "Primeira luz",
            "nav.cta": "Agende uma conversa",
            "hero.kicker": "Polaris · o ponto fixo · consultoria financeira pessoal",
            "hero.l1": "O céu noturno",
            "hero.l2": "foi o primeiro",
            "hero.l3": "mapa.",
            "hero.desc": "Dinheiro pode parecer mar aberto depois do anoitecer. A Marcia ensina você a navegar por pontos fixos: um orçamento que se sustenta, dívidas que encolhem, investimentos que crescem em silêncio. Consultoria financeira pessoal, traçada como deve ser.",
            "hero.cta1": "Trace sua rota",
            "hero.cta2": "Conheça a navegadora",
            "hero.scroll": "Comece a travessia",
            "services.kicker": "As constelações · quatro pontos fixos",
            "services.t1": "Quatro constelações,",
            "services.t2": "um céu limpo.",
            "services.sub": "Toda rota que a Marcia traça usa os mesmos quatro pontos fixos. Aprenda a lê-los e o escuro deixa de assustar.",
            "services.1.const": "A Balança",
            "services.1.name": "Orçamento & planejamento",
            "services.1.desc": "Um plano de gastos realista, que equilibra a vida que você tem hoje com os objetivos que você se recusa a abandonar.",
            "services.2.const": "A Âncora",
            "services.2.name": "Gestão de dívidas",
            "services.2.desc": "Âncora levantada. Uma ordem clara para quitar o que você deve, para os juros pararem de comandar a sua vida.",
            "services.3.const": "O Arado",
            "services.3.name": "Investimentos para iniciantes",
            "services.3.desc": "O Arado aponta para a Polaris. Uma carteira diversificada, explicada em palavras simples, apontando na mesma direção por décadas.",
            "services.4.const": "A Andorinha",
            "services.4.name": "Milhas & descontos",
            "services.4.desc": "Voe mais longe gastando menos. Pontos, milhas e os descontos discretos escondidos nos gastos que você já tem.",
            "instrument.kicker": "Vega · o instrumento",
            "instrument.t1": "Dez anos,",
            "instrument.t2": "traçados hoje à noite.",
            "instrument.sub": "Deslize o medidor. Um valor mensal, mantido por dez anos a 8% ao ano, desenha uma curva pela qual você pode navegar.",
            "instrument.figcap": "Notas de campo: o planner Money Map",
            "instrument.permonth": "Guardado por mês",
            "instrument.note": "Depois de dez anos desse hábito, o mapa mostra",
            "instrument.endsub": "após 10 anos",
            "instrument.foot": "8% é uma estimativa conservadora baseada no histórico de longo prazo do mercado de ações: o S&P 500 rendeu em média cerca de 10% ao ano nos últimos 50 anos. Apenas ilustrativo, não é aconselhamento financeiro, e rentabilidade passada não garante retornos futuros.",
            "about.kicker": "Sirius · a navegadora",
            "about.t1": "Mapas são papel.",
            "about.t2": "A Marcia é a navegadora.",
            "about.desc": "Liberdade financeira não é só sobre números. É a confiança de viver a vida que você quer. Como Consultora de Finanças Pessoais Certificada, atuando entre o Reino Unido e o Brasil, a Marcia conecta conceitos financeiros complexos aos hábitos que você mantém numa terça-feira qualquer.",
            "about.c1": "Consultora de Finanças Pessoais Certificada (C.P.F.E.®)",
            "about.c2": "Membro da Personal Finance Society (Reino Unido) e da ABEFIN (Brasil)",
            "about.c3": "Mentorias financeiras internacionais, entre países",
            "about.c4": "Acolhedora, inclusiva e sem julgamentos",
            "about.c5": "Roteiros personalizados para cada cliente",
            "about.cta": "Agende uma conversa gratuita",
            "contact.kicker": "Amanhecer civil 04:58 · primeira luz",
            "contact.t1": "O céu fica mais claro",
            "contact.t2": "pouco antes de você começar.",
            "contact.sub": "Envie uma mensagem e a Marcia responde em até 24 horas.",
            "contact.name": "Seu nome",
            "contact.email": "Seu e-mail",
            "contact.message": "Seu objetivo",
            "contact.placeholder": "ex.: 'Começar a investir', 'Planejar viagens'",
            "contact.submit": "Enviar mensagem",
            "contact.sending": "Enviando…",
            "contact.success": "Obrigada. A Marcia entrará em contato em breve.",
            "contact.error": "Algo deu errado. Tente novamente ou envie um e-mail diretamente.",
            "contact.figcap": "Primeiro o café. Depois, a travessia.",
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

    /* ================= Smooth scroll (Lenis) ================= */
    let lenis = null;
    if (!prefersReduced && typeof Lenis !== "undefined") {
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        window.__lenis = lenis;
        lenis.on("scroll", () => { if (window.ScrollTrigger) ScrollTrigger.update(); });
        gsap.ticker.add(t => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener("click", e => {
                const target = document.querySelector(a.getAttribute("href"));
                if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -70 }); }
            });
        });
    }

    /* ================= WebGL sky ================= */
    const skyCanvas = document.getElementById("sky");
    const skyState = { fade: 1, armOpacity: 1 };

    if (skyCanvas && typeof THREE !== "undefined") {
        const renderer = new THREE.WebGLRenderer({ canvas: skyCanvas, alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
        camera.position.set(0, 0, 1);

        /* ---- Starfield: instanced points with twinkle shader ---- */
        const STAR_COUNT = window.innerWidth < 720 ? 450 : 950;
        const positions = new Float32Array(STAR_COUNT * 3);
        const sizes = new Float32Array(STAR_COUNT);
        const phases = new Float32Array(STAR_COUNT);
        const colors = new Float32Array(STAR_COUNT * 3);

        const cream = new THREE.Color("#FAF6EF");
        const amber = new THREE.Color("#E8A33D");
        const dusk = new THREE.Color("#8E7FB0");

        for (let s = 0; s < STAR_COUNT; s++) {
            positions[s * 3] = (Math.random() - 0.5) * 130;
            positions[s * 3 + 1] = (Math.random() - 0.5) * 80;
            positions[s * 3 + 2] = -12 - Math.random() * 60;
            sizes[s] = 0.6 + Math.pow(Math.random(), 2.4) * 2.6;
            phases[s] = Math.random() * Math.PI * 2;
            const r = Math.random();
            const c = r < 0.82 ? cream : (r < 0.93 ? amber : dusk);
            colors[s * 3] = c.r; colors[s * 3 + 1] = c.g; colors[s * 3 + 2] = c.b;
        }

        const starGeo = new THREE.BufferGeometry();
        starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        starGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        starGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
        starGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

        const starMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uFade: { value: 1 },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
            },
            vertexShader: `
                attribute float aSize;
                attribute float aPhase;
                attribute vec3 aColor;
                uniform float uTime;
                uniform float uPixelRatio;
                varying float vTwinkle;
                varying vec3 vColor;
                void main() {
                    vColor = aColor;
                    vTwinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aPhase * 0.25) + aPhase * 7.0);
                    vec4 mv = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = aSize * uPixelRatio * (36.0 / -mv.z);
                    gl_Position = projectionMatrix * mv;
                }`,
            fragmentShader: `
                uniform float uFade;
                varying float vTwinkle;
                varying vec3 vColor;
                void main() {
                    vec2 uv = gl_PointCoord - 0.5;
                    float d = length(uv);
                    float glow = smoothstep(0.5, 0.02, d);
                    float core = smoothstep(0.16, 0.0, d);
                    float a = (glow * 0.5 + core) * vTwinkle * uFade;
                    if (a < 0.01) discard;
                    gl_FragColor = vec4(vColor, a);
                }`
        });

        const stars = new THREE.Points(starGeo, starMat);
        scene.add(stars);

        /* ---- Armillary sphere: rings of thin lines ---- */
        const armillary = new THREE.Group();

        const creamLineMat = new THREE.LineBasicMaterial({ color: 0xFAF6EF, transparent: true, opacity: 0.34 });
        const amberLineMat = new THREE.LineBasicMaterial({ color: 0xE8A33D, transparent: true, opacity: 0.75 });
        const duskLineMat = new THREE.LineBasicMaterial({ color: 0x8E7FB0, transparent: true, opacity: 0.4 });

        function makeRing(radius, material, segments = 160) {
            const pts = [];
            for (let k = 0; k <= segments; k++) {
                const a = (k / segments) * Math.PI * 2;
                pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
            }
            return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), material);
        }

        // Meridians
        for (let m = 0; m < 3; m++) {
            const ring = makeRing(9, creamLineMat);
            ring.rotation.y = (m / 3) * Math.PI;
            armillary.add(ring);
        }
        // Equator
        const equator = makeRing(9, duskLineMat);
        equator.rotation.x = Math.PI / 2;
        armillary.add(equator);
        // Ecliptic band (amber), tilted 23.4°
        const ecliptic = makeRing(9.9, amberLineMat);
        ecliptic.rotation.x = Math.PI / 2 - 0.408;
        armillary.add(ecliptic);
        // Inner ring
        const inner = makeRing(5.4, creamLineMat);
        inner.rotation.x = Math.PI / 3;
        inner.rotation.y = Math.PI / 5;
        armillary.add(inner);
        // Polar axis
        const axisGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, -11.5, 0), new THREE.Vector3(0, 11.5, 0)
        ]);
        armillary.add(new THREE.Line(axisGeo, amberLineMat));
        // Core star
        const coreGeo = new THREE.SphereGeometry(0.55, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xE8A33D, transparent: true, opacity: 0.95 });
        armillary.add(new THREE.Mesh(coreGeo, coreMat));

        armillary.rotation.z = 0.18;
        scene.add(armillary);

        const armMats = [creamLineMat, amberLineMat, duskLineMat, coreMat];
        const armBase = [0.34, 0.75, 0.4, 0.95];

        /* ---- Meteors: small pool of streaks ---- */
        const meteors = [];
        for (let m = 0; m < 2; m++) {
            const mat = new THREE.LineBasicMaterial({ color: 0xFAF6EF, transparent: true, opacity: 0 });
            const geo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0), new THREE.Vector3(4.5, 1.4, 0)
            ]);
            const line = new THREE.Line(geo, mat);
            line.position.set(0, 0, -30);
            scene.add(line);
            meteors.push({ line, mat });
        }

        function launchMeteor() {
            if (document.hidden || prefersReduced) { scheduleMeteor(); return; }
            const m = meteors[Math.floor(Math.random() * meteors.length)];
            if (m.mat.opacity > 0.01) { scheduleMeteor(); return; }
            const x0 = (Math.random() - 0.3) * 60;
            const y0 = 10 + Math.random() * 22;
            m.line.position.set(x0, y0, -34);
            const dist = 16 + Math.random() * 14;
            if (typeof gsap !== "undefined") {
                gsap.to(m.mat, { opacity: 0.85 * skyState.fade, duration: 0.18, ease: "power1.in" });
                gsap.to(m.line.position, {
                    x: x0 - dist, y: y0 - dist * 0.32, duration: 1.1, ease: "power2.out",
                    onComplete: () => gsap.to(m.mat, { opacity: 0, duration: 0.4 })
                });
            }
            scheduleMeteor();
        }
        function scheduleMeteor() { setTimeout(launchMeteor, 5000 + Math.random() * 7000); }
        if (!prefersReduced) scheduleMeteor();

        /* ---- Layout, parallax, render loop ---- */
        let mouseX = 0, mouseY = 0;
        if (!isTouch) {
            window.addEventListener("pointermove", e => {
                mouseX = e.clientX / window.innerWidth - 0.5;
                mouseY = e.clientY / window.innerHeight - 0.5;
            }, { passive: true });
        }

        function placeArmillary() {
            const aspect = window.innerWidth / window.innerHeight;
            if (aspect < 0.9) {
                armillary.position.set(0, 6, -46);
                armillary.scale.setScalar(0.8);
            } else {
                armillary.position.set(15, 1.5, -40);
                armillary.scale.setScalar(1);
            }
        }

        function resize() {
            const w = window.innerWidth, h = window.innerHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            starMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
            placeArmillary();
        }
        resize();
        window.addEventListener("resize", resize);

        let rafId = null;
        function tick(now) {
            const t = now * 0.001;
            starMat.uniforms.uTime.value = t;
            starMat.uniforms.uFade.value = skyState.fade;

            armillary.rotation.y = t * 0.12;
            armillary.rotation.x = Math.sin(t * 0.07) * 0.08 + mouseY * 0.12;
            armMats.forEach((mm, idx) => { mm.opacity = armBase[idx] * skyState.armOpacity; });

            stars.position.x = mouseX * -2.2;
            stars.position.y = mouseY * 1.6;

            camera.position.x += (mouseX * 1.1 - camera.position.x) * 0.05;
            camera.lookAt(0, 0, -30);

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(tick);
        }

        if (prefersReduced) {
            // One static frame: the sky exists, it just doesn't move
            starMat.uniforms.uTime.value = 3;
            renderer.render(scene, camera);
        } else {
            rafId = requestAnimationFrame(tick);
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) { cancelAnimationFrame(rafId); rafId = null; }
                else if (!rafId) rafId = requestAnimationFrame(tick);
            });
        }
    }

    /* ================= GSAP choreography ================= */
    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        /* ---- Initial states set from JS so no-JS visitors see everything ---- */
        if (!prefersReduced) {
            gsap.set(".reveal", { opacity: 0, y: 34 });
            gsap.set(".hero-title .line-inner", { yPercent: 115 });
            gsap.set(".hero-kicker, .hero-desc, .hero-ctas, .hero-scroll", { opacity: 0 });
        }

        /* ---- Loader → hero entrance ---- */
        if (!prefersReduced) {
            const intro = gsap.timeline();
            intro
                .from(".loader-word", { yPercent: 120, duration: 0.8, ease: "power3.out" })
                .from(".loader-star", { scale: 0, rotation: -120, duration: 0.5, ease: "back.out(2)" }, "-=0.35")
                .to(".loader-star", { rotation: 180, duration: 0.5, ease: "power2.inOut" }, "+=0.15")
                .to("#loader", { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "+=0.1")
                .set("#loader", { display: "none" })
                .to(".hero-title .line-inner", {
                    yPercent: 0, duration: 1.15, stagger: 0.13, ease: "power3.out"
                }, "-=0.45")
                .to(".hero-kicker, .hero-desc, .hero-ctas, .hero-scroll", {
                    opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power2.out"
                }, "-=0.7");

            // Scroll hint bows out once the crossing is under way
            gsap.to(".hero-scroll", {
                opacity: 0, ease: "none",
                scrollTrigger: { trigger: "#hero", start: "12% top", end: "35% top", scrub: 0.4 }
            });
        } else {
            gsap.set("#loader", { display: "none" });
        }

        /* ---- Scroll reveals ---- */
        if (!prefersReduced) {
            gsap.utils.toArray(".reveal").forEach(el => {
                gsap.to(el, {
                    opacity: 1, y: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 86%" }
                });
            });

            /* ---- Image clip reveals ---- */
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

            /* ---- Constellations: stroke-draw + star pop ---- */
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

            /* ---- Dawn: crossfade sky plates + fade stars across the page ---- */
            gsap.to("#skyDawn", {
                opacity: 1, ease: "none",
                scrollTrigger: {
                    trigger: ".daylight", start: "top 80%",
                    endTrigger: "#firstlight", end: "center center",
                    scrub: 0.6
                }
            });
            gsap.to(skyState, {
                fade: 0.3, ease: "none",
                scrollTrigger: {
                    trigger: ".daylight", start: "top 80%",
                    endTrigger: "#firstlight", end: "center center",
                    scrub: 0.6
                }
            });

            /* ---- Armillary: fades as the hero leaves ---- */
            gsap.to(skyState, {
                armOpacity: 0, ease: "none",
                scrollTrigger: {
                    trigger: "#constellations", start: "top 90%", end: "top 30%",
                    scrub: 0.4
                }
            });
        } else {
            gsap.set(".reveal", { opacity: 1, y: 0 });
            document.getElementById("skyDawn").style.opacity = "0.6";
        }

        /* ---- Nav: solid after scroll, hide down / show up ---- */
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

    /* ================= Ten-year star chart ================= */
    const range = document.getElementById("amountRange");
    if (range) {
        const svgNS = "http://www.w3.org/2000/svg";
        const gridG = document.getElementById("chartGrid");
        const starsG = document.getElementById("chartStars");
        const endG = document.getElementById("chartEndLabel");
        const linePath = document.getElementById("chartLine");
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

            const endY = yFor(m * fvFactor(10));
            const final = m * fvFactor(10);
            endValue.setAttribute("x", xFor(10) + 16);
            endValue.setAttribute("y", Math.max(endY + 8, T + 24));
            endValue.textContent = fmt(final);
            endSub.setAttribute("x", xFor(10) + 16);
            endSub.setAttribute("y", Math.max(endY + 8, T + 24) + 20);
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
