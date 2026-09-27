const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id], header[id]");
const revealItems = document.querySelectorAll(".reveal");
const year = document.getElementById("year");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

function updateActiveNav() {
  let current = "home";

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 130) current = section.id;
  });

  navItems.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

year.textContent = new Date().getFullYear();
