import React, {Component} from "react";
import GitHubButton from 'react-github-btn';

class GistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            gists: [],
            error: null,
        }
    }

    componentDidMount() {
        fetch("https://api.github.com/users/slukes/gists")
            .then(res => res.json())
            .then(result => {

                    this.setState({
                        loaded: true,
                        gists: result.slice(0, 3)
                    })
                },
                error => {
                    this.setState({
                        loaded: true,
                        error
                    });
                });
    }

    render() {
        const {error, loaded, gists} = this.state;
        if (error) {
        }

        if (!loaded) {
            return <p>Loading ... </p>
        }

        return (
            <ul>
                {gists.map(data => <Gist gistData={data}/>)}
            </ul>
        );
    }
}

function Gist(props) {
    return (
        <li key={props.gistData.id}>{JSON.stringify(props.gistData)}</li>
    )
}

class Github extends Component {
    render() {
        return (
            <section>
                <GitHubButton href="https://github.com/slukes" data-size="large" data-show-count="true" aria-label="Follow @slukes on GitHub">Follow @slukes</GitHubButton>
                <GistList/>
            </section>
        )
    }
}

export default Github;
