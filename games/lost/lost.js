// games/lost/lost.js

// Attach click handlers once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.play-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      startLostGame(btn.dataset.game);
    });
  });
});

/**
 * Master dispatcher for Lost Mode games
 */
function startLostGame(id) {
  const map = {
    northStar: lostNorthStar,
    lostBreath: lostBreathGame,
    lostSound: lostSoundGame,
    lostPattern: lostPatternGame,
    lostReact: lostReactGame,
  };
  if (map[id]) map[id]();
}

/* ------------------------------------------------
   1) North Star Maze – with mobile arrows
--------------------------------------------------*/
function lostNorthStar() {
  modalOpen(
    'North Star Maze',
    'Find the ⭐ with tiny steps. This trains micro-step clarity in Lost Mode.'
  );

  const area = document.getElementById('game-area');
  const size = 7;
  let player = { x: 0, y: size - 1 };
  const goal = { x: size - 1, y: 0 };
  let moves = 0;

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Use keyboard (PC) or arrow buttons (mobile). Only tiles near you are visible.';
  area.appendChild(info);

  const movesSpan = document.createElement('div');
  movesSpan.className = 'pill';
  movesSpan.textContent = 'Moves: 0';
  area.appendChild(movesSpan);

  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 30px)`;
  grid.style.marginTop = '10px';
  area.appendChild(grid);

  function render() {
    grid.innerHTML = '';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const dist = Math.abs(x - player.x) + Math.abs(y - player.y);

        if (x === player.x && y === player.y) {
          cell.classList.add('cell-player');
          cell.textContent = '🙂';
        } else if (x === goal.x && y === goal.y && dist <= 1) {
          cell.classList.add('cell-goal');
          cell.textContent = '⭐';
        } else if (dist <= 1) {
          cell.classList.add('cell-visible');
        } else {
          cell.classList.add('cell-hidden');
        }

        grid.appendChild(cell);
      }
    }
  }
  render();

  function move(dx, dy) {
    const nx = player.x + dx;
    const ny = player.y + dy;
    if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;

    player = { x: nx, y: ny };
    moves++;
    movesSpan.textContent = 'Moves: ' + moves;
    render();

    if (player.x === goal.x && player.y === goal.y) {
      const msg = document.createElement('div');
      msg.className = 'game-info-line';
      msg.style.marginTop = '8px';
      msg.textContent =
        "You found the North Star step by step. That's how we escape Lost Mode in real life too.";
      area.appendChild(msg);
      window.removeEventListener('keydown', keyHandler);
    }
  }

  function keyHandler(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') move(0, -1);
    if (e.key === 'ArrowDown' || e.key === 's') move(0, 1);
    if (e.key === 'ArrowLeft' || e.key === 'a') move(-1, 0);
    if (e.key === 'ArrowRight' || e.key === 'd') move(1, 0);
  }
  window.addEventListener('keydown', keyHandler);

  // Clean up on modal close
  modalOnClose(() => {
    window.removeEventListener('keydown', keyHandler);
  });

  // On-screen controller (mobile)
  const pad = document.createElement('div');
  pad.className = 'mobile-controller';
  pad.innerHTML = `
    <div></div>
    <button data-dir="up">⬆️</button>
    <div></div>
    <button data-dir="left">⬅️</button>
    <div></div>
    <button data-dir="right">➡️</button>
    <div></div>
    <button data-dir="down">⬇️</button>
    <div></div>
  `;
  area.appendChild(pad);

  pad.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const d = btn.dataset.dir;
      if (d === 'up') move(0, -1);
      if (d === 'down') move(0, 1);
      if (d === 'left') move(-1, 0);
      if (d === 'right') move(1, 0);
    });
  });
}

/* ------------------------------------------------
   2) Calm Breathing Path – circle breathing
--------------------------------------------------*/
function lostBreathGame() {
  modalOpen(
    'Calm Breathing Path',
    'Tap gently while the circle “breathes”. This calms the nervous system.'
  );

  const area = document.getElementById('game-area');

  const text = document.createElement('div');
  text.className = 'game-info-line';
  text.textContent =
    'Circle slowly grows (inhale) and shrinks (exhale). Tap when it feels most calm.';
  area.appendChild(text);

  const circle = document.createElement('div');
  circle.className = 'breath-circle'; // styled in shared CSS
  circle.style.width = '70px';
  circle.style.height = '70px';
  area.appendChild(circle);

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Tap with Breath';
  btn.style.display = 'block';
  btn.style.margin = '10px auto 0';
  area.appendChild(btn);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'game-info-line';
  scoreLine.style.marginTop = '8px';
  scoreLine.textContent = 'Calm taps: 0 / 15';
  area.appendChild(scoreLine);

  let size = 70;
  let growing = true;
  let taps = 0;
  let finished = false;

  const interval = setInterval(() => {
    if (growing) {
      size += 0.8;
      if (size >= 110) growing = false;
    } else {
      size -= 0.8;
      if (size <= 70) growing = true;
    }
    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
  }, 20);

  modalOnClose(() => clearInterval(interval));

  btn.onclick = () => {
    if (finished) return;
    taps++;
    if (taps >= 15) {
      finished = true;
      clearInterval(interval);
      scoreLine.textContent =
        'Your breathing is steady. Lost mind is calmer now.';
      btn.disabled = true;
    } else {
      scoreLine.textContent = `Calm taps: ${taps} / 15`;
    }
  };
}

/* ------------------------------------------------
   3) Sound Direction Finder (simple version)
--------------------------------------------------*/
function lostSoundGame() {
  modalOpen(
    'Sound Direction Finder',
    'Guess which side the “sound” is from. Trains attention to small signals.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Imagine a sound playing in one ear. Choose LEFT or RIGHT. The goal is practising attention, not perfection.';
  area.appendChild(info);

  const row = document.createElement('div');
  row.style.marginTop = '16px';
  row.style.display = 'flex';
  row.style.gap = '10px';
  row.style.justifyContent = 'center';
  area.appendChild(row);

  const leftBtn = document.createElement('button');
  leftBtn.className = 'btn';
  leftBtn.textContent = 'LEFT 🔊';

  const rightBtn = document.createElement('button');
  rightBtn.className = 'btn';
  rightBtn.textContent = 'RIGHT 🔊';

  row.appendChild(leftBtn);
  row.appendChild(rightBtn);

  const result = document.createElement('div');
  result.className = 'game-info-line';
  result.style.marginTop = '12px';
  area.appendChild(result);

  const correct = Math.random() < 0.5 ? 'left' : 'right';

  function finish(choice) {
    if (choice === correct) {
      result.textContent =
        'Correct! Your attention can lock onto a signal in the noise.';
    } else {
      result.textContent =
        'Not this time. The win is that you focused, not that you guessed right.';
    }
    leftBtn.disabled = true;
    rightBtn.disabled = true;
  }

  leftBtn.onclick = () => finish('left');
  rightBtn.onclick = () => finish('right');
}

/* ------------------------------------------------
   4) Pattern Breaker – stop auto-choosing A
--------------------------------------------------*/
function lostPatternGame() {
  modalOpen(
    'Pattern Breaker',
    'Stop choosing the same option automatically. This is how you break loops.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent =
    'Most people auto-select the first option repeatedly. Try to choose a DIFFERENT letter.';
  area.appendChild(info);

  const row = document.createElement('div');
  row.style.marginTop = '14px';
  row.style.display = 'flex';
  row.style.flexWrap = 'wrap';
  row.style.gap = '8px';
  area.appendChild(row);

  const letters = ['A', 'A', 'A', 'B', 'C', 'D'];
  let finished = false;

  letters.forEach((letter) => {
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = letter;
    b.onclick = () => {
      if (finished) return;

      if (letter === 'A') {
        info.textContent =
          'This is the loop: choosing A again and again without thinking.';
        b.disabled = true;
      } else {
        finished = true;
        info.textContent = `You chose ${letter}. That’s a pattern break.`;
        row.querySelectorAll('button').forEach((btn) => (btn.disabled = true));
      }
    };
    row.appendChild(b);
  });

  const note = document.createElement('div');
  note.className = 'game-info-line';
  note.style.marginTop = '12px';
  note.textContent =
    'Notice how it feels to pick a new option instead of autopilot. This is the exact muscle needed to escape Lost Mode habits.';
  area.appendChild(note);
}

/* ------------------------------------------------
   5) Reaction Trail – tap fast ⚡ tiles
--------------------------------------------------*/
function lostReactGame() {
  modalOpen(
    'Reaction Trail',
    'Tap 10 ⚡ tiles as they appear. Trains awake but not anxious reaction.'
  );

  const area = document.getElementById('game-area');

  const info = document.createElement('div');
  info.className = 'game-info-line';
  info.textContent = 'Tap the ⚡ tile before it disappears. Reach 10 hits.';
  area.appendChild(info);

  const grid = document.createElement('div');
  grid.className = 'grid';
  grid.style.gridTemplateColumns = 'repeat(5, 40px)';
  grid.style.marginTop = '16px';
  area.appendChild(grid);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'game-info-line';
  scoreLine.style.marginTop = '8px';
  scoreLine.textContent = 'Hits: 0 / 10';
  area.appendChild(scoreLine);

  let hits = 0;
  let currentIndex = -1;
  let finished = false;

  function render() {
    grid.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', 'cell-visible');

      if (i === currentIndex) {
        cell.textContent = '⚡';
        cell.style.background = '#f9c74f';
        cell.style.cursor = 'pointer';

        cell.onclick = () => {
          if (finished) return;

          hits++;
          if (hits >= 10) {
            finished = true;
            clearInterval(interval);
            scoreLine.textContent =
              'Nice! Your reaction is awake. Lost Mode fog is weaker.';
            // Freeze grid at last position
          } else {
            scoreLine.textContent = `Hits: ${hits} / 10`;
            pickNew();
          }
        };
      }

      grid.appendChild(cell);
    }
  }

  function pickNew() {
    currentIndex = Math.floor(Math.random() * 25);
    render();
  }

  pickNew();
  const interval = setInterval(() => {
    if (!finished) {
      pickNew();
    }
  }, 1200);

  modalOnClose(() => clearInterval(interval));
}
