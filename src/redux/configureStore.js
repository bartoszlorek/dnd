import { createStore, applyMiddleware } from 'redux';
import resolveRules from '../lib/resolveRules';
import createLogger from 'redux-logger';
import reducers from './reducers';

const logger = createLogger();

export default function configureStore(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(
            resolveRules,
            logger
        )
    )
}