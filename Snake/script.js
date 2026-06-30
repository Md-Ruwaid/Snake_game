// ─── STEP 1: BUILD THE GRID ───────────────────────────────

var cells = []
var grid = document.getElementById('grid')

for (var i = 0; i < 400; i++) {
  var cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
}

// ─── STEP 2: CREATE THE SNAKE ─────────────────────────────

var snake, direction, redFood, blueFood, speed, gameLoop

// ─── HUD elements ──────────────────────────────────────────
var scoreEl = document.getElementById('score')
var speedTextEl = document.getElementById('speedText')
var modalEl = document.getElementById('gameOverModal')
var modalReasonEl = document.getElementById('modalReason')
var modalScoreEl = document.getElementById('modalScore')

function initGame() {
  snake = [212, 211, 210]
  direction = 1
  redFood = 50
  blueFood = 80
  speed = 200

  modalEl.classList.add('hidden')
  drawSnake()
  updateHud()

  clearInterval(gameLoop)
  gameLoop = setInterval(moveSnake, speed)
}

function updateHud() {
  scoreEl.textContent = snake.length - 3
  speedTextEl.textContent = speed
}

function drawSnake() {
  // wipe the board
  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('snake')
    cells[i].classList.remove('head')
    cells[i].classList.remove('red-food')
    cells[i].classList.remove('blue-food')
  }

  // draw snake body
  for (var i = 0; i < snake.length; i++) {
    cells[snake[i]].classList.add('snake')
  }
  // draw head distinctly
  cells[snake[0]].classList.add('head')

  // draw both foods
  cells[redFood].classList.add('red-food')
  cells[blueFood].classList.add('blue-food')
}

// ─── STEP 5: MOVE THE SNAKE ───────────────────────────────

function moveSnake() {
  var newHead = snake[0] + direction

  if (newHead < 0 || newHead >= 400) {
    return gameOver('You hit the wall.')
  }
  if (direction === 1 && snake[0] % 20 === 19) {
    return gameOver('You hit the wall.')
  }
  if (direction === -1 && snake[0] % 20 === 0) {
    return gameOver('You hit the wall.')
  }
  if (snake.includes(newHead)) {
    return gameOver('You hit yourself.')
  }

  snake.unshift(newHead)

  if (newHead === redFood) {
    redFood = Math.floor(Math.random() * 400)
    if (speed < 400) speed = speed + 50
    restartLoop()
  } else if (newHead === blueFood) {
    blueFood = Math.floor(Math.random() * 400)
    if (speed > 60) speed = speed - 50
    restartLoop()
  } else {
    snake.pop()
  }

  drawSnake()
  updateHud()
}

function gameOver(reason) {
  clearInterval(gameLoop)
  modalReasonEl.textContent = reason
  modalScoreEl.textContent = snake.length - 3
  modalEl.classList.remove('hidden')
}

function restartLoop() {
  clearInterval(gameLoop)
  gameLoop = setInterval(moveSnake, speed)
}

// ─── STEP 6: KEYBOARD CONTROLS ────────────────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'd' && direction !== -1) direction = 1
  if (e.key === 'a' && direction !== 1) direction = -1
  if (e.key === 's' && direction !== -20) direction = 20
  if (e.key === 'w' && direction !== 20) direction = -20
})

document.getElementById('restartBtn').addEventListener('click', initGame)

// ─── STEP 7: START THE GAME ───────────────────────────────

initGame()