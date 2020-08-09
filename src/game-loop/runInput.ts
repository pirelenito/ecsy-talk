import GameState from './GameState'

export default function runInput(gameState: GameState, delta: number) {
  const gamepad = navigator.getGamepads()[0]

  if (gamepad) {
    gameState.buttonUpPressed = gamepad.buttons[12].pressed
    gameState.buttonDownPressed = gamepad.buttons[13].pressed
    gameState.buttonLeftPressed = gamepad.buttons[14].pressed
    gameState.buttonRightPressed = gamepad.buttons[15].pressed
  }
}
