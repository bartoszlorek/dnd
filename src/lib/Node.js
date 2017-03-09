import React from 'react';
import { connect } from 'react-redux';

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
            <div>{this.props.children}</div>
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