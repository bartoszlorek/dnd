import { createStore, applyMiddleware } from 'redux';
import { resolveRules } from '../components/Node';
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