import { _decorator, Animation, CCString, Component, Node, Enum, CCInteger, tween, Vec3, v3 } from 'cc';
const { ccclass, property } = _decorator;

export enum PokemonType {
    Fire,
    Water,
}

@ccclass('Pokemon')
export class Pokemon extends Component {
    @property({ type: Enum(PokemonType) })
    type: PokemonType
    @property({ type: CCString })
    pokemonName: string = ""
    @property({ type: CCInteger })
    maxHP: number = 0
    @property({ type: CCInteger })
    attack: number = 0
    @property({ type: CCInteger })
    speed: number = 0
    HP: number = 0

    private ani: Animation;

    @property({ type: [CCString] })
    skills: string[] = []

    start() {
        this.ani = this.getComponent(Animation)
        this.HP = this.maxHP
        this.node.setScale(new Vec3(0, 0, 1))
        tween(this.node.getScale()).to(1, new Vec3(1, 1, 1), {
            onUpdate: (value: Vec3) => {
                this.node.setScale(value)
            }
        }).start()
    }

    update(deltaTime: number) {

    }

    attackPokemon() {
        this.ani.play("attack")
        this.scheduleOnce(() => {
            this.ani.play("idle")
        }, 1)
    }

    getHit(type: PokemonType, value: number) {
        if (this.type == PokemonType.Fire && type == PokemonType.Water) {
            this.HP -= value * 2
        } else {
            this.HP -= value
        }
        if (this.HP <= 0) {
            let pos = this.node.getPosition()
            pos.y -= 100
            tween(this.node.getPosition()).to(1, pos, {
                onUpdate: (value: Vec3) => {
                    this.node.setPosition(value)
                }
            }).start()
        }
    }
}


