let vbucks = 0;
let vbucksPerClick = 1;
let vbucksPerSecond = 0;

const upgrades = [
  {
    name: "🔫 Buy Skin",
    cost: 50,
    vps: 1
  },
  {
    name: "🧱 Build Faster",
    cost: 200,
    vps: 5
  },
  {
    name: "🎯 Pro Controller",
    cost: 1000,
    vps: 15
  },
  {
    name: "🌪️ Mythic Loot Drop",
    cost: 5000,
    vps: 50
  }
];

const vbucksEl = document.getElementById("vbucks");
const clickBtn = document.getElementById("click-btn");
const shopEl = document.getElementById("shop");

function updateDisplay() {
  vbucksEl.textContent = Math.floor(vbucks);
}

function earnVbucks() {
  vbucks += vbucksPerClick;
  updateDisplay();
}

function buyUpgrade(index) {
  const upgrade = upgrades[index];
  if (vbucks >= upgrade.cost) {
    vbucks -= upgrade.cost;
    vbucksPerSecond += upgrade.vps;
    upgrade.cost = Math.floor(upgrade.cost * 1.5);
    renderShop();
    updateDisplay();
  }
}

function renderShop() {
  shopEl.innerHTML = "";
  upgrades.forEach((upgrade, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${upgrade.name} (+${upgrade.vps} V/sec) - ${upgrade.cost} V-Bucks`;
    btn.onclick = () => buyUpgrade(index);
    shopEl.appendChild(btn);
  });
}

function autoGenerate() {
  vbucks += vbucksPerSecond / 10;
  updateDisplay();
}

// Saving and Loading
function saveGame() {
  const saveData = {
    vbucks,
    vbucksPerClick,
    vbucksPerSecond,
    upgrades
  };
  localStorage.setItem("idleVbucksSave", JSON.stringify(saveData));
}

function loadGame() {
  const saved = JSON.parse(localStorage.getItem("idleVbucksSave"));
  if (saved) {
    vbucks = saved.vbucks;
    vbucksPerClick = saved.vbucksPerClick;
    vbucksPerSecond = saved.vbucksPerSecond;
    saved.upgrades.forEach((u, i) => upgrades[i].cost = u.cost);
  }
}

clickBtn.addEventListener("click", earnVbucks);

renderShop();
loadGame();
updateDisplay();

// Auto V-Bucks every 100ms
setInterval(autoGenerate, 100);

// Auto save every 10 seconds
setInterval(saveGame, 10000);
