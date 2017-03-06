import { combineReducers } from 'redux';
import nodeReducer from '../lib/nodeReducer';

const inputInitial = {
    value: ''
}

function input(state = inputInitial, action) {
    if (action.type === 'SET_VALUE')
        state.value = action.value;
    return state;
}

const reducers = combineReducers({
    nodes: nodeReducer,
    input
});

export default reducers;