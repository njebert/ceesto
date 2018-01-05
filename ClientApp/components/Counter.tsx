import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

type CounterProps =
    CounterStore.CounterState
    & typeof CounterStore.actionCreators
    & RouteComponentProps<{}>;

class Counter extends React.Component<CounterProps, {}> {
    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{this.props.count}</strong></p>
            {this.props.lastPressed != null &&
                <p>Last pressed: <strong>{this.props.lastPressed}</strong></p>
            }
            <button onClick={() => { this.props.increment() }}>Increment</button>
            <button onClick={() => { this.props.decrement() }}>Decrement</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    (state: ApplicationState) => state.counter, // Selects which state properties are merged into the component's props
    CounterStore.actionCreators                 // Selects which action creators are merged into the component's props
)(Counter) as typeof Counter;