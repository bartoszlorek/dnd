import getActiveState from './getActiveState';

function isEmpty(obj) {
    if (obj == null) return true;
    if (Object.keys(obj).length === 0)
        return true;
    return false;
}

function resolveRules({ getState, dispatch }) {
    return (next) => (action) => {
        let result = next(action),
            state = getState(),
            nodes;

        if (isEmpty(state)) {
            return result;
        }

        // don't resolve own actions (infinity loop)
        if (action.type === 'ACTIVATE_NODE'
        ||  action.type === 'DEACTIVATE_NODE') {
            return result;
        }

        nodes = getActiveState(state);
        for (let name in nodes) {
            if (nodes[name] === null) {
                continue;
            }
            dispatch({
                type: nodes[name]
                    ? 'ACTIVATE_NODE'
                    : 'DEACTIVATE_NODE',
                name
            })
        }

        return result;
    }
}

export default resolveRules;