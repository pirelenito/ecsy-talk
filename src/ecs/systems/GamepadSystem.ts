import { System, Entity } from 'ecsy'
import GamepadComponent from '../components/GamepadComponent'

export default class GamepadSystem extends System {
  updateGamepad(entity: Entity) {
    const gamepad = entity.getMutableComponent(GamepadComponent)
    if (!gamepad) return

    const navigatorGamepad = navigator.getGamepads()[gamepad.index]

    if (navigatorGamepad) {
      const buttons = navigatorGamepad.buttons

      gamepad.buttonUpPressed = buttons[12].pressed
      gamepad.buttonDownPressed = buttons[13].pressed
      gamepad.buttonLeftPressed = buttons[14].pressed
      gamepad.buttonRightPressed = buttons[15].pressed
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
