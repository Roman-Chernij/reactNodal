import React, { Component } from 'react';

import { v4 } from 'uuid';

import WithStyles from './components/popup/Popup'

import './App.css';


class App extends Component {

    state = {
        status: true,
        choice: [
            {
                id: v4(),
                value: 2,
                number: 22
            },
            {
                id: v4(),
                value: 3,
                number: 12
            },
            {
                id: v4(),
                value: 4,
                number: 4
            }]
    };

    handleChoice = (stat) => {
        this.setState({status: stat})
    };

    render() {
        const item = [
            {
                title: 'None',
                value: 1
            },
            {
                title: 'Ten',
                value: 2
            },
            {
                title: 'Twenty',
                value: 3
            },
            {
                title: 'Thirty',
                value: 4
            }];
        return (
            <div className="App">
                <WithStyles
                    item={item}
                    stat={this.handleChoice}
                    def={this.state.choice}
                    ch={this.choiceChange}
                />
            </div>
        );
    }

    choiceChange = obj => this.setState({choice: obj});
}

export default App;