import {enqueueSetState} from './set-state-queue';

export class Component {
    constructor(props = {}) {
        // @ts-ignore
        this.isReactComponent = true;
        // @ts-ignore
        this.state ={};
        // @ts-ignore
        this.props = props;
    }

    setState(stateChange) {
        enqueueSetState(stateChange, this);
    }
}
