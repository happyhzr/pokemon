import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum ItemType {
    None,
    Health,
}

export class Item {
    itemID: number
    itemName: string
    type: ItemType
    power: number
    count: number = 1
}


export class ItemManager {
    private static instance: ItemManager
    itemMap = new Map<number, Item>()

    static getInstance() {
        if (ItemManager.instance == null) {
            ItemManager.instance = new ItemManager()
        }
        return ItemManager.instance
    }

    constructor() {
        let item = new Item()
        item.itemID = 1
        item.itemName = "Potion"
        item.type = ItemType.Health
        item.power = 20
        item.count = 1
        this.itemMap.set(item.itemID, item)
    }
}

export class InventoryManager {
    private static instance: InventoryManager
    itemMap = new Map<number, Item>()

    static getInstance() {
        if (InventoryManager.instance == null) {
            InventoryManager.instance = new InventoryManager()
        }
        return InventoryManager.instance
    }

    getItem(itemID: number) {
        if (this.itemMap.has(itemID)) {
            return this.itemMap.get(itemID)
        }
        return null
    }

    addItem(itemID: number) {
        let item = this.getItem(itemID)
        if (item == null) {
            let newItem = ItemManager.getInstance().itemMap.get(itemID)
            if (newItem) {
                this.itemMap.set(itemID, newItem)
            }
        } else {
            item.count++
        }
    }

    removeItem(itemID: number) {
        let item = this.getItem(itemID)
        if (item == null) {
            return false
        }
        if (item.count > 0) {
            item.count--
            if (item.count == 0) {
                this.itemMap.delete(itemID)
            }
            return true
        }
    }
}

