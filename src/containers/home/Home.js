import React, {Component} from "react";

import "./home.css";

export default class Home extends Component {
    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h3 className="display-4">React/Redux MediaMonks exercise</h3>
                        <div>
                            <a href="https://github.com/fernandocortes10/mediamonks/blob/master/README.md" target="_blank" rel="noopener noreferrer">Read me</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
