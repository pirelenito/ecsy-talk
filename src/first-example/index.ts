const element = document.getElementById('ball')

const state = {
  ball: {
    x: 0,
    y: 0,
  },
}

const gameLoop = () => {
  const time = Date.now() / 1000

  state.ball.x = Math.sin(time) * 200 + 200
  state.ball.y = Math.cos(time) * 200 + 200

  if (element) {
    element.style.left = `${state.ball.x}px`
    element.style.top = `${state.ball.y}px`
  }

  window.requestAnimationFrame(gameLoop)
}

gameLoop()

export default {}
