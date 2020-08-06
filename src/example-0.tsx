const ball = document.createElement('div')
ball.style.position = 'absolute'
ball.style.background = '#FFEBEA'
ball.style.width = '20px'
ball.style.height = '20px'
ball.style.borderRadius = '10px'
document.body.appendChild(ball)

const gameState = {
  ball: {
    x: 0,
    y: 0,
  },
}

const gameLoop = () => {
  const time = Date.now()

  // run physics, AI or player input to update the state
  gameState.ball.x = Math.sin(time / 1000) * 200 + 200
  gameState.ball.y = Math.cos(time / 1000) * 200 + 200

  // render the new game state
  ball.style.left = `${gameState.ball.x}px`
  ball.style.top = `${gameState.ball.y}px`

  // start again
  window.requestAnimationFrame(gameLoop)
}

gameLoop()
