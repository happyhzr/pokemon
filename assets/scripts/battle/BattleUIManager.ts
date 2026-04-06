import { _decorator, Component, Input, input, instantiate, Label, Node, Prefab } from 'cc';
import { Pokemon } from './Pokemon';
import { InventoryManager, Item } from '../map/item_manager';
const { ccclass, property } = _decorator;

@ccclass('BattleUIManager')
export class BattleUIManager extends Component {
    private static instance: BattleUIManager

    @property({ type: Prefab })
    buttonPrefab: Prefab

    static getInstance() {
        return BattleUIManager.instance
    }

    start() {
        BattleUIManager.instance = this
        this.node.active = false
    }

    update(deltaTime: number) {

    }

    showUI(pokemon: Pokemon, skillClick: (skill: string) => void, itemClick: (item: Item) => void) {
        this.node.active = true
        pokemon.skills.forEach((skill) => {
            let button = instantiate(this.buttonPrefab)
            button.setParent(this.node.children[0])
            button.getComponentInChildren(Label).string = skill
            button.on(Input.EventType.TOUCH_START, () => {
                skillClick(skill)
                this.hideUI()
            })
        })
        InventoryManager.getInstance().itemMap.forEach((item) => {
            let button = instantiate(this.buttonPrefab)
            button.setParent(this.node.children[1])
            button.getComponentInChildren(Label).string = item.itemName
            button.on(Input.EventType.TOUCH_START, () => {
                itemClick(item)
                this.hideUI()
            })
        })
    }

    hideUI() {
        this.node.children[0].removeAllChildren()
        this.node.children[1].removeAllChildren()
        this.node.active = false
    }
}


