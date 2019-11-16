import React, {useEffect} from 'react';
import {Layout} from '../src/components/lib/layout';

const createStore = reducer => {
    let currentStore = reducer(undefined, {});
    let listeners = [];

    return {
        getStore: () => currentStore,
        dispatch: action => {
            currentStore = reducer(currentStore, action);
            listeners.forEach(listener => listener());
        },
        subscribe: listener => listeners.push(listener)
    };
};
const initialState = {count: 0};
const actions = {
    increase: {type: 'INCREASE'},
    decrease: {type: 'DECREASE'}
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.decrease.type:
            return {count: state.count - 1};
        case actions.increase.type:
            return {count: state.count + 1};
        default:
            return state;
    }
};
const Redux = () => {
    const store = createStore(reducer);
    useEffect(() => {
        document
            .getElementById('increase')
            .addEventListener('click', () => store.dispatch(actions.increase));
        document
            .getElementById('decrease')
            .addEventListener('click', () => store.dispatch(actions.decrease));
        store.subscribe(() => {
            document.getElementById('count').innerText = store.getStore().count;
        });
    }, []);
    return (
        <Layout>
            <h1 id='count'>{initialState.count}</h1>
            <h1 id='increase'>+</h1>
            <h1 id='decrease'>-</h1>
        </Layout>
    );
};

export default Redux;