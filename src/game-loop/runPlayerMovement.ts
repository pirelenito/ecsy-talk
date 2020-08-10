import GameState from './GameState'

const SPEED = 0.2

export default function runPlayerMovement(gameState: GameState, delta: number) {
  const speed = SPEED * delta

  if (gameState.buttonRightPressed) {
    gameState.x += speed
  }

  if (gameState.buttonLeftPressed) {
    gameState.x -= speed
  }

  if (gameState.buttonDownPressed) {
    gameState.y += speed
  }

  if (gameState.buttonUpPressed) {
    gameState.y -= speed
  }
}
