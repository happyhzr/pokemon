import { _decorator, CCString, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pokemon')
export class Pokemon extends Component {
    @property({ type: [CCString] })
    skills: string[] = []
    start() {

    }

    update(deltaTime: number) {

    }
}


