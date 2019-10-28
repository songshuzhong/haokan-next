import { action, observable } from 'mobx'

export class Store {
    @observable video = [];
    @observable lastUpdate = 0;
    @observable light = false;
    @observable status = '';
    @observable results = null;

    constructor (lastUpdate = 0) {
        this.lastUpdate = lastUpdate
    }

    @action
    public increase() {
        this.lastUpdate ++;
    }
    @action
    public decrease() {
        this.lastUpdate --;
    }
}
