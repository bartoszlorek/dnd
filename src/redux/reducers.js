import { combineReducers } from 'redux';
import { nodeReducer } from '../components/Node';

function input(state = {}, action) {
    if (action.type === 'SET_VALUE') {
        state.value = action.value;
    }
    return state;
}

const reducers = combineReducers({
    nodes: nodeReducer,
    input
});

export default reducers;