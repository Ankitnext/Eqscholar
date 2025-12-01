// games/shadow/shadow.js

// Attach click handlers once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.play-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      startShadowGame(btn.dataset.game);
    });
  });
});

/**
 * Master dispatcher for Shadow Walker games
 */
function startShadowGame(id) {
  const map = {
    shadowObserve: shadowObserveGame,
    shadowGap: shadowGapGame,
    shadowClouds: shadowCloudsGame,
    shadowSwitch: shadowSwitchGame,
    shadowNarrator: shadowNarratorGame,
  };
  if (map[id]) map[id]();
}

/* ------------------------------------------------
   1) Scene Observer – awareness vs reaction
--------------------------------------------------*/
function shadowObserveGame() {
  modalOpen(
    'Scene Observer',
    'Mark what is awareness and what is shadow reaction.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'For each line, choose if it is mostly AWARENESS (“I see what is happening”) or REACTION (“I am inside it”).';
  area.appendChild(info);

  const scenes = [
    {
      text: "“I know I'm scrolling again instead of working, but I’ll just finish this video.”",
      correct: 'mixed',
    },
    {
      text: "“I’m feeling jealous right now, and I don’t want to admit it.”",
      correct: 'awareness',
    },
    {
      text: "“They are the worst, I hope something bad happens to them.”",
      correct: 'reaction',
    },
    {
      text: "“Part of me wants to shout, another part knows that will make it worse.”",
      correct: 'awareness',
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

  function showScene() {
    if (index >= scenes.length) {
      cardBox.innerHTML = '';
      result.innerHTML = `
        You tagged <strong>${score}</strong> out of <strong>${scenes.length}</strong> lines in a Shadow Walker way.<br/>
        In real life, practise saying: “This part is awareness, this part is reaction.”
      `;
      return;
    }

    const sc = scenes[index];
    cardBox.innerHTML = '';

    const textBox = document.createElement('div');
    textBox.style.background = 'rgba(0,0,0,0.35)';
    textBox.style.borderRadius = '14px';
    textBox.style.padding = '10px 12px';
    textBox.style.border = '1px solid rgba(255,255,255,0.08)';
    textBox.style.fontSize = '0.95rem';
    textBox.textContent = sc.text;
    cardBox.appendChild(textBox);

    const label = document.createElement('div');
    label.style.marginTop = '10px';
    label.style.fontSize = '0.9rem';
    label.textContent = 'How would you mark this line?';
    cardBox.appendChild(label);

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '8px';
    row.style.marginTop = '6px';
    row.style.justifyContent = 'center';
    cardBox.appendChild(row);

    const options = [
      { id: 'awareness', label: 'Mostly AWARENESS' },
      { id: 'reaction', label: 'Mostly REACTION' },
      { id: 'mixed', label: 'Both mixed' },
    ];

    options.forEach((opt) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.fontSize = '0.8rem';
      b.textContent = opt.label;
      b.onclick = () => {
        row.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

        if (opt.id === sc.correct) {
          score++;
          b.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent =
            'Good spotting. This is the type of labeling that weakens the shadow.';
        } else {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'Different people may feel it differently, but here we are training to see the subtle difference.';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showScene();
        }, 1400);
      };
      row.appendChild(b);
    });
  }

  showScene();
}

/* ------------------------------------------------
   2) Gap Meter – spot the pause
--------------------------------------------------*/
function shadowGapGame() {
  modalOpen(
    'Gap Meter',
    'Spot where the gap appears between feeling and action.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Each sequence has a FEELING, a THOUGHT, and an ACTION. Click where the GAP is strongest.';
  area.appendChild(info);

  const sequences = [
    {
      feeling: 'Anger after getting blamed for something',
      thought: '“If I shout, they’ll finally understand me.”',
      action: 'You type a long angry message and hit send immediately.',
      correct: 'betweenFeelingThought',
    },
    {
      feeling: 'Jealousy seeing a friend’s success post',
      thought: '“I should be there by now too…”',
      action: 'You ignore them for a week and avoid messages.',
      correct: 'betweenThoughtAction',
    },
    {
      feeling: 'Anxious before exam result',
      thought: '“What if I fail and everyone laughs?”',
      action: 'You keep checking your phone every 2 minutes.',
      correct: 'betweenThoughtAction',
    },
  ];

  let index = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showSeq() {
    if (index >= sequences.length) {
      cardBox.innerHTML = '';
      result.innerHTML =
        'You practised spotting the “gap”. In real life, even a 1-second pause in that place changes the whole outcome.';
      return;
    }

    const s = sequences[index];
    cardBox.innerHTML = '';

    const list = document.createElement('div');
    list.style.display = 'grid';
    list.style.gap = '6px';
    cardBox.appendChild(list);

    function line(label, text) {
      const row = document.createElement('div');
      row.style.fontSize = '0.9rem';
      row.innerHTML = `<strong>${label}:</strong> ${text}`;
      return row;
    }

    list.appendChild(line('Feeling', s.feeling));
    list.appendChild(line('Thought', s.thought));
    list.appendChild(line('Action', s.action));

    const label = document.createElement('div');
    label.style.marginTop = '10px';
    label.style.fontSize = '0.9rem';
    label.textContent = 'Where is the most powerful place for a pause?';
    cardBox.appendChild(label);

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '8px';
    row.style.flexWrap = 'wrap';
    row.style.marginTop = '6px';
    row.style.justifyContent = 'center';
    cardBox.appendChild(row);

    const opts = [
      { id: 'betweenFeelingThought', text: 'Between FEELING and THOUGHT' },
      { id: 'betweenThoughtAction', text: 'Between THOUGHT and ACTION' },
      { id: 'noGap', text: 'There is no gap anywhere' },
    ];

    opts.forEach((opt) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.fontSize = '0.8rem';
      b.textContent = opt.text;
      b.onclick = () => {
        row.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

        if (opt.id === s.correct) {
          b.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent =
            'Yes. Training your pause at that point gives maximum power over the shadow.';
        } else if (opt.id === 'noGap') {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'Shadow loves when you believe “there is no gap”. We always look for even a tiny pause.';
        } else {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'That gap also matters, but we are training the stronger one in this scene.';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showSeq();
        }, 1600);
      };
      row.appendChild(b);
    });
  }

  showSeq();
}

/* ------------------------------------------------
   3) Thought Clouds 2.0 – label inner content
--------------------------------------------------*/
function shadowCloudsGame() {
  modalOpen(
    'Thought Clouds 2.0',
    'Tag each bubble as Thought, Feeling, Urge or Story.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'When you label something as Thought / Feeling / Urge / Story, your brain stops believing it is 100% truth.';
  area.appendChild(info);

  const bubbleArea = document.createElement('div');
  bubbleArea.style.marginTop = '14px';
  bubbleArea.style.display = 'flex';
  bubbleArea.style.flexWrap = 'wrap';
  bubbleArea.style.gap = '8px';
  area.appendChild(bubbleArea);

  const log = document.createElement('div');
  log.className = 'game-info-line';
  log.style.marginTop = '12px';
  log.textContent = 'Labeled: 0';
  area.appendChild(log);

  const texts = [
    'I always ruin everything',
    'My chest feels heavy',
    'I want to throw my phone',
    'Maybe they secretly hate me',
    'I am proud I tried again',
    'My hands are shaking',
    'What if I fail again?',
    'I should just disappear',
  ];

  let count = 0;

  texts.forEach((t) => {
    const btn = document.createElement('button');
    btn.textContent = t;
    btn.style.borderRadius = '20px';
    btn.style.border = 'none';
    btn.style.padding = '6px 10px';
    btn.style.background = 'rgba(0,0,0,0.35)';
    btn.style.color = '#fff';
    btn.style.fontSize = '0.8rem';
    btn.onclick = () => showLabelMenu(btn, t);
    bubbleArea.appendChild(btn);
  });

  function showLabelMenu(target, text) {
    // Avoid multiple menus stacking
    const existing = target.nextElementSibling;
    if (existing && existing.classList && existing.classList.contains('label-menu')) {
      existing.remove();
      return;
    }

    const menu = document.createElement('div');
    menu.className = 'label-menu';
    menu.style.marginTop = '4px';

    ['Thought', 'Feeling', 'Urge', 'Story'].forEach((type) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.fontSize = '0.7rem';
      b.style.marginRight = '4px';
      b.textContent = type;
      b.onclick = () => {
        target.textContent = text + ' (' + type + ')';
        target.style.background = 'rgba(155,89,182,0.45)';
        menu.remove();
        count++;
        log.textContent = 'Labeled: ' + count;

        if (count === texts.length) {
          const end = document.createElement('div');
          end.className = 'game-info-line';
          end.style.marginTop = '10px';
          end.textContent =
            'Nice. Shadow loses strength when you see your inner content as categories instead of absolute truth.';
          area.appendChild(end);
        }
      };
      menu.appendChild(b);
    });

    target.insertAdjacentElement('afterend', menu);
  }
}

/* ------------------------------------------------
   4) Auto-Pilot Switch – auto vs choice
--------------------------------------------------*/
function shadowSwitchGame() {
  modalOpen(
    'Auto-Pilot Switch',
    'Choose whether to stay on auto or flip to conscious response.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Each card shows a trigger. Choose AUTO-PILOT (old pattern) or CHOICE (small upgrade).';
  area.appendChild(info);

  const scenes = [
    {
      trigger: 'Friend texts late “We need to talk tomorrow.”',
      auto: 'Overthink all night and imagine worst-case stories.',
      choice: 'Note your fear, write it down, then park it till tomorrow and sleep.',
    },
    {
      trigger: 'You get called out in class / meeting.',
      auto: 'Get defensive and prove you are right, even if tone becomes sharp.',
      choice: 'Take one breath, ask for clarity, then respond with facts not attack.',
    },
    {
      trigger: 'You see your ex / old friend’s happy photos.',
      auto: 'Stalk them for an hour and compare your life.',
      choice: 'Notice the jealousy, close app after 5 minutes, do one caring thing for yourself.',
    },
  ];

  let index = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showScene() {
    if (index >= scenes.length) {
      cardBox.innerHTML = '';
      result.innerHTML =
        'You practised flipping the switch from auto to choice. In real life, even choosing the “choice” path once a day is powerful Shadow Walker work.';
      return;
    }

    const sc = scenes[index];
    cardBox.innerHTML = '';

    const trig = document.createElement('div');
    trig.style.background = 'rgba(0,0,0,0.35)';
    trig.style.borderRadius = '14px';
    trig.style.padding = '10px 12px';
    trig.style.border = '1px solid rgba(255,255,255,0.08)';
    trig.innerHTML = `<strong>Trigger:</strong> ${sc.trigger}`;
    cardBox.appendChild(trig);

    const row = document.createElement('div');
    row.style.display = 'grid';
    row.style.gap = '8px';
    row.style.marginTop = '10px';
    cardBox.appendChild(row);

    function optionBox(title, desc, type) {
      const box = document.createElement('div');
      box.style.background = 'rgba(0,0,0,0.4)';
      box.style.borderRadius = '12px';
      box.style.padding = '8px 10px';
      box.style.border = '1px solid rgba(255,255,255,0.05)';
      box.style.fontSize = '0.85rem';

      const head = document.createElement('div');
      head.style.fontWeight = '600';
      head.textContent = title;
      const body = document.createElement('div');
      body.textContent = desc;
      body.style.marginTop = '2px';

      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.style.marginTop = '6px';
      btn.style.fontSize = '0.78rem';
      btn.textContent = 'Choose this';

      btn.onclick = () => {
        row.querySelectorAll('button').forEach((b) => (b.disabled = true));
        if (type === 'choice') {
          result.textContent =
            'This is the conscious response. Not perfect, but directionally better.';
          box.style.borderColor = 'rgba(46,204,113,0.8)';
        } else {
          result.textContent =
            'This is the old pattern. Nothing to hate – just useful to notice.';
          box.style.borderColor = 'rgba(231,76,60,0.8)';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showScene();
        }, 1600);
      };

      box.appendChild(head);
      box.appendChild(body);
      box.appendChild(btn);
      row.appendChild(box);
    }

    optionBox('AUTO-PILOT', sc.auto, 'auto');
    optionBox('CHOICE', sc.choice, 'choice');
  }

  showScene();
}

/* ------------------------------------------------
   5) Shadow Narrator – rewrite inner voice
--------------------------------------------------*/
function shadowNarratorGame() {
  modalOpen(
    'Shadow Narrator',
    'Rewrite harsh self-talk into training-focused lines.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Pick the replacement line that is honest but kind. Not fake positive, not abusive.';
  area.appendChild(info);

  const lines = [
    {
      harsh: '“I am useless. I always fail.”',
      options: [
        '“No, I am actually perfect and better than everyone.”',
        '“A part of me feels useless right now because I failed. I am still learning.”',
        '“This is just how I am, nothing can ever change.”',
      ],
      correct: 1,
    },
    {
      harsh: '“Everyone is moving ahead except me.”',
      options: [
        '“I am clearly the only loser on earth.”',
        '“It looks like others are ahead. My lane is slower, but I can still take steps.”',
        '“They probably cheated, so I am secretly better.”',
      ],
      correct: 1,
    },
    {
      harsh: '“I exploded again. I am a monster.”',
      options: [
        '“I lost control today. That doesn’t make me a monster, it means I need more training and better tools.”',
        '“I should never feel anger again.”',
        '“It was their fault, I was right to explode fully.”',
      ],
      correct: 0,
    },
  ];

  let index = 0;

  const cardBox = document.createElement('div');
  cardBox.style.marginTop = '14px';
  area.appendChild(cardBox);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '10px';
  area.appendChild(result);

  function showLine() {
    if (index >= lines.length) {
      cardBox.innerHTML = '';
      result.innerHTML =
        'You upgraded your inner narrator. In real life, talking to yourself like a coach instead of a judge is core Shadow Walker mastery.';
      return;
    }

    const ln = lines[index];
    cardBox.innerHTML = '';

    const harshBox = document.createElement('div');
    harshBox.style.background = 'rgba(0,0,0,0.35)';
    harshBox.style.borderRadius = '14px';
    harshBox.style.padding = '10px 12px';
    harshBox.style.border = '1px solid rgba(255,255,255,0.08)';
    harshBox.style.fontSize = '0.95rem';
    harshBox.innerHTML = `<strong>Harsh line:</strong> ${ln.harsh}`;
    cardBox.appendChild(harshBox);

    const label = document.createElement('div');
    label.style.marginTop = '10px';
    label.style.fontSize = '0.9rem';
    label.textContent = 'Choose a better narrator line:';
    cardBox.appendChild(label);

    const list = document.createElement('div');
    list.style.display = 'grid';
    list.style.gap = '6px';
    list.style.marginTop = '6px';
    cardBox.appendChild(list);

    ln.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'btn';
      b.style.textAlign = 'left';
      b.style.whiteSpace = 'normal';
      b.style.fontSize = '0.85rem';
      b.textContent = opt;

      b.onclick = () => {
        list.querySelectorAll('button').forEach((btn) => (btn.disabled = true));

        if (i === ln.correct) {
          b.style.backgroundColor = 'rgba(46,204,113,0.7)';
          result.textContent =
            'Yes. This line is honest about the pain but still kind and focused on training.';
        } else {
          b.style.backgroundColor = 'rgba(231,76,60,0.7)';
          result.textContent =
            'This either attacks you or denies reality. The goal is realistic + kind, not fake positive.';
        }

        setTimeout(() => {
          index++;
          result.textContent = '';
          showLine();
        }, 1700);
      };

      list.appendChild(b);
    });
  }

  showLine();
}
