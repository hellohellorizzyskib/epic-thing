// --- Replace or extend this data with your games and their embed codes ---
const GAMES = {
  game1: {
    name: "Space Invaders",
    embed: '<iframe src="https://mathhelp.netlify.app/" allowfullscreen></iframe>',
    suggestions: ['game2', 'game3', 'game1']
  },
  game2: {
    name: "Tetris",
    embed: '<iframe src="https://example.com/tetris" allowfullscreen></iframe>',
    suggestions: ['game3', 'game1', 'game2']
  },
  game3: {
    name: "Snake",
    embed: '<iframe src="https://example.com/snake" allowfullscreen></iframe>',
    suggestions: ['game1', 'game2', 'game3']
  }
  // Add more games here
};

function goToGame(gameId) {
  window.location.href = `game.html?game=${gameId}`;
}

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Only runs on game.html
function initGamePage() {
  const gameId = getQueryParam('game');
  const game = GAMES[gameId];
  if (!game) {
    document.body.innerHTML = "<h2>Game not found.</h2>";
    return;
  }

  document.title = game.name;
  document.getElementById('game-title').innerText = game.name;
  document.getElementById('game-name').innerText = game.name;

  // Embed game
  const gameBox = document.getElementById('game-box');
  gameBox.querySelector('iframe').outerHTML = game.embed;
  // Set id to the new iframe
  const newIframe = gameBox.querySelector('iframe');
  newIframe.id = "game-frame";

  // Suggestions
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';
  for (const sugId of game.suggestions) {
    if (!GAMES[sugId]) continue;
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.innerText = GAMES[sugId].name;
    btn.onclick = () => goToGame(sugId);
    suggestionsDiv.appendChild(btn);
  }
}

// Fullscreen button
function goFullscreen() {
  const frame = document.getElementById('game-frame');
  if (frame.requestFullscreen) {
    frame.requestFullscreen();
  } else if (frame.mozRequestFullScreen) { // Firefox
    frame.mozRequestFullScreen();
  } else if (frame.webkitRequestFullscreen) { // Chrome, Safari and Opera
    frame.webkitRequestFullscreen();
  } else if (frame.msRequestFullscreen) { // IE/Edge
    frame.msRequestFullscreen();
  }
}
