import GameState from './GameState'
import runInput from './runInput'
import runPlayerMovement from './runPlayerMovement'
import runPhysics from './runPhysics'
import runRendering from './runRendering'

const gameState: GameState = {
  x: 0,
  y: 0,

  buttonUpPressed: false,
  buttonDownPressed: false,
  buttonLeftPressed: false,
  buttonRightPressed: false,
}

let previousTime = Date.now()

const gameLoop = () => {
  const time = Date.now()
  const delta = time - previousTime

  runInput(gameState, delta)
  runPlayerMovement(gameState, delta)
  runPhysics(gameState, delta)
  runRendering(gameState, delta)

  previousTime = time
  window.requestAnimationFrame(gameLoop)
}

gameLoop()

export default {}
