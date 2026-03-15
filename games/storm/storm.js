// games/storm/storm.js

// Attach click handlers once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.play-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      startStormGame(btn.dataset.game);
    });
  });
});

/**
 * Master dispatcher for Storm Mode games
 */
function startStormGame(id) {
  const map = {
    stormThermo: stormThermoGame,
    stormBreath: stormBreathGame,
    stormReframe: stormReframeGame,
    stormJealousy: stormJealousyGame,
  };
  if (map[id]) map[id]();
}

/* ------------------------------------------------
   1) Storm Thermometer – body awareness
--------------------------------------------------*/
function stormThermoGame() {
  modalOpen(
    'Storm Thermometer',
    'Rate your storm level and match it with body sensations.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Think of a recent anger/jealousy moment. Rate how intense it felt, then pick body signals that match.';
  area.appendChild(info);

  // Storm level selector
  const levelBox = document.createElement('div');
  levelBox.style.marginTop = '12px';
  levelBox.style.textAlign = 'center';
  levelBox.innerHTML = `
    <div style="margin-bottom:6px;font-size:0.9rem;">Storm Level (1 = calm irritation, 10 = full rage)</div>
  `;
  area.appendChild(levelBox);

  const levelsRow = document.createElement('div');
  levelsRow.style.display = 'flex';
  levelsRow.style.flexWrap = 'wrap';
  levelsRow.style.justifyContent = 'center';
  levelsRow.style.gap = '6px';
  levelBox.appendChild(levelsRow);

  let selectedLevel = null;

  for (let i = 1; i <= 10; i++) {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = i;
    b.style.minWidth = '34px';
    b.addEventListener('click', () => {
      selectedLevel = i;
      levelsRow.querySelectorAll('button').forEach((btn) => {
        btn.style.backgroundColor = '';
      });
      b.style.backgroundColor = 'rgba(77,171,255,0.5)';
      summary.textContent = `Storm Level chosen: ${selectedLevel}`;
      summary.dataset.level = selectedLevel;
    });
    levelsRow.appendChild(b);
  }

  const summary = document.createElement('div');
  summary.className = 'game-info-line';
  summary.style.marginTop = '8px';
  summary.textContent = 'Storm Level chosen: -';
  area.appendChild(summary);

  // Body sensations checklist
  const bodyBox = document.createElement('div');
  bodyBox.style.marginTop = '14px';
  bodyBox.innerHTML =
    '<div style="font-size:0.9rem;margin-bottom:4px;">Which body signals did you notice?</div>';
  area.appendChild(bodyBox);

  const sensations = [
    'Hot face / ears',
    'Tight jaw / teeth pressing',
    'Fast heartbeat',
    'Sweaty hands',
    'Knot in stomach',
    'Tense shoulders',
    'Shallow breath',
    'Shaking / restless legs',
  ];

  const sensWrap = document.createElement('div');
  sensWrap.style.display = 'flex';
  sensWrap.style.flexWrap = 'wrap';
  sensWrap.style.gap = '6px';
  bodyBox.appendChild(sensWrap);

  const selected = new Set();

  sensations.forEach((s) => {
    const pill = document.createElement('button');
    pill.className = 'pill';
    pill.textContent = s;
    pill.style.cursor = 'pointer';
    pill.style.fontSize = '0.8rem';

    pill.addEventListener('click', () => {
      if (selected.has(s)) {
        selected.delete(s);
        pill.style.backgroundColor = '';
      } else {
        selected.add(s);
        pill.style.backgroundColor = 'rgba(46,204,113,0.4)';
      }
    });

    sensWrap.appendChild(pill);
  });

  // Finish button
  const doneBtn = document.createElement('button');
  doneBtn.className = 'btn';
  doneBtn.textContent = 'Lock In Awareness';
  doneBtn.style.display = 'block';
  doneBtn.style.margin = '14px auto 0';
  area.appendChild(doneBtn);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  doneBtn.addEventListener('click', () => {
    if (!selectedLevel) {
      result.textContent = 'First choose a storm level (1–10).';
      return;
    }
    if (selected.size === 0) {
      result.textContent = 'Pick at least one body signal you noticed.';
      return;
    }

    const list = Array.from(selected).join(', ');
    result.innerHTML = `
      You rated this storm as <strong>${selectedLevel}/10</strong> with body signals: 
      <em>${list}</em>.<br/>
      Every time you notice these signals earlier, you catch the storm before it explodes.
    `;
    doneBtn.disabled = true;
  });
}

/* ------------------------------------------------
   2) Breath Warrior – Storm cooling breath
--------------------------------------------------*/
function stormBreathGame() {
  modalOpen(
    'Breath Warrior – Storm',
    'Follow INHALE → HOLD → EXHALE. Tap in rhythm to cool the body.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Phase: INHALE 4s → HOLD 2s → EXHALE 6s. Tap the button once each phase when it feels correct.';
  area.appendChild(info);

  const phaseLabel = document.createElement('div');
  phaseLabel.style.fontSize = '1.3rem';
  phaseLabel.style.marginTop = '10px';
  phaseLabel.style.textAlign = 'center';
  phaseLabel.textContent = 'Get ready…';
  area.appendChild(phaseLabel);

  // Progress bar (you already have .bar-container & .bar-fill styles)
  const bar = document.createElement('div');
  bar.className = 'bar-container';
  bar.style.marginTop = '14px';
  const fill = document.createElement('div');
  fill.className = 'bar-fill';
  bar.appendChild(fill);
  area.appendChild(bar);

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.style.display = 'block';
  btn.style.margin = '16px auto 0';
  btn.textContent = 'Tap with Breath';
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
  let rounds = 0;
  let finished = false;

  function setPhase(i) {
    phaseIndex = i % phases.length;
    const p = phases[phaseIndex];
    phaseLabel.textContent = p.name;
    phaseLabel.style.color = '#ffffff';
    phaseStart = Date.now();
    clickable = true;
  }

  setPhase(0);

  btn.onclick = () => {
    if (!clickable || finished) return;

    const p = phases[phaseIndex];
    const elapsed = Date.now() - phaseStart;
    const diff = Math.abs(elapsed - p.duration);

    // Give scores based on timing accuracy
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

    // Count full cycles (INHALE+HOLD+EXHALE = 3 taps)
    if (phaseIndex === 2) {
      rounds++;
      if (rounds >= 5) {
        finished = true;
        btn.disabled = true;
        scoreLine.innerHTML =
          'You completed several cooling cycles. Your nervous system is learning to shift from storm to steady.';
      }
    }
  };

  const interval = setInterval(() => {
    if (finished) return;

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

/* ------------------------------------------------
   3) Anger Reframe Arena – thought → I-message
--------------------------------------------------*/
function stormReframeGame() {
  modalOpen(
    'Anger Reframe Arena',
    'Turn rage thoughts into clear “I feel / I need” statements.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Choose a “rage thought” card, then pick the best “I-message” reframe. This trains clean expression instead of attack.';
  area.appendChild(info);

  const scenarios = [
    {
      raw: '“You are so selfish. You never think about me.”',
      best: 'When you cancel our plan last minute, I feel ignored and hurt. I need more notice or a clear plan.',
      other: [
        'You should feel guilty for what you did.',
        'Fine, I will never talk to you again.',
      ],
    },
    {
      raw: '“I hate everyone here, they are all idiots.”',
      best: 'When people talk over me in meetings, I feel disrespected. I need a chance to share my ideas.',
      other: [
        'I will just stop going and ghost everyone.',
        'They are all useless; I should insult them back.',
      ],
    },
    {
      raw: '“You ruined my life. Everything is your fault.”',
      best: 'When our plans changed suddenly, I felt scared and angry. I need clarity about what happens next.',
      other: [
        'You deserve bad things to happen to you.',
        'I will make you pay for this.',
      ],
    },
  ];

  let index = 0;
  let score = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showScenario() {
    if (index >= scenarios.length) {
      cardBox.innerHTML = '';
      result.innerHTML = `
        You practised reframing <strong>${scenarios.length}</strong> anger thoughts.${score === scenarios.length
          ? ' All correct – your Storm communication is sharp and clean.'
          : ` You chose the best reframe ${score} out of ${scenarios.length} times.`
        }
        <br/>Keep using “When you…, I feel…, I need…” in real conversations.
      `;
      return;
    }

    const sc = scenarios[index];
    cardBox.innerHTML = '';

    const rawCard = document.createElement('div');
    rawCard.style.background = 'rgba(0,0,0,0.35)';
    rawCard.style.borderRadius = '14px';
    rawCard.style.padding = '10px 12px';
    rawCard.style.border = '1px solid rgba(255,255,255,0.08)';
    rawCard.innerHTML = `
      <div style="font-size:0.85rem;opacity:0.8;margin-bottom:4px;">Rage Thought</div>
      <div style="font-size:0.95rem;">${sc.raw}</div>
    `;
    cardBox.appendChild(rawCard);

    const label = document.createElement('div');
    label.style.marginTop = '10px';
    label.style.fontSize = '0.9rem';
    label.textContent = 'Pick the best “I-message” response:';
    cardBox.appendChild(label);

    const optionsWrap = document.createElement('div');
    optionsWrap.style.display = 'grid';
    optionsWrap.style.gap = '8px';
    optionsWrap.style.marginTop = '6px';
    cardBox.appendChild(optionsWrap);

    // Shuffle options
    const options = [sc.best, ...sc.other].sort(() => Math.random() - 0.5);

    options.forEach((text) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.style.textAlign = 'left';
      btn.style.fontSize = '0.85rem';
      btn.style.whiteSpace = 'normal';
      btn.textContent = text;

      btn.onclick = () => {
        optionsWrap.querySelectorAll('button').forEach((b) => (b.disabled = true));
        if (text === sc.best) {
          score++;
          btn.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent =
            'Correct. This message names the event, feeling, and need without attack.';
        } else {
          btn.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'This might feel satisfying in the moment, but it creates more damage. Check the green option next time.';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showScenario();
        }, 1400);
      };

      optionsWrap.appendChild(btn);
    });
  }

  showScenario();
}

/* ------------------------------------------------
   4) Jealousy Alchemy – jealousy → action
--------------------------------------------------*/
function stormJealousyGame() {
  modalOpen(
    'Jealousy Alchemy',
    'Turn jealousy into honest desire + small action, instead of self-hate or attack.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Read each jealousy scenario. First, pick what you are truly wanting. Then choose one 10-minute action.';
  area.appendChild(info);

  const scenarios = [
    {
      title: 'Friend gets a better grade',
      wantOptions: [
        'I want them to fail.',
        'I want my work to feel meaningful and recognised.',
        'I want everyone to think I am perfect.',
      ],
      correctWant: 1,
      actions: [
        'Complain about them to others.',
        'Ask them how they studied and try one method for 20 minutes.',
        'Quit studying because there is no point.',
      ],
      correctAction: 1,
    },
    {
      title: 'Someone you follow buys a new car / phone',
      wantOptions: [
        'I want to destroy their new thing.',
        'I want more financial freedom and comfort.',
        'I want everyone to be jealous of me.',
      ],
      correctWant: 1,
      actions: [
        'Spend money on random stuff to feel better.',
        'List 3 money skills I can learn and watch 1 short video about one of them.',
        'Post angry comments under their photos.',
      ],
      correctAction: 1,
    },
    {
      title: 'Colleague gets promoted before you',
      wantOptions: [
        'I want to make them look bad.',
        'I want my skills and effort to be valued.',
        'I want people to be scared of me.',
      ],
      correctWant: 1,
      actions: [
        'Quietly improve one skill for 15 minutes today.',
        'Spread rumours that they cheated.',
        'Quit without any plan or reflection.',
      ],
      correctAction: 0,
    },
  ];

  let index = 0;
  let score = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showScenario() {
    if (index >= scenarios.length) {
      cardBox.innerHTML = '';
      result.innerHTML = `
        You practised turning jealousy into desire + action in <strong>${scenarios.length}</strong> situations.<br/>
        Brain message updated: “Jealousy shows me what I value – and I can move 1% toward it.”
      `;
      return;
    }

    const sc = scenarios[index];
    cardBox.innerHTML = '';

    const title = document.createElement('div');
    title.style.background = 'rgba(0,0,0,0.35)';
    title.style.borderRadius = '14px';
    title.style.padding = '10px 12px';
    title.style.border = '1px solid rgba(255,255,255,0.08)';
    title.innerHTML = `
      <div style="font-size:0.85rem;opacity:0.8;margin-bottom:4px;">Jealousy Scenario</div>
      <div style="font-size:0.95rem;">${sc.title}</div>
    `;
    cardBox.appendChild(title);

    // Step 1: What do I really want?
    const wantLabel = document.createElement('div');
    wantLabel.style.marginTop = '10px';
    wantLabel.style.fontSize = '0.9rem';
    wantLabel.textContent = 'First: What do you truly want here?';
    cardBox.appendChild(wantLabel);

    const wantWrap = document.createElement('div');
    wantWrap.style.display = 'grid';
    wantWrap.style.gap = '6px';
    wantWrap.style.marginTop = '6px';
    cardBox.appendChild(wantWrap);

    let wantLocked = false;
    let actionPhase = false;

    sc.wantOptions.forEach((text, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.textAlign = 'left';
      b.style.fontSize = '0.85rem';
      b.style.whiteSpace = 'normal';
      b.textContent = text;

      b.onclick = () => {
        if (wantLocked || actionPhase) return;

        wantLocked = true;
        wantWrap.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

        if (i === sc.correctWant) {
          score++;
          b.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent =
            'Yes. This jealousy is pointing to a real desire. Now convert it into action.';
        } else {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'That choice keeps jealousy stuck. Notice the option that talks about what you truly want in your own life.';
        }

        // After short delay, show actions
        setTimeout(() => {
          showActionPhase(sc);
        }, 1200);
      };

      wantWrap.appendChild(b);
    });

    function showActionPhase(sc2) {
      actionPhase = true;
      const actionLabel = document.createElement('div');
      actionLabel.style.marginTop = '12px';
      actionLabel.style.fontSize = '0.9rem';
      actionLabel.textContent =
        'Second: Which 10–20 minute action moves you 1% toward that desire?';
      cardBox.appendChild(actionLabel);

      const actionWrap = document.createElement('div');
      actionWrap.style.display = 'grid';
      actionWrap.style.gap = '6px';
      actionWrap.style.marginTop = '6px';
      cardBox.appendChild(actionWrap);

      sc2.actions.forEach((text, i) => {
        const b = document.createElement('button');
        b.className = 'btn';
        b.style.textAlign = 'left';
        b.style.fontSize = '0.85rem';
        b.style.whiteSpace = 'normal';
        b.textContent = text;

        b.onclick = () => {
          if (!actionPhase) return;

          actionPhase = false;
          actionWrap.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

          if (i === sc2.correctAction) {
            score++;
            b.style.backgroundColor = 'rgba(46,204,113,0.7)';
            result.textContent =
              'Correct. This is a small, realistic step that turns jealousy into motion.';
          } else {
            b.style.backgroundColor = 'rgba(231,76,60,0.7)';
            result.textContent =
              'This action feeds jealousy instead of healing it. Look for the step that builds your life, not attacks theirs.';
          }

          setTimeout(() => {
            index++;
            result.textContent = '';
            showScenario();
          }, 1500);
        };

        actionWrap.appendChild(b);
      });
    }
  }

  showScenario();
}
