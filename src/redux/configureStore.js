import {createStore} from 'redux';
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    console.log('this is configure store')
    const store = createStore(
        Reducer, // reducer
        initialState, // our initialState
    );

    return store;
}