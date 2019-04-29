import React, {Component} from 'react';
import './App.css';

class ItemListing extends Component {
    render() {
        const {username, item, description, checkedOut} = this.props;
        return (
            <div className="ItemListing">
                <div>
                    Username: {username}
                </div>
                <div>
                    Item: {item}
                </div>
                <div>
                    Description: {description}
                </div>
                <div>
                    Is it checked out?: {checkedOut ? "Yes" : "No"}
                </div>

            </div>
        );
    }
}

export default ItemListing;