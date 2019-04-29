import React, {Component} from 'react';
import './App.css';
import ItemListing from './ItemListing';

class ItemListings extends Component {
    render() {
        const {data} = this.props;
        const items = data.map((item, key) => 
            
                <ItemListing 
                    key = {key}
                    username={item.username}
                    item={item.item}
                    description={item.description}
                    checkedOut={item.checkedOut}
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