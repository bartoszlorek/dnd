import React from 'react';

class NodeProvider extends React.Component {
    render() {
        let rules = this.props.rules;
        return (
            <div>
                {React.Children.map(this.props.children, child => {
                    let rule = rules && rules[child.props.name] || null;
                    return rule !== null ? React.cloneElement(child, { rule }) : child;
                })}
            </div>
        );
    }
}

NodeProvider.propTypes = {
    rules: React.PropTypes.object
};

NodeProvider.defaultProps  = {
    rules: null
};

export default NodeProvider;