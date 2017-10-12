import React from 'react';
import EventManager from '../../events/EventManager';
import anime from 'animejs';
import AnimeAnims from '../configs/AnimeAnims';

export default class DialogueBox extends React.Component {

    constructor(props) {

        super(props);

        this.pendingState = {
            name: '',
            text: ''
        };

        this.state = {
            name: '',
            text: ''
        };

        this.animationInProgress = false;

        EventManager.Register('onChatStart', this.onChatStart.bind(this));
        EventManager.Register('onChatUpdate', this.onChatUpdate.bind(this));
        EventManager.Register('onChatExit', this.onChatExit.bind(this));

    }

    componentDidMount() {

        anime(AnimeAnims.startHidden);

        this.startFade = anime(AnimeAnims.fadeIn);
        this.endFade = anime(AnimeAnims.fadeOut);

        this.fadeIn = anime(AnimeAnims.fadeIn);
        this.fadeOut = anime(AnimeAnims.fadeOut);

        this.fadeIn.complete = this.onFadedIn.bind(this);
        this.fadeOut.complete = this.onFadedOut.bind(this);

    }

    // Start / Finish
    onChatStart(args) {

        this.setState({
            name: args[0],
            text: args[1],
        });

        this.startFade.play();

    }

    onChatExit() {

        this.endFade.play();

    }

    // Singular events
    // Continuous
    onChatUpdate(args) {

        this.pendingState.name = args[0];
        this.pendingState.text = args[1];

        // If another request comes in, make sure to honour the data change (don't wait for anims)
        if (this.animationInProgress) {
            this.setState({
                name: this.pendingState.name,
                text: this.pendingState.text
            });
            this.animationInProgress = false;
            return;
        }

        this.animationInProgress = true;
        this.fadeOut.restart();
        this.fadeOut.play();

    }

    // Continuous events
    onFadedOut() {

        this.setState({
            name: this.pendingState.name,
            text: this.pendingState.text
        });

        this.fadeIn.restart();
        this.fadeIn.play();

    }

    onFadedIn() {

        this.animationInProgress = false;

    }

    // React render method (stick your templates here)
    render() {
        return (
            <div>
                <div className="ff7">
                    <p>{this.state.name}</p>
                    <p>{this.state.text}</p>
                </div>
            </div>
        );
    }

}