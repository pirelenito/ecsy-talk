import { System, Entity, Not } from 'ecsy'
import * as THREE from 'three'
import ThreeRenderingSystemStateComponent from '../state-components/ThreeRenderingSystemStateComponent'
import PositionComponent from '../components/PositionComponent'
import RenderableComponent from '../components/RenderableComponent'

export default class ThreeRenderingSystem extends System {
  scene!: THREE.Scene
  renderer!: THREE.WebGLRenderer
  camera!: THREE.OrthographicCamera

  init() {
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x1b363e)

    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -10,
      window.innerWidth / 10,
      window.innerHeight / 10,
      window.innerHeight / -10,
      1,
      100,
    )
    camera.position.y = 2
    camera.position.z = 3
    camera.position.x = 1
    camera.lookAt(new THREE.Vector3(1, 0, 3))

    scene.add(camera)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    this.scene = scene
    this.renderer = renderer
    this.camera = camera

    document.body.appendChild(renderer.domElement)
  }

  addRenderable(entity: Entity) {
    const position = entity.getComponent(PositionComponent)
    const renderable = entity.getComponent(RenderableComponent)
    if (!position || !renderable) return

    const geometry = new THREE.SphereBufferGeometry()
    const material = new THREE.MeshStandardMaterial({ color: renderable.color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position.x / 10, 0, position.y / 10)
    this.scene.add(mesh)

    entity.addComponent(ThreeRenderingSystemStateComponent, { mesh })
  }

  updatePosition(entity: Entity) {
    const stateComponent = entity.getComponent(ThreeRenderingSystemStateComponent)
    const position = entity.getComponent(PositionComponent)
    if (!position || !stateComponent || !stateComponent.mesh) return

    stateComponent.mesh.position.set(position.x / 10, 0, position.y / 10)
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
