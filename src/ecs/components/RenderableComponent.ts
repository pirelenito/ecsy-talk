import { Component, Types } from 'ecsy'

export default class RenderableComponent extends Component<RenderableComponent> {
  color!: string

  static schema = {
    color: {
      type: Types.String,
      default: '#FFEBEA',
    },
  }
}
