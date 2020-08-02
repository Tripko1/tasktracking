import React, { Component } from "react";
import "./BoardCardItem.css"

class BoardCardItem extends Component {
    render() {
        return (
            <div className="board-list-card-item">
                <div className="board-list-card-item-name">
                    <div><strong>{this.props.name}</strong></div>
                </div>
            </div>
        )
    }
}

export default BoardCardItem;