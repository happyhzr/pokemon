import { _decorator, CCString, Component, Node } from 'cc';
import { dialogue_manager } from './dialogue_manager';
const { ccclass, property } = _decorator;

@ccclass('npc')
export class npc extends Component {
    @property({ type: [CCString] })
    contents: string[] = []

    start() {

    }

    update(deltaTime: number) {

    }

    talk() {
        dialogue_manager.instance.showDialogue(this.contents, () => {

        })
    }
}


