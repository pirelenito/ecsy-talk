import { System, Entity } from 'ecsy'
import GamepadComponent from '../components/GamepadComponent'

export default class GamepadSystem extends System {
  updateGamepad(entity: Entity) {
    const gamepadComponent = entity.getMutableComponent(GamepadComponent)
    if (!gamepadComponent) return

    const gamepad = navigator.getGamepads()[gamepadComponent.index]

    if (gamepad) {
      gamepadComponent.buttonUpPressed = gamepad.buttons[12].pressed
      gamepadComponent.buttonDownPressed = gamepad.buttons[13].pressed
      gamepadComponent.buttonLeftPressed = gamepad.buttons[14].pressed
      gamepadComponent.buttonRightPressed = gamepad.buttons[15].pressed
    }
  }

  execute() {
    this.queries.gamepads.results.forEach((e) => this.updateGamepad(e))
  }

  static queries = {
    gamepads: {
      components: [GamepadComponent],
    },
  }
}
