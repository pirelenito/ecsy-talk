import { SystemStateComponent, Types } from 'ecsy'
import * as THREE from 'three'

export default class ThreeRenderingSystemStateComponent extends SystemStateComponent<
  ThreeRenderingSystemStateComponent
> {
  mesh?: THREE.Mesh

  static schema = {
    mesh: { type: Types.Ref },
  }
}
