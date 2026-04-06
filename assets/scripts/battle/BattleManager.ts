import { _decorator, Component, instantiate, Node, Prefab, resources } from 'cc';
import { Pokemon } from './Pokemon';
import { Item } from '../map/item_manager';
import { TeamManager } from './TeamManager';
const { ccclass, property } = _decorator;

@ccclass('BattleManager')
export class BattleManager extends Component {
    static enemyPokemonID: number = 2
    static instance: BattleManager

    @property({ type: Node })
    playerParent: Node
    @property({ type: Node })
    enemyParent: Node

    private player: Pokemon
    private enmey: Pokemon
    private index: number = 0
    private isPlayer: boolean = false
    private playerSkill: string = ""
    private enmeySkill: string = ""
    private enemtyItem: Item

    start() {
        BattleManager.instance = this
        this.scheduleOnce(this.turnStart, 1)
    }

    update(deltaTime: number) {

    }

    turnStart() {
        if (this.index < TeamManager.getInstance().getPokemons().length) {
            const index = TeamManager.getInstance().getPokemons()[this.index]
            resources.load(`pokemon/${index}`, Prefab, (err, prefab) => {
                this.index++
                const playerNode = instantiate(prefab)
                playerNode.setParent(this.playerParent)
                this.player = playerNode.getComponent(Pokemon)
            })
        }
        resources.load(`pokemon/${BattleManager.enemyPokemonID}`, Prefab, (err, prefab) => {
            const enemyNode = instantiate(prefab)
            enemyNode.setParent(this.enemyParent)
            this.enmey = enemyNode.getComponent(Pokemon)
        })
        this.scheduleOnce(this.playerAction, 1)
    }

    playerAction() {

    }

    enemyAction() {

    }
}


