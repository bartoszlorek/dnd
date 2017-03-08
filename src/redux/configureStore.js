import { createStore, applyMiddleware } from 'redux';
import resolveRules from '../lib/resolveRules';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const logger = createLogger();

export default function configureStore(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(
            thunk,
            resolveRules,
            logger
        )
    )
}