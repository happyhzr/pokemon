import { _decorator, Component, EventTouch, Input, input, Label, Node } from 'cc';
import { player_move } from './player_move';
const { ccclass, property } = _decorator;

@ccclass('dialogue_manager')
export class dialogue_manager extends Component {
    static instance: dialogue_manager

    private label: Label
    private contents: string[]
    private index: number
    private onFinished: () => void

    start() {
        dialogue_manager.instance = this
        this.label = this.getComponentInChildren(Label)
        this.node.active = false
    }

    update(deltaTime: number) {

    }

    protected onEnable(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouch, this)
    }

    protected onDisable(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouch, this)
    }

    showDialogue(text: string[], onFinished: () => void) {
        this.node.active = true
        player_move.canControl = false
        this.contents = text
        this.index = 0
        this.onFinished = onFinished
        this.dialogue()
    }

    dialogue() {
        if (this.index == this.contents.length) {
            this.node.active = false
            this.onFinished()
            player_move.canControl = true
            return
        }
        this.unscheduleAllCallbacks()
        this.label.string = ""
        let targetString = this.contents[this.index]
        this.index++
        let printIndex = 0
        this.schedule(() => {
            if (printIndex < targetString.length) {
                this.label.string = targetString.substring(0, printIndex)
                printIndex++
            }
        }, 0.1)
    }

    onTouch(event: EventTouch) {
        this.dialogue()
    }
}


