import GameState from './GameState'

const SPEED = 0.2

export default function runPlayerMovement(gameState: GameState, delta: number) {
  const speed = SPEED * delta
  gameState.x += gameState.buttonRightPressed ? speed : gameState.buttonLeftPressed ? -speed : 0
  gameState.y += gameState.buttonDownPressed ? speed : gameState.buttonUpPressed ? -speed : 0
}
