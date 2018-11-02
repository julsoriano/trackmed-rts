import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface ICounterState {
    currentCount: number;
}

export class Counter extends React.Component<RouteComponentProps<{}>, ICounterState> {
    constructor(props:any) {
        super(props);
        this.state = { currentCount: 0 };
    }

    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <strong>{ this.state.currentCount }</strong></p>

            <button onClick={this.incrementCounter}>Increment</button>
        </div>;
    }

    private incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}
