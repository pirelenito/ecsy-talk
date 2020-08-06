const ball = document.createElement('div')
ball.style.position = 'absolute'
ball.style.background = '#FFEBEA'
ball.style.width = '40px'
ball.style.height = '40px'
ball.style.borderRadius = '20px'
document.body.appendChild(ball)

const gameState = {
  x: 0,
  y: 0,
  speed: 0.2,
  gravity: 0.1,
}

const inputSystem = (delta: number) => {
  const gamepad = navigator.getGamepads()[0]

  if (gamepad) {
    const buttonUp = gamepad.buttons[12].pressed
    const buttonDown = gamepad.buttons[13].pressed
    const buttonLeft = gamepad.buttons[14].pressed
    const buttonRight = gamepad.buttons[15].pressed

    // update game state
    const speed = gameState.speed * delta
    gameState.x += buttonRight ? speed : buttonLeft ? -speed : 0
    gameState.y += buttonDown ? speed : buttonUp ? -speed : 0
  }
}

const physicsSystem = (delta: number) => {
  gameState.y += gameState.y <= window.innerHeight - 40 ? gameState.gravity * delta : 0
}

const renderingSystem = (delta: number) => {
  ball.style.left = `${gameState.x}px`
  ball.style.top = `${gameState.y}px`
}

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  inputSystem(delta)
  physicsSystem(delta)
  renderingSystem(delta)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
