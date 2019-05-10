import React, {Component} from 'react';
import './App.css';
import ItemListing from './ItemListing';

class ItemListings extends Component {
    render() {
        const {data, currentUser, updateItem, deleteItem} = this.props;
        const items = data.map((item, key) => 
            <ItemListing 
                key = {key}
                currentUser = {currentUser}
                id = {item.id}
                username={item.username}
                item={item.item}
                description={item.description}
                checkedOut={item.checkedOut}
                updateItem={updateItem}
                deleteItem={deleteItem}
            />
        );

        return (
        <div className="ItemListings">
            {items}
        </div>
        );
    }
}

export default ItemListings;