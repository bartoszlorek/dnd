/**
 * Returns an object where each property represents
 * a pair of node's name and active state:
 * 1. true - node should be activate
 * 2. false - node should be deactivate
 * 3. null - no changes needed
 */  

function getActiveState(state) {
    let nodes = state && state.nodes,
        nodesLength,
        activeState = {};

    if (typeof nodes === 'undefined')
        return activeState;
    nodesLength = nodes.length;

    // resolve tests
    for (let i=0; i<nodesLength; i++) {
        let { name, test } = nodes[i];

        activeState[name] =
              typeof test === 'function'
            ? test(state) === true
            : false;
    }

    // check dependencies
    for (let i=0; i<nodesLength; i++) {
        let { name, deps, strict } = nodes[i],
            required = deps && deps.length || 0,
            success = 0;

        if (activeState[name] || required === 0) {
            continue;
        }
        for (let j = 0; j < required; j++) {
            if (activeState[deps[j]] === true) {
                success++;
            }
        }
        if (strict && success === required
        || !strict && success > 0) {
            activeState[name] = true;
        }
    }

    // compare with previous state
    for (let i=0; i<nodesLength; i++) {
        let { name, active } = nodes[i];
        if (activeState[name] === active) {
            activeState[name] = null;
        }
    }

    return activeState;
}

export default getActiveState;