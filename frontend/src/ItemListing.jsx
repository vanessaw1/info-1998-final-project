import React, {Component} from 'react';
import './App.css';

class ItemListing extends Component {
    
    checkoutItem = async (checkoutTo) => {
        const resp = await fetch(`/api/items/${this.props.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id,
                checkedOut: checkoutTo
            })
        });
        const text = await resp.text();
        if (text !== 'updated') {
            throw new Error(`Error: ${text}`);
        }
        this.props.updateItem(this.props.id, checkoutTo);
    };

    deleteItem = async id => {
        const resp = await fetch(`/api/items/${id}`, {method: 'DELETE'});
        const text = await resp.text();
        if (text !== 'deleted') {
            throw new Error(`Error: ${text}`);
        }
        this.props.deleteItem(this.props.id);
    };

    render() {
        const {currentUser, id, username, item, description, checkedOut} = this.props;
        return (
            <div className="ItemListing">
                {/* <div>
                    Id: {id}
                </div> */}
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
                    Checked out by: {checkedOut ? checkedOut : "No One"}
                </div>
                {this.props.updateItem &&
                    <>
                        {(checkedOut === null) && <button onClick={() => this.checkoutItem(currentUser)}>Checkout Item</button>}
                        {(checkedOut === currentUser) && <button onClick={() => this.checkoutItem(null)}>Return Item</button>}
                        {(checkedOut !== null && checkedOut !== currentUser) && <button disabled>Checked Out</button>}
                    </>
                }
                {this.props.deleteItem && (
                    checkedOut === null ? 
                        <button onClick={() => this.deleteItem(this.props.id)}>Remove Item</button> :
                        <button disabled>Item Is Checked Out</button>
                    )
                }
            </div>
        );
    }
}

export default ItemListing;