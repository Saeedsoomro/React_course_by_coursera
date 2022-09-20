import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './prommotaions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk'
import logger from 'redux-logger' 
import { applyMiddleware } from 'redux';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}