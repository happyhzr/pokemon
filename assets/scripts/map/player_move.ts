import { _decorator, animation, Collider2D, Component, Node, RigidBody2D, Vec2, Animation, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player_move')
export class player_move extends Component {
    static canControl = true

    private rbody: RigidBody2D
    private ani: Animation
    private collider: Collider2D
    private dir = new Vec2(0, 0)
    private speed = 5

    start() {
        this.rbody = this.getComponent(RigidBody2D)
        this.ani = this.getComponent(Animation)
        this.collider = this.getComponent(Collider2D)

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    update(deltaTime: number) {
        if (player_move.canControl) {
            this.rbody.linearVelocity = new Vec2(this.dir.x * this.speed, this.dir.y * this.speed)
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)
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
}


