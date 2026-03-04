// games/addiction/addiction.js

// Attach click handlers once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.play-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      startAddictionGame(btn.dataset.game);
    });
  });
});

/**
 * Master dispatcher for Addiction Loop games
 */
function startAddictionGame(id) {
  const map = {
    addTrigger: addictionTriggerGame,
    addSwap: addictionSwapGame,
    addSurf: addictionSurfGame,
    addMap: addictionLoopMapGame,
    addStreak: addictionStreakGame,
  };
  if (map[id]) map[id]();
}

/* ------------------------------------------------
   1) Trigger Scanner – recognise loop triggers
--------------------------------------------------*/
function addictionTriggerGame() {
  modalOpen(
    'Trigger Scanner',
    'Mark which situations are real loop triggers vs neutral.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'For each card, choose: TRIGGER (likely to start your loop) or NEUTRAL (not related).';
  area.appendChild(info);

  const scenarios = [
    { text: 'Lying in bed at 11:30pm with phone in hand', trigger: true },
    { text: 'Studying with a friend in library at 3pm', trigger: false },
    { text: 'After a fight with family, alone in your room', trigger: true },
    { text: 'Waiting in line at grocery store for 2 minutes', trigger: maybeBool() },
    { text: 'Right after exam results, mind spinning', trigger: true },
    { text: 'Walking outside without phone for 5 minutes', trigger: false },
  ];

  // Optional: random for one scenario to show “depends on your life”
  function maybeBool() {
    return Math.random() < 0.5;
  }

  let index = 0;
  let score = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showNext() {
    if (index >= scenarios.length) {
      cardBox.innerHTML = '';
      result.innerHTML = `
        You scanned <strong>${scenarios.length}</strong> situations and identified <strong>${score}</strong> correctly.<br/>
        The more you notice your real triggers, the earlier you can switch the loop.
      `;
      return;
    }

    const sc = scenarios[index];
    cardBox.innerHTML = '';

    const card = document.createElement('div');
    card.style.background = 'rgba(0,0,0,0.35)';
    card.style.borderRadius = '14px';
    card.style.padding = '10px 12px';
    card.style.border = '1px solid rgba(255,255,255,0.08)';
    card.innerHTML = `
      <div style="font-size:0.85rem;opacity:0.8;margin-bottom:4px;">Situation</div>
      <div style="font-size:0.95rem;">${sc.text}</div>
    `;
    cardBox.appendChild(card);

    const btnRow = document.createElement('div');
    btnRow.style.marginTop = '10px';
    btnRow.style.display = 'flex';
    btnRow.style.gap = '8px';
    btnRow.style.justifyContent = 'center';
    cardBox.appendChild(btnRow);

    const triggerBtn = document.createElement('button');
    triggerBtn.className = 'btn';
    triggerBtn.textContent = 'TRIGGER';

    const neutralBtn = document.createElement('button');
    neutralBtn.className = 'btn';
    neutralBtn.textContent = 'NEUTRAL';

    btnRow.appendChild(triggerBtn);
    btnRow.appendChild(neutralBtn);

    function choose(isTrigger) {
      triggerBtn.disabled = true;
      neutralBtn.disabled = true;

      const correct = sc.trigger;
      if (isTrigger === correct) {
        score++;
        result.textContent =
          'Nice. You matched the loop pattern correctly. Save this in your real life radar.';
      } else {
        result.textContent =
          'This might not be your main loop situation. The important thing is to notice YOUR repeated pattern.';
      }

      setTimeout(() => {
        index++;
        result.textContent = '';
        showNext();
      }, 1300);
    }

    triggerBtn.onclick = () => choose(true);
    neutralBtn.onclick = () => choose(false);
  }

  showNext();
}

/* ------------------------------------------------
   2) Habit Swap Lab – choose better routine
--------------------------------------------------*/
function addictionSwapGame() {
  modalOpen(
    'Habit Swap Lab',
    'Swap one unhealthy routine with a slightly better one.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'For each loop, pick the swap that keeps the feeling but reduces long-term damage.';
  area.appendChild(info);

  const loops = [
    {
      cue: 'Bored at night, nothing urgent to do',
      oldRoutine: 'Scroll short videos for 2 hours',
      feeling: 'Entertainment / escape',
      options: [
        'Watch 2 hours more videos on a different app',
        'Read or listen to a story / podcast for 20 minutes then sleep',
        'Force yourself to study 4 hours even if exhausted',
      ],
      correct: 1,
    },
    {
      cue: 'Stressed after study / work block',
      oldRoutine: 'Order junk food + eat till heavy',
      feeling: 'Comfort / reward',
      options: [
        'Eat nothing at all and punish yourself',
        'Call a friend and rant for 2 hours',
        'Make a small snack + 10 minute walk + chill music',
      ],
      correct: 2,
    },
    {
      cue: 'Feeling lonely in evening',
      oldRoutine: 'Spam message or stalk people online',
      feeling: 'Connection',
      options: [
        'Text one trusted friend honestly about how you feel',
        'Randomly message 20 strangers',
        'Post angry status about how fake everyone is',
      ],
      correct: 0,
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

  function showLoop() {
    if (index >= loops.length) {
      cardBox.innerHTML = '';
      result.innerHTML = `
        You practised swapping routines in <strong>${loops.length}</strong> loops
        and chose the recommended option <strong>${score}</strong> times.<br/>
        Remember: keep the feeling, change the method.
      `;
      return;
    }

    const lp = loops[index];
    cardBox.innerHTML = '';

    const top = document.createElement('div');
    top.style.background = 'rgba(0,0,0,0.35)';
    top.style.borderRadius = '14px';
    top.style.padding = '10px 12px';
    top.style.border = '1px solid rgba(255,255,255,0.08)';
    top.innerHTML = `
      <div style="font-size:0.85rem;opacity:0.8;">Cue: ${lp.cue}</div>
      <div style="font-size:0.85rem;opacity:0.8;margin-top:2px;">Old routine: ${lp.oldRoutine}</div>
      <div style="font-size:0.85rem;opacity:0.8;margin-top:2px;">Desired feeling: ${lp.feeling}</div>
    `;
    cardBox.appendChild(top);

    const label = document.createElement('div');
    label.style.marginTop = '10px';
    label.style.fontSize = '0.9rem';
    label.textContent = 'Choose the best swap:';
    cardBox.appendChild(label);

    const wrap = document.createElement('div');
    wrap.style.display = 'grid';
    wrap.style.gap = '6px';
    wrap.style.marginTop = '6px';
    cardBox.appendChild(wrap);

    lp.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.textAlign = 'left';
      b.style.whiteSpace = 'normal';
      b.style.fontSize = '0.85rem';
      b.textContent = opt;

      b.onclick = () => {
        wrap.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

        if (i === lp.correct) {
          score++;
          b.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent = 'Good swap. You get similar feeling with less damage.';
        } else {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'This may feel good now but grows the loop. Look for balance, not self-punishment or over-escape.';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showLoop();
        }, 1500);
      };

      wrap.appendChild(b);
    });
  }

  showLoop();
}

/* ------------------------------------------------
   3) Urge Surf Timer – ride 3 waves
--------------------------------------------------*/
function addictionSurfGame() {
  modalOpen(
    'Urge Surf Timer',
    'Click “Ride wave” through 3 waves without pressing “Give in now”.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'When urge hits, it rises, peaks, then falls. Practise staying with it instead of acting instantly.';
  area.appendChild(info);

  const waveLabel = document.createElement('div');
  waveLabel.style.fontSize = '1.1rem';
  waveLabel.style.marginTop = '8px';
  waveLabel.style.textAlign = 'center';
  waveLabel.textContent = 'Wave 1 / 3 – starting';
  area.appendChild(waveLabel);

  // bar-container & bar-fill from shared CSS
  const bar = document.createElement('div');
  bar.className = 'bar-container';
  bar.style.marginTop = '10px';
  const fill = document.createElement('div');
  fill.className = 'bar-fill';
  bar.appendChild(fill);
  area.appendChild(bar);

  const btnRow = document.createElement('div');
  btnRow.style.marginTop = '14px';
  btnRow.style.display = 'flex';
  btnRow.style.gap = '10px';
  btnRow.style.justifyContent = 'center';
  area.appendChild(btnRow);

  const rideBtn = document.createElement('button');
  rideBtn.className = 'btn';
  rideBtn.textContent = 'Ride wave';

  const giveInBtn = document.createElement('button');
  giveInBtn.className = 'btn';
  giveInBtn.textContent = 'Give in now';

  btnRow.appendChild(rideBtn);
  btnRow.appendChild(giveInBtn);

  const status = document.createElement('div');
  status.className = 'game-info-line';
  status.style.marginTop = '8px';
  area.appendChild(status);

  let wave = 1;
  let progress = 0;
  let finished = false;

  const interval = setInterval(() => {
    if (finished) return;
    progress += 2;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';

    if (progress === 100) {
      wave++;
      if (wave > 3) {
        finished = true;
        status.innerHTML =
          'You surfed 3 waves without giving in. Real message: “Urges rise and fall – I don’t need to obey immediately.”';
        rideBtn.disabled = true;
        giveInBtn.disabled = true;
        clearInterval(interval);
      } else {
        progress = 0;
        fill.style.width = '0%';
        waveLabel.textContent = `Wave ${wave} / 3 – starting`;
      }
    }
  }, 200);

  modalOnClose(() => clearInterval(interval));

  rideBtn.onclick = () => {
    if (finished) return;
    status.textContent =
      'Good. Each click = staying present with the wave instead of escaping.';
  };

  giveInBtn.onclick = () => {
    if (finished) return;
    finished = true;
    clearInterval(interval);
    status.innerHTML =
      'You pressed the quick hit. That is okay here – notice how fast the wave could have passed if you had surfed a bit longer.';
    rideBtn.disabled = true;
    giveInBtn.disabled = true;
  };
}

/* ------------------------------------------------
   4) Loop Mapper – Cue → Routine → Reward builder
--------------------------------------------------*/
function addictionLoopMapGame() {
  modalOpen(
    'Loop Mapper',
    'Build one of your own loops step-by-step.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Pick one example loop and fill in Cue → Routine → Reward. This map makes the loop visible.';
  area.appendChild(info);

  const form = document.createElement('div');
  form.style.marginTop = '12px';
  form.style.display = 'grid';
  form.style.gap = '10px';
  area.appendChild(form);

  function createField(label, placeholder) {
    const wrap = document.createElement('div');
    const l = document.createElement('div');
    l.style.fontSize = '0.85rem';
    l.style.marginBottom = '2px';
    l.textContent = label;
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.style.width = '100%';
    input.style.padding = '6px 8px';
    input.style.borderRadius = '8px';
    input.style.border = '1px solid rgba(255,255,255,0.15)';
    input.style.background = 'rgba(0,0,0,0.35)';
    input.style.color = '#fff';
    wrap.appendChild(l);
    wrap.appendChild(input);
    form.appendChild(wrap);
    return input;
  }

  const cueInput = createField(
    'Cue (What starts it?)',
    'Example: feeling bored after dinner, seeing phone on table...'
  );
  const routineInput = createField(
    'Routine (What do you do?)',
    'Example: open social media, binge videos, order food...'
  );
  const rewardInput = createField(
    'Reward (What do you get?)',
    'Example: feel entertained, numb, comfort, distraction...'
  );

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Build My Loop';
  btn.style.marginTop = '4px';
  btn.style.justifySelf = 'center';
  form.appendChild(btn);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  btn.onclick = () => {
    const cue = cueInput.value.trim();
    const routine = routineInput.value.trim();
    const reward = rewardInput.value.trim();

    if (!cue || !routine || !reward) {
      result.textContent = 'Fill a simple sentence for Cue, Routine and Reward.';
      return;
    }

    result.innerHTML = `
      Your loop:<br/>
      <strong>Cue:</strong> ${cue}<br/>
      <strong>Routine:</strong> ${routine}<br/>
      <strong>Reward:</strong> ${reward}<br/><br/>
      Now the experiment is: keep the same Cue & Reward, but slowly test new Routines.
    `;
    btn.disabled = true;
  };
}

/* ------------------------------------------------
   5) Streak Guardian – protect 7-day streak
--------------------------------------------------*/
function addictionStreakGame() {
  modalOpen(
    'Streak Guardian',
    'Protect a 7-day streak with tiny wins instead of perfection.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Each “day” you choose: quick hit or tiny win. Breaks reset streak to 0, but you can always start again.';
  area.appendChild(info);

  const dayLabel = document.createElement('div');
  dayLabel.style.fontSize = '1.05rem';
  dayLabel.style.marginTop = '8px';
  dayLabel.style.textAlign = 'center';
  dayLabel.textContent = 'Day 1 / 7';
  area.appendChild(dayLabel);

  const streakLine = document.createElement('div');
  streakLine.className = 'game-info-line';
  streakLine.style.marginTop = '6px';
  streakLine.textContent = 'Current streak: 0 days';
  area.appendChild(streakLine);

  const btnRow = document.createElement('div');
  btnRow.style.marginTop = '14px';
  btnRow.style.display = 'flex';
  btnRow.style.gap = '10px';
  btnRow.style.justifyContent = 'center';
  area.appendChild(btnRow);

  const quickBtn = document.createElement('button');
  quickBtn.className = 'btn';
  quickBtn.textContent = 'Quick hit (easy now)';

  const winBtn = document.createElement('button');
  winBtn.className = 'btn';
  winBtn.textContent = 'Tiny win (1% better)';

  btnRow.appendChild(quickBtn);
  btnRow.appendChild(winBtn);

  const log = document.createElement('div');
  log.className = 'game-info-line';
  log.style.marginTop = '8px';
  area.appendChild(log);

  let day = 1;
  let streak = 0;
  let finished = false;

  function updateUI() {
    dayLabel.textContent = `Day ${day} / 7`;
    streakLine.textContent = `Current streak: ${streak} days`;
  }

  function endGame() {
    finished = true;
    quickBtn.disabled = true;
    winBtn.disabled = true;
    log.innerHTML += `<br/>Game over. Message: Streaks are built from many tiny wins –
      one bad day is not death, starting again is the real power.`;
  }

  quickBtn.onclick = () => {
    if (finished) return;
    log.textContent =
      'You chose quick hit. Feels good now, but streak resets to 0. In real life, this happens – restart is allowed.';
    streak = 0;
    day++;
    if (day > 7) {
      updateUI();
      endGame();
    } else {
      updateUI();
    }
  };

  winBtn.onclick = () => {
    if (finished) return;
    log.textContent =
      'Tiny win locked. It may be small, but your streak grows.';
    streak++;
    day++;
    if (day > 7) {
      updateUI();
      endGame();
    } else {
      updateUI();
    }
  };

  updateUI();
}
