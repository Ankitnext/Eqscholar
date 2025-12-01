// journey-games.js
// 🔹 Simplified: ONLY Intro (lesson page), Explore (mode page) and card animations
// 🔹 All quiz + mini-game logic removed

// Open lesson intro page in a new tab/window
// Example: lesson.html?lesson=lost-mode
function startLesson(lessonId) {
  const url = `lesson.html?lesson=${lessonId}`;
  window.open(
    url,
    "_blank",
    "width=1000,height=700,scrollbars=yes,resizable=yes"
  );
}

// Go to mode's explore page (Lost, Chaotic, etc.)
// Expected structure: games/<modeId>/<modeId>.html
//   e.g. games/lost/lost.html , games/chaotic/chaotic.html
function exploreLesson(modeId) {
  window.location.href = `games/${modeId}/${modeId}.html`;
}

// Simple fade-in animation for cards when they come into view
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".lesson-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeIn 0.8s ease-out forwards";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    observer.observe(card);
  });

  // Inject fadeIn keyframes once
  const style = document.createElement("style");
  style.textContent =
    "@keyframes fadeIn { from { opacity:0; transform:translateY(15px);} to {opacity:1; transform:translateY(0);} }";
  document.head.appendChild(style);
});
