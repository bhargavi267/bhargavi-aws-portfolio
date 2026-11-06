const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// A subtle pointer glow on devices that support a fine pointer.
if (window.matchMedia("(pointer:fine)").matches) {
  const glow = document.querySelector(".cursor-glow");
  window.addEventListener("pointermove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
} else {
  document.querySelector(".cursor-glow").remove();
}

// The Superpower Lab is the portfolio's working, discoverable creative feature.
const superpowers = [
  {
    title: "PROBLEM SPOTTER",
    text: "I notice small everyday problems and enjoy exploring how technology could make them easier. NekoMemo began with a challenge I personally understood: remembering what I study."
  },
  {
    title: "HANDS-ON EXPLORER",
    text: "I learn by experimenting. Cloud labs, Linux setups, and connecting AWS services help me understand how the pieces of technology work together."
  },
  {
    title: "COST-CONSCIOUS BUILDER",
    text: "A surprise cloud bill taught me that building responsibly matters. That experience inspired the idea behind AWS Cost Guardian: visibility and approval before action."
  },
  {
    title: "CURIOSITY ENGINE",
    text: "I enjoy learning new tools and languages, asking why things work, and turning unfamiliar concepts into small experiments."
  },
  {
    title: "FUTURE-FOCUSED",
    text: "I'm growing toward cloud and DevOps engineering, with a long-term ambition to explore professional opportunities in Japan."
  }
];
let currentPower = -1;
const panel = document.getElementById("revealPanel");
const title = document.getElementById("revealTitle");
const copy = document.getElementById("revealText");
const activate = document.getElementById("activateLab");
const next = document.getElementById("nextPower");

function revealNextPower() {
  currentPower = (currentPower + 1) % superpowers.length;
  title.textContent = superpowers[currentPower].title;
  copy.textContent = superpowers[currentPower].text;
  panel.hidden = false;
  activate.textContent = "Superpower activated";
  activate.classList.add("activated");
}
activate.addEventListener("click", revealNextPower);
next.addEventListener("click", revealNextPower);

// Respect reduced-motion preferences for visitors who request it.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
