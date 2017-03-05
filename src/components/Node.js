import React from 'react';
import { connect } from 'react-redux';
import 'babel-polyfill';

export function nodeReducer(state = [], action) {
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

export function resolveRules({ getState, dispatch }) {
    return (next) => (action) => {
        let state = next(action),
            nodes,
            nodesLength,
            activeState = {};

        // don't resolve own actions (infinity loop)
        if (action.type === 'ACTIVATE_NODE'
        ||  action.type === 'DEACTIVATE_NODE') {
            return state;
        }

        nodes = getState().nodes;
        if (typeof nodes === 'undefined')
            throw "combine nodeReducer under 'nodes' key";
        nodesLength = nodes.length;

        // first resolve tests
        for (let i=0; i<nodesLength; i++) {
            let { name, test } = nodes[i];
            activeState[name] = typeof test === 'function'
                ? test(getState()) === true : false;
        }

        // then check dependencies
        for (let i=0; i<nodesLength; i++) {
            let { name, deps, strict } = nodes[i],
                required = deps.length,
                success = 0;

            if (activeState[name] || required === 0) {
                continue;
            }
            for (let j=0; j<required; j++) {
                if (activeState[deps[j]] === true) {
                    success ++;
                }
            }
            if (strict && success === required
            || !strict && success > 0) {
                activeState[name] = true;
            }
        }

        // and dispatch changes
        for (let i=0; i<nodesLength; i++) {
            let { name, active } = nodes[i];

            if (active === activeState[name]) {
                continue;
            }
            dispatch({
                type: !active
                    ? 'ACTIVATE_NODE'
                    : 'DEACTIVATE_NODE',
                name
            })
        }
        return state;
    }
}

class Node extends React.Component {

    componentDidMount() {
        let { actions, name, rule, strict, deps, test } = this.props,
            defs = Node.defaultProps;

        if (name === '') {
            throw "the prop 'name' must be specified as a unique string";
        }
        if (typeof rule === 'object' && rule !== null) {
            strict = defs.strict === strict && rule.strict || strict;
            deps = defs.deps === deps && rule.deps || deps;
            test = defs.test === test && rule.test || test;
        }
        actions.addNode({ name, strict, deps, test, active: false });
    }

    componentWillUnmount() {
        let { actions, name } = this.props;
        actions.removeNode(name);
    }

    render() {
        if (!this.props.active) {
            return null;
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const ruleObject = {
    strict: React.PropTypes.bool,
    deps: React.PropTypes.array,
    test: React.PropTypes.func
}
Node.propTypes = Object.assign({
    name: React.PropTypes.string.isRequired,
    rule: React.PropTypes.shape(ruleObject)
}, ruleObject);

Node.defaultProps = {
    rule: null,
    test: null,
    strict: false,
    deps: []
}
const mapStateToProps = (state, ownProps) => {
    if (typeof state.nodes === 'undefined') {
        throw "combine nodeReducer under 'nodes' key";
    }
    let node = state.nodes.find(node =>
        node.name === ownProps.name);
    return { active: node && node.active }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            addNode: (node) => dispatch({
                type: 'ADD_NODE',
                node
            }),
            removeNode: (name) => dispatch({
                type: 'REMOVE_NODE',
                name
            })
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Node);