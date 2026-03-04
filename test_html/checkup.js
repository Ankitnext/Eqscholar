// Helper to get radio value safely
function getValue(form, name) {
  const checked = form.querySelector(`input[name="${name}"]:checked`);
  return checked ? parseInt(checked.value, 10) : null;
}

function calculateScore() {
  const form = document.getElementById('checkForm');
  const resultBox = document.getElementById('resultBox');

  let missing = false;
  const values = {};

  for (let i = 1; i <= 12; i++) {
    const val = getValue(form, `q${i}`);
    if (val === null) {
      missing = true;
    }
    values[`q${i}`] = val || 0; // treat unanswered as 0 for now
  }

  if (missing) {
    alert('Please answer all 12 questions so we can read your state correctly.');
    return;
  }

  // Sub-scores
  const riskScore   = values.q1 + values.q2 + values.q3 + values.q4;
  const lostScore   = values.q5 + values.q6 + values.q7 + values.q8;
  const stressScore = values.q9 + values.q10 + values.q11 + values.q12;
  const totalScore  = riskScore + lostScore + stressScore;

  const riskFlags =
    values.q2 >= 2 || // self-harm thoughts
    values.q1 >= 3 || // constant worthlessness
    values.q3 >= 3 || // extreme panic/anger
    values.q4 >= 3;   // non-functioning

  // Extra chaotic signal = high jumping + overthinking + low focus
  let chaosSignals = 0;
  if (values.q7 >= 2) chaosSignals++;
  if (values.q9 >= 2) chaosSignals++;
  if (values.q11 >= 2) chaosSignals++;

  let category = '';
  let title = '';
  let message = '';
  let tagClass = '';
  let tagText = '';

  // CATEGORY LOGIC
  if (riskFlags || (totalScore >= 24 && riskScore >= 8)) {
    category = 'risk';
    title = 'You may need expert support';
    message = `
      Your answers show strong emotional pain or very low energy.
      This check-up cannot diagnose you, but it suggests you might benefit
      from talking to a mental health professional or trusted adult.
      If you ever feel in immediate danger, please contact your local emergency
      number or a crisis helpline in your country.
    `;
    tagClass = 'tag-risk';
    tagText = 'High Priority: Talk to Someone';
  } else if (lostScore >= 8 && lostScore >= stressScore) {
    category = 'lost';
    title = 'You are likely in Lost Mode';
    message = `
      You feel confused, low-clarity or blank often.
      This fits the Lost League: your inner GPS has no clear next direction yet.
      Best next step: learn to name emotions, do 60-second awareness checks
      and play small clarity games to find your next 1 step.
    `;
    tagClass = 'tag-lost';
    tagText = 'Lost League · 0–99 EQ';
  } else if (stressScore >= 8 && stressScore >= lostScore && values.q10 + values.q12 >= 4) {
    category = 'storm';
    title = 'You are in Storm / Anxiety Mode';
    message = `
      Your answers show high stress, overthinking or body anxiety.
      This fits the Storm League: big waves of feelings that are hard to handle.
      Best next step: breath games, grounding, and anger/anxiety handling lessons.
    `;
    tagClass = 'tag-storm';
    tagText = 'Storm League · 300–399 EQ';
  } else if (chaosSignals >= 2) {
    category = 'chaotic';
    title = 'You are in Chaotic / Overthinking Mode';
    message = `
      Your energy is active but scattered – jumping between options,
      overthinking and struggling to focus. This fits Chaotic Mode.
      Best next step: triggers & reactions lessons, priority games,
      and simple daily routines.
    `;
    tagClass = 'tag-chaos';
    tagText = 'Chaotic League · 100–199 EQ';
  } else {
    category = 'ok';
    title = 'You are in a Growing / Stable Zone';
    message = `
      You have normal levels of stress with no major red flags.
      You can still grow faster by training awareness, empathy and
      higher EQ leagues, but you may not need heavy support right now.
    `;
    tagClass = 'tag-ok';
    tagText = 'Stable · Ready to Level Up';
  }

  // ---------- ACTION BUTTONS (with fixed URLs + Home button) ----------
  let actionsHTML = '';

  // NOTE: all paths are absolute for GitHub Pages: /Eqscholar/...
  if (category === 'risk') {
    actionsHTML = `
      <div class="result-actions">
        <button class="small-btn primary" type="button"
          onclick="window.open('https://www.google.com/search?q=mental+health+helpline+near+me','_blank')">
          🔍 Find Mental Health Helplines
        </button>
        <button class="small-btn" type="button"
          onclick="window.location.href='journey-map.html'">
          🧭 Go to EQ Journey (Gentle Start)
        </button>
        <button class="small-btn secondary" type="button"
          onclick="window.location.href='/Eqscholar/index.html'">
          🏠 Back to Home
        </button>
      </div>
    `;
  } else if (category === 'lost') {
    actionsHTML = `
      <div class="result-actions">
        <button class="small-btn primary" type="button"
          onclick="window.location.href='/Eqscholar/games/lost/lost.html'">
          🧭 Enter Lost Mode Hub
        </button>
        <button class="small-btn" type="button"
          onclick="window.location.href='/Eqscholar/journey-map.html'">
          🗺️ View Full EQ Journey Map
        </button>
        <button class="small-btn secondary" type="button"
          onclick="window.location.href='/Eqscholar/index.html'">
          🏠 Back to Home
        </button>
      </div>
    `;
  } else if (category === 'chaotic') {
    actionsHTML = `
      <div class="result-actions">
        <button class="small-btn primary" type="button"
          onclick="window.location.href='/Eqscholar/games/chaotic/chaotic.html'">
          🌪 Go to Chaotic Mode Hub
        </button>
        <button class="small-btn" type="button"
          onclick="window.location.href='/Eqscholar/journey-map.html'">
          🗺️ EQ Journey Map
        </button>
        <button class="small-btn secondary" type="button"
          onclick="window.location.href='/Eqscholar/index.html'">
          🏠 Back to Home
        </button>
      </div>
    `;
  } else if (category === 'storm') {
    actionsHTML = `
      <div class="result-actions">
        <button class="small-btn primary" type="button"
          onclick="window.location.href='/Eqscholar/games/storm/storm.html'">
          ⛈ Enter Storm Mode Hub
        </button>
        <button class="small-btn" type="button"
          onclick="window.location.href='/Eqscholar/games/lost/lost.html'">
          🧭 Calm with Lost Mode Games
        </button>
        <button class="small-btn secondary" type="button"
          onclick="window.location.href='/Eqscholar/index.html'">
          🏠 Back to Home
        </button>
      </div>
    `;
  } else {
    actionsHTML = `
      <div class="result-actions">
        <button class="small-btn primary" type="button"
          onclick="window.location.href='/Eqscholar/journey-map.html'">
          🧭 Choose Your League
        </button>
        <button class="small-btn" type="button"
          onclick="window.location.href='/Eqscholar/games.html'">
          🎮 Play EQ Training Games
        </button>
        <button class="small-btn secondary" type="button"
          onclick="window.location.href='/Eqscholar/index.html'">
          🏠 Back to Home
        </button>
      </div>
    `;
  }

  // ---------- RENDER RESULT ----------
  resultBox.classList.remove('hidden');
  resultBox.classList.remove('visible'); // reset animation
  void resultBox.offsetWidth;            // force reflow so animation restarts

  resultBox.innerHTML = `
    <h2>${title}</h2>
    <span class="tag ${tagClass}">${tagText}</span>
    <p style="margin-top:8px;">${message}</p>
    <p style="margin-top:8px; font-size:0.8rem; opacity:0.8;">
      (Total stress score: ${totalScore} · Risk: ${riskScore} · Lost: ${lostScore} · Stress: ${stressScore})
    </p>
    ${actionsHTML}
  `;

  resultBox.classList.add('visible');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* --------- ANIMATIONS: fade-in for sections + progress bar ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Mark hero + blocks as fade targets
  document.querySelectorAll('.hero, .block').forEach((el) => {
    el.classList.add('fade-target');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.fade-target').forEach((el) =>
    observer.observe(el)
  );

  // Progress bar updates as they answer (if you have these elements in HTML)
  const form = document.getElementById('checkForm');
  const progressFill = document.getElementById('progressFill');
  const answeredCountEl = document.getElementById('answeredCount');

  if (form && progressFill && answeredCountEl) {
    form.addEventListener('change', () => {
      let answered = 0;
      for (let i = 1; i <= 12; i++) {
        if (getValue(form, `q${i}`) !== null) answered++;
      }
      answeredCountEl.textContent = answered.toString();
      const pct = (answered / 12) * 100;
      progressFill.style.width = `${pct}%`;
    });
  }
});
