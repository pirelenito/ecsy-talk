import { System, Entity, Not } from 'ecsy'
import * as THREE from 'three'
import ThreeRenderingSystemStateComponent from '../state-components/ThreeRenderingSystemStateComponent'
import PositionComponent from '../components/PositionComponent'
import RenderableComponent from '../components/RenderableComponent'

export default class ThreeRenderingSystem extends System {
  scene!: THREE.Scene
  renderer!: THREE.WebGLRenderer
  camera!: THREE.Camera

  init() {
    const scene = new THREE.Scene()
    this.scene = scene

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x1b363e)
    this.renderer = renderer

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.y = 40
    camera.position.z = 40
    camera.lookAt(0, 0, 0)
    scene.add(camera)
    this.camera = camera

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    document.body.appendChild(renderer.domElement)
  }

  addRenderable(entity: Entity) {
    const position = entity.getComponent(PositionComponent)
    const renderable = entity.getComponent(RenderableComponent)
    if (!position || !renderable) return

    const geometry = new THREE.SphereBufferGeometry()
    const material = new THREE.MeshStandardMaterial({ color: renderable.color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(convertPosition(position))
    this.scene.add(mesh)

    entity.addComponent(ThreeRenderingSystemStateComponent, { mesh })
  }

  updatePosition(entity: Entity) {
    const stateComponent = entity.getComponent(ThreeRenderingSystemStateComponent)
    const position = entity.getComponent(PositionComponent)
    if (!position || !stateComponent || !stateComponent.mesh) return

    stateComponent.mesh.position.copy(convertPosition(position))
  }

  removeRenderable(entity: Entity) {
    const stateComponent = entity.getComponent(ThreeRenderingSystemStateComponent)
    if (!stateComponent) return

    if (stateComponent.mesh) {
      this.scene.remove(stateComponent.mesh)
    }

    entity.removeComponent(ThreeRenderingSystemStateComponent)
  }

  execute() {
    this.queries.uninitialized.added?.forEach((e) => this.addRenderable(e))
    this.queries.positions.changed?.forEach((e) => this.updatePosition(e))
    this.queries.initialized.removed?.forEach((e) => this.removeRenderable(e))

    this.renderer.render(this.scene, this.camera)
  }

  static queries = {
    uninitialized: {
      components: [RenderableComponent, Not(ThreeRenderingSystemStateComponent)],
      listen: { added: true },
    },

    positions: {
      components: [PositionComponent, ThreeRenderingSystemStateComponent],
      listen: { changed: true },
    },

    initialized: {
      components: [RenderableComponent, ThreeRenderingSystemStateComponent],
      listen: { removed: true },
    },
  }
}

/**
 * Converts our positions that are based on the screen size to something that we can
 * use in 3D.
 *
 * Also the vertical axis in Three.js is actually the `z`
 */
const convertPosition = (position: PositionComponent) => {
  const canvas = 80

  const x = (position.x / window.innerWidth) * canvas - canvas / 2
  const y = 0
  const z = (position.y / window.innerHeight) * canvas - canvas / 2
  return new THREE.Vector3(x, y, z)
}
