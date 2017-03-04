import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.setValue(e.target.value);
    }

    render() {
        return (
            <input
                onChange={this.handleChange}
                value={this.props.value}
            />
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        value: state.value
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setValue: (value) => dispatch({
            type: 'SET_VALUE',
            value
        })
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);