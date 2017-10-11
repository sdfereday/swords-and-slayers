import React, { Component } from 'react';
import EventManager from '../../events/EventManager';

export default class DialogueBox extends Component {

    constructor(props) {

        super(props);

        this.state = {
            value: null,
        };

        EventManager.Register('onChat', this.onChat.bind(this));

    }

    onChat(str) {

        this.setState({
            value: str
        });

    }

    render() {
        return (
            <div className="ff7">
                <h1>{this.state.value}</h1>
            </div>
        );
    }

}