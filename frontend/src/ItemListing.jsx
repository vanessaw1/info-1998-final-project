import React, {Component} from 'react';
import './App.css';

class ItemListing extends Component {
    checkoutItem = async e => {
        e.preventDefault();
        const resp = await fetch('/api/items/:id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checkedOut: this.props.username
            })
        });
        // this.props.updateItems(items);
    }

    render() {
        const {id, username, item, description, checkedOut} = this.props;
        return (
            <div className="ItemListing">
                <div>
                    Id: {id}
                </div>
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
                <button onClick={this.checkoutItem}>Checkout Item</button>
                <button onClick={this.removeItem}>Remove Item</button>
            </div>
        );
    }
}

export default ItemListing;