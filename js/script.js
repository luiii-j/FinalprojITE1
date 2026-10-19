// DevFolio interactions: theme toggle, welcome message, navigation, filters, form, and back-to-top.
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");

  // Interaction 1: show a friendly welcome message.
  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage) {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    welcomeMessage.textContent = `${greeting}! Thanks for visiting my portfolio.`;
  }

  // Interaction 2: light/dark mode toggle. The setting stays for the current browser session.
  if (themeToggle) {
    if (localStorage.getItem("devfolio-theme") === "light") body.classList.add("light-mode");
    themeToggle.textContent = body.classList.contains("light-mode") ? "☾" : "☼";
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light-mode");
      const isLight = body.classList.contains("light-mode");
      themeToggle.textContent = isLight ? "☾" : "☼";
      localStorage.setItem("devfolio-theme", isLight ? "light" : "dark");
    });
  }

  // Mobile navigation.
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  // Interaction 3: reveal additional information on the About page.
  const aboutMoreBtn = document.getElementById("aboutMoreBtn");
  const aboutMore = document.getElementById("aboutMore");
  if (aboutMoreBtn && aboutMore) {
    aboutMoreBtn.addEventListener("click", () => {
      const isHidden = aboutMore.hasAttribute("hidden");
      if (isHidden) aboutMore.removeAttribute("hidden");
      else aboutMore.setAttribute("hidden", "");
      aboutMoreBtn.textContent = isHidden ? "Show less" : "Read more about my goals";
    });
  }
  // Interaction 5: contact form validates and prepares a message; it does not send automatically.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const message = document.getElementById("senderMessage").value.trim();
      if (!name || !email || !message) {
        alert("Please complete all fields.");
        return;
      }
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const bodyText = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
      alert("Your email app will open so you can review and send the message.");
      window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${bodyText}`;
    });
  }

  // Interaction 6: back-to-top button.
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 350);
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Current year in the shared footer.
  document.querySelectorAll(".year").forEach(node => node.textContent = new Date().getFullYear());
});
