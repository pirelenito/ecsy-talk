import { Component, Types } from 'ecsy'

export default class PositionComponent extends Component<PositionComponent> {
  x!: number
  y!: number

  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
  }
}
