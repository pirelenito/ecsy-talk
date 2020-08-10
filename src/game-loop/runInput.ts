import GameState from './GameState'

export default function runInput(gameState: GameState, delta: number) {
  const gamepad = navigator.getGamepads()[0]

  if (gamepad) {
    const buttons = gamepad.buttons

    gameState.buttonUpPressed = buttons[12].pressed
    gameState.buttonDownPressed = buttons[13].pressed
    gameState.buttonLeftPressed = buttons[14].pressed
    gameState.buttonRightPressed = buttons[15].pressed
  }
}
