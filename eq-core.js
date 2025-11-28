// eq-core.js
// Global EQ engine using localStorage

(function () {
  const STORAGE_KEY = "eqUserData_v1";

  const EQ_TIERS = [
    { name: "God Mode",        min: 1300, max: 1400 },
    { name: "Enlightened Mode",min: 1200, max: 1299 },
    { name: "Healer Mode",     min: 1100, max: 1199 },
    { name: "Sage Mode",       min: 1000, max: 1059 },
    { name: "Monk Mode",       min: 900,  max: 959  },
    { name: "Empath Mode",     min: 800,  max: 899  },
    { name: "Balanced Mode",   min: 700,  max: 799  },
    { name: "Awareness Mode",  min: 600,  max: 699  },
    { name: "Seeker Mode",     min: 500,  max: 599  },
    { name: "Shadow Walker",   min: 400,  max: 499  },
    { name: "Storm Mode",      min: 300,  max: 399  },
    { name: "Addiction Loop",  min: 200,  max: 299  },
    { name: "Chaotic Mode",    min: 100,  max: 199  },
    { name: "Lost Mode",       min: 0,    max: 99   },
  ];

  // Default user data
  function defaultUser() {
    return {
      eqScore: 0,         // for League Tier
      eqPoints: 0,        // for Market
      totalGamesPlayed: 0,
      lastUpdated: Date.now(),
      modes: {}           // per-mode stats
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultUser();
      return { ...defaultUser(), ...JSON.parse(raw) };
    } catch (e) {
      console.warn("EQ: load error, resetting", e);
      return defaultUser();
    }
  }

  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getTier(score) {
    return (
      EQ_TIERS.find(t => score >= t.min && score <= t.max) ||
      EQ_TIERS[EQ_TIERS.length - 1]
    );
  }

  // Public API
  const EQ = {
    getUser() {
      return load();
    },

    getTier() {
      const u = load();
      return getTier(u.eqScore);
    },

    addReward({ modeKey, eqScore = 0, eqPoints = 0, label = "" }) {
      const u = load();
      u.eqScore += eqScore;
      u.eqPoints += eqPoints;
      u.totalGamesPlayed += 1;
      u.lastUpdated = Date.now();

      if (!u.modes[modeKey]) {
        u.modes[modeKey] = { gamesPlayed: 0, scoreEarned: 0 };
      }
      u.modes[modeKey].gamesPlayed += 1;
      u.modes[modeKey].scoreEarned += eqScore;

      save(u);

      const tier = getTier(u.eqScore);

      // simple popup-style feedback
      alert(
        `Reward earned: +${eqScore} EQ Score, +${eqPoints} Points\n` +
        (label ? `Reason: ${label}\n` : "") +
        `Total EQ Score: ${u.eqScore} (${tier.name})\n` +
        `Wallet: ${u.eqPoints} EQ Points`
      );
    },

    spendPoints(cost) {
      const u = load();
      if (u.eqPoints < cost) return false;
      u.eqPoints -= cost;
      save(u);
      return true;
    },

    getWallet() {
      return load().eqPoints;
    },

    getEqScore() {
      return load().eqScore;
    },

    getTiersList() {
      return EQ_TIERS;
    }
  };

  window.EQ = EQ;
})();
