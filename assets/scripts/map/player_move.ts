import { _decorator, animation, Collider2D, Component, Node, RigidBody2D, Vec2, Animation, input, Input, EventKeyboard, KeyCode, Contact2DType } from 'cc';
import { npc } from './npc';
const { ccclass, property } = _decorator;

@ccclass('player_move')
export class player_move extends Component {
    static canControl = true

    private rbody: RigidBody2D
    private ani: Animation
    private collider: Collider2D
    private dir = new Vec2(0, 0)
    private speed = 5
    private npc: npc

    start() {
        this.rbody = this.getComponent(RigidBody2D)
        this.ani = this.getComponent(Animation)
        this.collider = this.getComponent(Collider2D)

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginCollider, this)
        this.collider.on(Contact2DType.END_CONTACT, this.onEndCollider, this)
    }

    update(deltaTime: number) {
        if (player_move.canControl) {
            this.rbody.linearVelocity = new Vec2(this.dir.x * this.speed, this.dir.y * this.speed)
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)

        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginCollider, this)
        this.collider.off(Contact2DType.END_CONTACT, this.onEndCollider, this)
    }

    private onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.dir.x = -1
                this.ani.play("left_move")
                break
            case KeyCode.KEY_D:
                this.dir.x = 1
                this.ani.play("right_move")
                break
            case KeyCode.KEY_W:
                this.dir.y = 1
                this.ani.play("up_move")
                break
            case KeyCode.KEY_S:
                this.dir.y = -1
                this.ani.play("down_move")
                break
            case KeyCode.KEY_F:
                this.npc?.talk()
                break
        }
    }

    private onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.dir.x = 0
                this.ani.play("left")
                break
            case KeyCode.KEY_D:
                this.dir.x = 0
                this.ani.play("right")
                break
            case KeyCode.KEY_W:
                this.dir.y = 0
                this.ani.play("up")
                break
            case KeyCode.KEY_S:
                this.dir.y = 0
                this.ani.play("down")
                break
        }
    }

    private onBeginCollider(collider: Collider2D, other: Collider2D) {
        this.npc = other.getComponent(npc)
    }

    private onEndCollider(collider: Collider2D, other: Collider2D) {
        if (this.npc == other.getComponent(npc)) {
            this.npc = null
        }
    }
}


