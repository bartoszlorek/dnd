import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {

    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.state = {
            delayed: false
        }
    }

    handleInput(e) {
        this.props[
            this.state.delayed
            ? 'setDelayedValue'
            : 'setValue'
        ](e.target.value);
    }

    handleCheck(e) {
        this.setState({ delayed: e.target.checked });
    }

    render() {
        return (
            <div>
                <input
                    type='text'
                    value={this.props.value}
                    onChange={this.handleInput}
                />
                <label>
                    <input
                        type='checkbox'
                        onChange={this.handleCheck}
                    />
                    {' delayed'}
                </label>
            </div>
        );
    }
    
}

function setValue(value) {
    return {
        type: 'SET_VALUE',
        value
    }
}
function setDelayedValue(value) {
    return dispatch => {
        setTimeout(() => {
            dispatch(setValue(value));
        }, 1000);
    }
}
const mapStateToProps = (state) => {
    return {
        value: state.value
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setValue: (value) => dispatch(setValue(value)),
        setDelayedValue: (value) => dispatch(setDelayedValue(value))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);