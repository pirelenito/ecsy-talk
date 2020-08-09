import { SystemStateComponent, Types } from 'ecsy'

export default class RenderingSystemStateComponent extends SystemStateComponent<RenderingSystemStateComponent> {
  element?: HTMLDivElement

  static schema = {
    element: { type: Types.Ref },
  }
}
