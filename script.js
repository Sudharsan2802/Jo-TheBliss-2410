/* ============================================================
 * EDIT HERE: your personal content
 * ============================================================ */

// 1) The password she must type (a front-end password is NOT truly secure).
const DEMO_PASSWORD = "LoveYou@3000";

// 2) Message shown when the password is wrong.
const WRONG_PASSWORD_MESSAGE = "Not quite, baby. Try again ♡";

// 3) The "reasons" list. Add, remove or rewrite freely.
const reasons = [
  {
    title: "Your Beautiful Eyes 👀❤️",
    text: "If I could get lost in one place in this entire world, I would choose your eyes, every single time."
  },
  {
    title: "The Way You Make Me Feel",
    text: "You make the world feel a little less heavy, and happiness feel a little more real."
  },
  {
    title: "Your Beautiful Smile 🌙❤️",
    text: "I wish you could see yourself through my eyes, just once, so you’d understand why your smile means so much to me."
  },
  {
    title: "The Way We Talk",
    text: "Even the most ordinary conversations with you become memories my heart wants to keep."
  },
  {
    title: "You Feel Like Home 🏡",
    text: "Somehow, my heart found a home in a person, and that person is you."
  },
  {
    title: "The Little Things About You",
    text: "I fall in love with the little things about you that you probably don’t even realize I notice."
  },
  {
    title: "Your Beautiful Heart",
    text: "Your eyes may have caught my attention, but your heart gave me a thousand more reasons to stay in love with you."
  },
  {
    title: "The Way I Miss You 🥹",
    text: "Even when you’re not beside me, you find a way to be present in my thoughts, my songs, and my quietest moments."
  },
  {
    title: "The Person You’re Becoming 🫂❤️",
    text: "I admire the strength you carry, the person you are, and the beautiful person you’re becoming."
  },
  {
    title: "Our Beautiful Memories ",
    text: "Some of my favorite memories are the little moments that might mean nothing to the world but mean everything to me."
  },
  {
    title: "Your Existence",
    text: "I’m grateful that you were born, because October 24th gave the world someone who became incredibly special to my heart. 🌎❤️"
  },
  {
	 title: "Because You're You",
	 text: "I love the person behind the eyes I adore, the smile I miss, the voice I long to hear, and the heart that has become so precious to mine. If I wrote a thousand reasons, somehow, they'd all lead back to this one: it's you, baby. It's always been the little things that make you, you. ❤️🫂"
  }
];

/* ============================================================
 * Code below: no need to edit
 * ============================================================ */

const loginScreen = document.querySelector("#loginScreen");
const mainSite = document.querySelector("#mainSite");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredPassword = document.querySelector("#password").value;

  if (enteredPassword !== DEMO_PASSWORD) {
    loginError.textContent = WRONG_PASSWORD_MESSAGE;
    return;
  }

  loginError.textContent = "";
  loginScreen.hidden = true;
  mainSite.hidden = false;

  window.scrollTo({ top: 0, behavior: "instant" });
});

// Birthday reveal
const birthdayButton = document.querySelector("#birthdayButton");
const birthdaySection = document.querySelector("#birthdaySection");
const replayButton = document.querySelector("#replayButton");

let celebrationTimer;

function openBirthdaySurprise() {
  birthdaySection.hidden = false;

  birthdaySection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  // Restart the entrance animation.
  birthdaySection.classList.remove("is-celebrating");
  void birthdaySection.offsetWidth;
  birthdaySection.classList.add("is-celebrating");

  launchConfetti();
}

birthdayButton.addEventListener("click", openBirthdaySurprise);
replayButton.addEventListener("click", openBirthdaySurprise);

// Small, dependency-free confetti animation.
const canvas = document.querySelector("#confettiCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrame = null;

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  cancelAnimationFrame(animationFrame);
  clearTimeout(celebrationTimer);

  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = ["#f4d6d9", "#e7c68e", "#e9a7b9", "#fff5eb", "#b86b88"];

  particles = Array.from({ length: 125 }, () => ({
    x: Math.random() * width,
    y: -Math.random() * height * 0.7,
    size: 3 + Math.random() * 5,
    speed: 1.5 + Math.random() * 3.5,
    drift: (Math.random() - 0.5) * 2.2,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.12,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  const start = performance.now();

  function frame(now) {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.drift;
      p.y += p.speed;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      ctx.restore();
    });

    if (now - start < 4200) {
      animationFrame = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, width, height);
      animationFrame = null;
    }
  }

  animationFrame = requestAnimationFrame(frame);
}

// Photo lightbox
const photoDialog = document.querySelector("#photoDialog");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");

document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = card.querySelector("img").alt;
    lightboxCaption.textContent = card.dataset.caption || "";

    if (typeof photoDialog.showModal === "function") {
      photoDialog.showModal();
    }
  });
});

document.querySelector("#closePhoto").addEventListener("click", () => {
  photoDialog.close();
});

// Clicking the backdrop closes the photo.
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) {
    photoDialog.close();
  }
});

// Reasons I love you
let reasonIndex = 0;

function showReason(index) {
  const reason = reasons[index];
  document.querySelector("#reasonTitle").textContent = reason.title;
  document.querySelector("#reasonBody").textContent = reason.text;
  document.querySelector("#reasonCount").textContent =
    `Little reminder ${index + 1} of ${reasons.length} ♡`;
}

showReason(reasonIndex);

document.querySelector("#reasonButton").addEventListener("click", () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  showReason(reasonIndex);
});

// Final letter
document.querySelector("#finalLetterButton").addEventListener("click", () => {
  const letter = document.querySelector("#finalLetter");
  letter.hidden = !letter.hidden;

  if (!letter.hidden) {
    letter.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
