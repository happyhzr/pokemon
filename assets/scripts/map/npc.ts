import { _decorator, CCString, Component, director, Node } from 'cc';
import { dialogue_manager } from './dialogue_manager';
import { InventoryManager } from './item_manager';
import { BattleManager } from '../battle/BattleManager';
const { ccclass, property } = _decorator;

@ccclass('npc')
export class npc extends Component {
    @property({ type: [CCString] })
    contents: string[] = []

    @property
    itemID: number = 0

    @property
    pokemonID: number = 0

    start() {

    }

    update(deltaTime: number) {

    }

    talk() {
        dialogue_manager.instance.showDialogue(this.contents, () => {
            if (this.itemID > 0) {
                InventoryManager.getInstance().addItem(this.itemID)
            }
            if (this.pokemonID > 0) {
                BattleManager.enemyPokemonID = this.pokemonID
                director.loadScene("battle")
            }
        })
    }
}


