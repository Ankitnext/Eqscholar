// games/chaotic/chaotic.js

// Attach click handlers once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.play-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      startChaoticGame(btn.dataset.game);
    });
  });
});

/**
 * Master dispatcher for Chaotic Mode games
 */
function startChaoticGame(id) {
  const map = {
    chaosRadar: chaoticTriggerRadar,
    chaosSwitch: chaoticReactionSwitch,
    chaosBodyScan: chaoticBodyScanGame,
    chaosBreath: chaoticBreathWarrior,
  };
  if (map[id]) {
    map[id]();
  } else {
    console.warn('Unknown chaotic game id:', id);
  }
}

/* ---------------------------------------------
   1) Trigger Radar – spot the trigger
----------------------------------------------*/
function chaoticTriggerRadar() {
  modalOpen(
    'Trigger Radar',
    'Spot what is actually triggering the emotional storm.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Read the situation and tap what you think is the REAL trigger (not the surface reaction).';
  area.appendChild(info);

  const scenarios = [
    {
    text: 'You send a message, they see it but don’t reply for 3 hours.',
    options: [
      'They are rude',
      'Fear of being ignored / rejected',
      'They hate me',
      'Phone is broken',
    ],
    correctIndex: 1,
    },
    {
      text: 'Your friend suddenly stops talking to you in a group.',
      options: [
        'They secretly hate you',
        'You did something wrong in past',
        'Fear: “I am not liked”',
        'They are just busy',
      ],
      correctIndex: 2,
    },
    {
      text: 'Parents shout when you share a new idea.',
      options: [
        'They want to control everything',
        'Fear of risk / safety',
        'They don’t love you',
        'They are always angry',
      ],
      correctIndex: 1,
    },
  ];

  let index = 0;
  const card = document.createElement('div');
  card.style.marginTop = '14px';
  card.style.background = 'rgba(0,0,0,0.3)';
  card.style.padding = '12px';
  card.style.borderRadius = '14px';
  card.style.border = '1px solid rgba(255,255,255,0.08)';
  area.appendChild(card);

  const questionEl = document.createElement('div');
  questionEl.style.marginBottom = '10px';
  questionEl.style.fontSize = '0.9rem';
  card.appendChild(questionEl);

  const optionsWrap = document.createElement('div');
  optionsWrap.style.display = 'flex';
  optionsWrap.style.flexDirection = 'column';
  optionsWrap.style.gap = '6px';
  card.appendChild(optionsWrap);

  const status = document.createElement('div');
  status.className = 'game-info-line';
  status.style.marginTop = '10px';
  area.appendChild(status);

  function renderScenario() {
    const s = scenarios[index];
    questionEl.textContent = `Scenario ${index + 1}/${scenarios.length}: ${s.text}`;
    optionsWrap.innerHTML = '';

    s.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = opt;
      btn.style.textAlign = 'left';
      btn.onclick = () => {
        if (i === s.correctIndex) {
          status.textContent =
            'Correct. Under the chaos there is usually a softer fear (rejection, not being safe, not being enough).';
        } else {
          status.textContent =
            'That is the surface thought. Look for the softer fear under it.';
        }
        // next scenario after short delay
        setTimeout(() => {
          index++;
          if (index >= scenarios.length) {
            questionEl.textContent =
              'You just trained your brain to ask: “What is really triggering me?” instead of only reacting.';
            optionsWrap.innerHTML = '';
          } else {
            status.textContent = '';
            renderScenario();
          }
        }, 1400);
      };
      optionsWrap.appendChild(btn);
    });
  }

  renderScenario();
}

/* ---------------------------------------------
   2) Reaction Switch – choose new response
----------------------------------------------*/
function chaoticReactionSwitch() {
  modalOpen(
    'Reaction Switch',
    'Practise pausing between trigger and reaction.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Each card has a trigger. First, see your automatic reaction. Then choose a higher response.';
  area.appendChild(info);

  const scenarios = [
    {
      trigger: 'Someone replies with just “k” to your long message.',
      auto: 'Send an angry or sarcastic text back.',
      better: 'Pause, breathe, and ask “Hey, everything ok?” later.',
    },
    {
      trigger: 'Teacher scolds you in front of class.',
      auto: 'Shut down or become rude back.',
      better:
        'Note the pain, breathe, and later ask calmly what you can improve.',
    },
    {
      trigger: 'Friend cancels plan last minute.',
      auto: 'Decide “No one cares about me”.',
      better:
        'Feel the disappointment, then ask if you can reschedule another day.',
    },
  ];

  let index = 0;
  const card = document.createElement('div');
  card.style.marginTop = '14px';
  card.style.background = 'rgba(0,0,0,0.3)';
  card.style.padding = '12px';
  card.style.borderRadius = '14px';
  card.style.border = '1px solid rgba(255,255,255,0.08)';
  area.appendChild(card);

  const triggerEl = document.createElement('div');
  triggerEl.style.marginBottom = '8px';
  triggerEl.style.fontWeight = '600';
  triggerEl.style.fontSize = '0.9rem';
  card.appendChild(triggerEl);

  const autoBtn = document.createElement('button');
  autoBtn.className = 'btn';
  autoBtn.textContent = 'Show auto reaction';
  autoBtn.style.marginBottom = '6px';
  card.appendChild(autoBtn);

  const betterBtn = document.createElement('button');
  betterBtn.className = 'btn';
  betterBtn.textContent = 'Show upgraded response';
  card.appendChild(betterBtn);

  const textArea = document.createElement('div');
  textArea.className = 'game-info-line';
  textArea.style.marginTop = '8px';
  area.appendChild(textArea);

  function renderCard() {
    const s = scenarios[index];
    triggerEl.textContent = `Trigger ${index + 1}/${
      scenarios.length
    }: ${s.trigger}`;
    textArea.textContent = '';
  }

  autoBtn.onclick = () => {
    const s = scenarios[index];
    textArea.textContent = 'Auto reaction: ' + s.auto;
  };

  betterBtn.onclick = () => {
    const s = scenarios[index];
    textArea.textContent =
      'Upgraded response: ' +
      s.better +
      '  → This is what moves you out of Chaotic Mode.';
    setTimeout(() => {
      index++;
      if (index >= scenarios.length) {
        triggerEl.textContent =
          'You practised pausing between trigger and reaction. This is the core Chaotic Mode muscle.';
        autoBtn.style.display = 'none';
        betterBtn.style.display = 'none';
      } else {
        renderCard();
      }
    }, 1600);
  };

  renderCard();
}

/* ---------------------------------------------
   3) Body Scan Alert – feel the chaos in body
----------------------------------------------*/
function chaoticBodyScanGame() {
  modalOpen(
    'Body Scan Alert',
    'Notice where chaos lives in your body before it explodes.'
  );

  const area = document.getElementById('game-area');

  const text = document.createElement('div');
  text.className = 'game-info-line';
  text.textContent =
    'Tap where you feel tension right now. Then read how that part talks to you.';
  area.appendChild(text);

  const bodyMap = document.createElement('div');
  bodyMap.style.display = 'flex';
  bodyMap.style.flexWrap = 'wrap';
  bodyMap.style.gap = '8px';
  bodyMap.style.marginTop = '12px';
  area.appendChild(bodyMap);

  const parts = [
    {
      name: 'Head',
      msg: 'Racing thoughts, overthinking, headache. Chaos is in mental loops.',
    },
    {
      name: 'Eyes',
      msg: 'Tired of screens / drama. Need a break from input.',
    },
    {
      name: 'Chest',
      msg: 'Tight, heavy, heart pounding. Fear of rejection / conflict.',
    },
    {
      name: 'Stomach',
      msg: 'Butterflies, nausea, emptiness. Anxiety or dread about the future.',
    },
    {
      name: 'Shoulders',
      msg: 'Always tight. Carrying responsibility or guilt.',
    },
    {
      name: 'Hands',
      msg: 'Restless, tapping. Urge to do something quickly, impulsively.',
    },
  ];

  const detail = document.createElement('div');
  detail.className = 'game-info-line';
  detail.style.marginTop = '10px';
  area.appendChild(detail);

  parts.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = p.name;
    b.onclick = () => {
      detail.textContent =
        p.msg +
        '  → Next step: take 3 slow breaths and let this area soften 5–10%.';
    };
    bodyMap.appendChild(b);
  });
}

/* ---------------------------------------------
   4) Chaotic Breath Warrior – reuse breathing game
----------------------------------------------*/
function chaoticBreathWarrior() {
  modalOpen(
    'Breath Warrior',
    'Match your tap with the breath cycle. Calms the inner storm.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Tap the button near the end of each phase: INHALE 4s → HOLD 2s → EXHALE 6s.';
  area.appendChild(info);

  const phaseLabel = document.createElement('div');
  phaseLabel.style.fontSize = '1.2rem';
  phaseLabel.style.marginTop = '12px';
  phaseLabel.style.textAlign = 'center';
  phaseLabel.textContent = 'Get ready...';
  area.appendChild(phaseLabel);

  const bar = document.createElement('div');
  bar.className = 'bar-container';
  bar.style.marginTop = '14px';
  const fill = document.createElement('div');
  fill.className = 'bar-fill';
  bar.appendChild(fill);
  area.appendChild(bar);

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.style.marginTop = '14px';
  btn.textContent = 'Tap with Phase';
  area.appendChild(btn);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'game-info-line';
  scoreLine.style.marginTop = '8px';
  scoreLine.textContent = 'Score: 0';
  area.appendChild(scoreLine);

  const phases = [
    { name: 'INHALE', duration: 4000 },
    { name: 'HOLD', duration: 2000 },
    { name: 'EXHALE', duration: 6000 },
  ];

  let phaseIndex = 0;
  let phaseStart = Date.now();
  let clickable = true;
  let score = 0;

  function setPhase(i) {
    phaseIndex = i % phases.length;
    const p = phases[phaseIndex];
    phaseLabel.textContent = p.name;
    phaseLabel.style.color = '#fff';
    phaseStart = Date.now();
    clickable = true;
  }

  setPhase(0);

  btn.onclick = () => {
    if (!clickable) return;
    const p = phases[phaseIndex];
    const elapsed = Date.now() - phaseStart;
    const diff = Math.abs(elapsed - p.duration);

    if (diff < 600) {
      score += 2;
      phaseLabel.style.color = '#2ecc71';
    } else if (diff < 1500) {
      score += 1;
      phaseLabel.style.color = '#f1c40f';
    } else {
      phaseLabel.style.color = '#e74c3c';
    }

    scoreLine.textContent = 'Score: ' + score;
    clickable = false;
  };

  const interval = setInterval(() => {
    const p = phases[phaseIndex];
    const elapsed = Date.now() - phaseStart;
    const ratio = Math.min(1, elapsed / p.duration);
    fill.style.width = ratio * 100 + '%';

    if (elapsed >= p.duration) {
      setPhase(phaseIndex + 1);
    }
  }, 60);

  modalOnClose(() => clearInterval(interval));
}
