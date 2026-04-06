import { _decorator, Component, director, instantiate, Node, Prefab, randomRangeInt, resources } from 'cc';
import { Pokemon } from './Pokemon';
import { Item } from '../map/item_manager';
import { TeamManager } from './TeamManager';
import { BattleUIManager } from './BattleUIManager';
import { Skill } from './Skill';
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
    private enemy: Pokemon
    private index: number = 0
    private isPlayer: boolean = false
    private playerSkill: string = ""
    private enemySkill: string = ""
    private playerItem: Item

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
            this.enemy = enemyNode.getComponent(Pokemon)
        })
        this.scheduleOnce(this.playerAction, 1)
    }

    playerAction() {
        BattleUIManager.getInstance().showUI(this.player, (skill) => {
            this.playerSkill = skill
            this.scheduleOnce(this.enemyAction, 0.5)
        }, (item) => {
            this.playerItem = item
            this.scheduleOnce(this.enemyAction, 0.5)
        })
    }

    enemyAction() {
        const i = randomRangeInt(0, this.enemy.skills.length)
        this.enemySkill = this.enemy.skills[i]
        if (this.enemy.speed < this.player.speed) {
            this.isPlayer = true
            this.scheduleOnce(this.playerTurn, 0.5)
        } else {
            this.isPlayer = false
            this.scheduleOnce(this.enemyTurn, 0.5)
        }
    }

    playerTurn() {
        this.turn(this.player, this.enemy, this.playerSkill, this.playerItem)
        if (this.isPlayer) {
            this.scheduleOnce(this.enemyTurn, 2)
        } else {
            this.scheduleOnce(this.playerAction, 1)
        }
    }

    enemyTurn() {
        this.turn(this.enemy, this.player, this.enemySkill, null)
        if (!this.isPlayer) {
            this.scheduleOnce(this.playerTurn, 2)
        } else {
            this.scheduleOnce(this.playerAction, 1)
        }
    }

    turn(attackPokemon: Pokemon, targetPokemon: Pokemon, skillName: string, item: Item) {
        if (skillName != "") {
            attackPokemon.attackPokemon()
            resources.load(`skill/${skillName}`, Prefab, (err, prefab) => {
                const skillNode = instantiate(prefab)
                skillNode.setParent(targetPokemon.node)
                skillNode.setPosition(0, 0, 0)
                const skill = skillNode.getComponentInChildren(Skill)
                const res = targetPokemon.getHit(skill.type, skill.power)
                if (!res) {
                    if (this.enemy == targetPokemon) {
                        this.scheduleOnce(this.finished, 1)
                    } else {
                        if (this.index < TeamManager.getInstance().getPokemons().length) {
                            this.scheduleOnce(this.dead, 1)
                        } else {
                            this.scheduleOnce(this.failed, 1)
                        }
                    }
                }
            })
        } else {

        }
    }

    dead() {
        if (this.index < TeamManager.getInstance().getPokemons().length) {
            resources.load(`pokemon/${TeamManager.getInstance().getPokemons()[this.index]}`, Prefab, (err, prefab) => {
                this.index++
                const playerNode = instantiate(prefab)
                playerNode.setParent(this.playerParent)
                this.player = playerNode.getComponent(Pokemon)
                this.scheduleOnce(this.playerAction, 1)
            })
        }
    }

    finished() {
        director.loadScene("map")
    }

    failed() {
        director.loadScene("map")
    }
}


