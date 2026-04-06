import { _decorator, CCInteger, CCString, Component, Enum, Node } from 'cc';
import { PokemonType } from './Pokemon';
const { ccclass, property } = _decorator;

@ccclass('Skill')
export class Skill extends Component {
    @property({ type: CCString })
    skillName: string = ""
    @property({ type: CCInteger })
    power: number = 0
    @property({ type: Enum(PokemonType) })
    type: PokemonType = PokemonType.Fire
    start() {

    }

    update(deltaTime: number) {

    }
}


