const game = (global => {
var data = {
  coins: 0,
  meta: 0
};

function getGain() {
  var gain = 1 + data.meta;
  // multipliers
  return gain;
}

// Ascensions
/** @return {Number} floor log10 data.coins */
function afterAscend() {
  return Math.floor(Math.log10(data.coins));
}
/** @return [Number] afterAscend <= data.meta false else afterAscend */
function ascendValue() {
  const n = afterAscend();
  return n > data.meta && n;
}
/** side effects here */
function doAscend() {
  data.meta = afterAscend();
  data.coins = 0;
  drawOnce();
}

// Upgrades

// Offline boosts

// Challenges

// Research

// Reincarnations

// Microtransactions

// Business logic
function drawOnce() {
  data.meta && document.getElementById("metabar").classList.add("shown");
  ascendValue() || document.getElementById("ascendbar").classList.remove("shown");
}

function draw() {
  document.getElementById("coins").innerHTML = Math.floor(data.coins);
  document.getElementById("gain").innerHTML = getGain();
  document.getElementById("meta").innerHTML = data.meta;
  if (ascendValue()) {
    document.getElementById("metadelta").innerHTML = ascendValue() - data.meta;
    document.getElementById("ascendbar").classList.add("shown");
  }
}

var lastTime;

function update(timestamp) {
  if (lastTime !== undefined) { // t
    var deltaTime = timestamp - lastTime;
    data.coins += getGain() * deltaTime / 1000;
    localStorage.data = JSON.stringify(data);
    draw();
  }

  lastTime = timestamp;
  global.requestAnimationFrame(update);
};

global.addEventListener("load", function () {
  var load = localStorage.data;
  if (load) {
    data = JSON.parse(load);
  }
  drawOnce();
  draw();
  requestAnimationFrame(update);
});

return {
  tryAscend: () => ascendValue() && doAscend(),
  clear: () => (localStorage.data = JSON.stringify({coins: 0, meta: 0})) && location.reload()
};

})(window);
