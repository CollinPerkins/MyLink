import React from 'react';
import { connect } from 'react-redux';
import * as counterActions  from '../store/Actions/CounterActions';
import { bindActionCreators } from 'redux'

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.props.counter.count}</strong></p>

                <button className="btn btn-primary" onClick={this.props.increment}>Increment</button>

                <button className="btn btn-primary" onClick={this.props.decrement}>Decrement</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({ ...counterActions }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);