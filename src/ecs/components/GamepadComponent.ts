import { Component, Types } from 'ecsy'

export default class GamepadComponent extends Component<GamepadComponent> {
  index!: number
  buttonUpPressed!: boolean
  buttonDownPressed!: boolean
  buttonLeftPressed!: boolean
  buttonRightPressed!: boolean

  static schema = {
    index: { type: Types.Number, default: 0 },
    buttonUpPressed: { type: Types.Boolean, default: false },
    buttonDownPressed: { type: Types.Boolean, default: false },
    buttonLeftPressed: { type: Types.Boolean, default: false },
    buttonRightPressed: { type: Types.Boolean, default: false },
  }
}
