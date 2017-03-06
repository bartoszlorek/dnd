
function nodeReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_NODE':
            let name = action.node.name,
                node = state.find(node => node.name === name);
            if (typeof node !== 'undefined')
                throw `Node with given name '${name}' already exists`;
            return [...state, action.node];

        case 'REMOVE_NODE':
            return state.filter(node => node.name !== action.name);

        case 'ACTIVATE_NODE':
        case 'DEACTIVATE_NODE':
            let nodes = [...state];
            for (let i=0, len=nodes.length; i<len; i++) {
                if (nodes[i].name === action.name) {
                    nodes[i] = Object.assign({}, nodes[i], {
                        active: action.type === 'ACTIVATE_NODE'
                    });
                    return nodes;
                }
            }
            return state;

        default:
            return state;
    }

    return state;
}

export default nodeReducer;