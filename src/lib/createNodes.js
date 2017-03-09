import React from 'react';
import Node from './Node';

function createNodes(rules) {
    if (typeof rules !== 'object' && rules !== null) {
        rules = {};
    }
    return class extends React.Component {
        render() {
            return <Node rule={rules[this.props.name]} {...this.props} />
        }
    }
}

export default createNodes;