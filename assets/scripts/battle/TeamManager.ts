import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class TeamManager {
    private static instance: TeamManager

    private pokemons: number[] = [1]

    static getInstance() {
        if (!TeamManager.instance) {
            TeamManager.instance = new TeamManager();
        }
        return TeamManager.instance;
    }

    addPokemon(pokemonID: number) {
        if (this.pokemons.length < 6) {
            this.pokemons.push(pokemonID);
            return true
        }
        return false
    }

    removePokemon(pokemonID: number) {
        const index = this.pokemons.indexOf(pokemonID);
        if (index > -1) {
            this.pokemons.splice(index, 1);
            return true
        }
        return false
    }

    getPokemons() {
        return this.pokemons;
    }
}