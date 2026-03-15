// games/shared/modal.js
let modalCloseCallbacks = [];

// Open modal and reset content
function modalOpen(title, subtitle) {
    const modal = document.getElementById('game-modal');
    const titleEl = document.getElementById('game-title');
    const area = document.getElementById('game-area');

    titleEl.textContent = subtitle ? `${title} – ${subtitle}` : title;
    area.innerHTML = '';

    modal.classList.add('show');
    modalCloseCallbacks = [];
}

// Close modal + run cleanups (remove listeners, intervals, etc)
function modalClose() {
    const modal = document.getElementById('game-modal');
    modal.classList.remove('show');

    modalCloseCallbacks.forEach(fn => {
        try { fn(); } catch (e) { console.error(e); }
    });
    modalCloseCallbacks = [];
}

// Games register cleanup
function modalOnClose(fn) {
    modalCloseCallbacks.push(fn);
}

// Wire buttons & ESC
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('game-modal');
    const closeBtn = document.getElementById('game-close');

    closeBtn.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modalClose();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modalClose();
    });
});
