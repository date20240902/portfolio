const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Solid navigation background once the page scrolls past the top.
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const update = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// Hero: one voice at a time, each with its own accent colour and caption.
(() => {
  const roll = document.getElementById("roll");
  const note = document.getElementById("note");
  if (!roll || !note) return;

  const scenes = [
    { color: "--c-voice", note: "쉽게, 정확하게, 오래 남게 씁니다." },
    { color: "--c-newsletter", note: "기술 뉴스레터 『테크잇슈』 · 구독자 2,500명 이상" },
    { color: "--c-column", note: "뉴스레터와 기고를 합쳐 칼럼 300편 이상" },
    { color: "--c-book", note: "『샘 올트먼, 더 비전 2030』(한빛비즈, 2025)" },
    { color: "--c-talk", note: "기업 임직원 워크숍부터 고등학교 교실까지" },
  ];
  const words = [...roll.children];
  let current = 0;

  const fit = (n) => {
    roll.style.width = words[n].getBoundingClientRect().width + "px";
  };
  document.fonts.ready.then(() => fit(current));
  window.addEventListener("resize", () => fit(current));

  if (still) return;

  setInterval(() => {
    const prev = words[current];
    current = (current + 1) % words.length;
    const next = words[current];
    prev.className = "off";
    next.className = "on";
    setTimeout(() => (prev.className = ""), 820);

    fit(current);
    document.documentElement.style.setProperty("--acc", `var(${scenes[current].color})`);
    note.classList.add("out");
    setTimeout(() => {
      note.textContent = scenes[current].note;
      note.classList.remove("out");
    }, 450);
  }, 3200);
})();

// Hero: the opening verb eases toward a lighter weight where the pointer passes.
(() => {
  const letters = [...document.querySelectorAll("#verb span")];
  if (!letters.length || still) return;
  window.addEventListener("pointermove", (e) => {
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      l.style.fontVariationSettings = `"wght" ${Math.round(800 - Math.max(0, 1 - d / 300) * 650)}`;
    });
  });
})();

// Sections: titles roll up the first time they come into view; the menu marks the current section.
(() => {
  const sections = [...document.querySelectorAll(".section")];
  const links = new Map([...document.querySelectorAll(".nav__links a")].map((a) => [a.getAttribute("href").slice(1), a]));

  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        reveal.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("is-active"));
        links.get(entry.target.id)?.classList.add("is-active");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((s) => {
    if (still) s.classList.add("is-in");
    else reveal.observe(s);
    spy.observe(s);
  });
})();

// Inquiry form: validate in place, then send through FormSubmit without leaving the page.
(() => {
  const form = document.getElementById("inquiry");
  const status = document.getElementById("inquiry-status");
  if (!form || !status) return;

  const say = (text, kind = "") => {
    status.textContent = text;
    status.className = "inquiry__status" + (kind ? " is-" + kind : "");
  };

  form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("is-invalid"));
  form.addEventListener("change", (e) => e.target.closest(".field")?.classList.remove("is-invalid"));

  // Buttons elsewhere on the page open the form with a category already chosen.
  document.querySelectorAll("[data-category]").forEach((link) =>
    link.addEventListener("click", () => {
      form.category.value = link.dataset.category;
      form.category.closest(".field").classList.remove("is-invalid");
    })
  );

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form._honey.value) return;

    const missing = [...form.querySelectorAll(".field [required]")].filter((el) => !el.value.trim());
    missing.forEach((el) => el.closest(".field").classList.add("is-invalid"));
    if (missing.length) return say("표시된 칸을 채워 주세요.", "error");
    if (!form.email.checkValidity()) {
      form.email.closest(".field").classList.add("is-invalid");
      return say("이메일 주소를 다시 확인해 주세요.", "error");
    }
    if (!form.consent.checked) return say("개인정보 수집에 동의해 주세요.", "error");

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    say("보내는 중입니다.");

    const data = Object.fromEntries(new FormData(form));
    data._subject = `[techissue.xyz] ${data.category} 문의 · ${data.name}`;
    delete data._honey;

    try {
      const res = await fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || String(body.success) === "false") throw new Error(body.message || res.status);
      form.reset();
      say("잘 받았습니다. 확인하고 답장 드리겠습니다.", "done");
    } catch (err) {
      say("보내지 못했습니다. newsletter@techissue.xyz 로 직접 메일을 보내 주세요.", "error");
    } finally {
      button.disabled = false;
    }
  });
})();
