import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './prommotaions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk'
import logger from 'redux-logger' 
import { applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}