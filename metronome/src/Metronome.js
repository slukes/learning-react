import React, {Component} from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bpm: 120,
            playing: false,
            beatsPerMeasure: 4,
            count: 0
        };

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
        } else {
            this.setTimer();
        }

        this.setState({playing: !this.state.playing, count: 0});
    };

    setTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
    }

    playClick = () => {
        const count = this.state.count;
        const theClick = count === 0 ? this.click2 : this.click1;
        theClick.play()
            .then(() => this.setState({count: ((count + 1) % this.state.beatsPerMeasure)}))
    };

    handleUpdate = event => {
        const bpm = event.target.value;
        this.setTimer();
        this.setState({bpm});
    };


    render() {
        return (
            <div className="metronome">
                <div className="bpmSlider">
                    <div id="bpmSliderLabel">{this.state.bpm} BPM</div>
                    <input id="bpmSliderInput" onChange={this.handleUpdate} type="range" min="0" max="240" value={this.state.bpm}/>
                </div>
                <button onClick={this.startStop}>{this.state.playing ? 'Stop' : 'Start'}</button>
            </div>
        );
    }
}

export default Metronome;
