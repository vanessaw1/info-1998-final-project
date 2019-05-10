
import React, { Component } from 'react';
import './App.css';
import ItemListings from './ItemListings';
import AddItem from './AddItem';

class CampusSpaces extends Component {
    state = {
        items: [],
        locations: [],
        loading: true,
        currentLocation: "duffield"
    }

    componentDidMount() {
        fetch('/api/locations', {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({locations: responseJSON, loading: false}));
        // itemsCollection().onSnapshot((snapshot) => {
        //     const items = snapshot.docs.map(doc => ({userId: doc.userId, ...doc.data()}));
        //     console.log(items);
        //     this.setState({ items : items });
        // });
        fetch('/api/items/location/' + this.state.currentLocation, {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({items: responseJSON, loading: false}));
    }

    // Makes a lot of reads on firebase?
    changeLocation = async (location) => {
        this.setState({loading: true});
        fetch('/api/items/location/' + location, {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({currentLocation: location, items: responseJSON, loading: false}));
    }

    render() {
        const locations = this.state.locations;
        const locationsDropdown = 
            locations.map((location, key) => 
                <option key={key} value={location.location}>{location.location}</option>
            );

        const userItems = this.state.items.filter(item => (item.username === this.props.currentUser));
        const otherItems = this.state.items.filter(item => (item.username !== this.props.currentUser));

        return (
            <div className="App">
                <div className="currentUser">
                    <h1>Current User:</h1>
                    {this.props.currentUser}
                    <button onClick={this.props.logout}>Logout</button>
                </div>

                <div className="locationSelect">
                    <h1>Select Location:</h1>
                    <select onChange={(e) => this.changeLocation(e.currentTarget.value)}>
                        {locationsDropdown}
                    </select>
                </div>

                <h1>List of available things in {this.state.currentLocation}:</h1>
                {this.state.loading ? "Loading..." : 
                    otherItems.length === 0 ? "No items listed!" : 
                    <ItemListings 
                        data={otherItems}
                        currentUser={this.props.currentUser}
                        updateItem={(id, checkedOutBy) => this.setState(prevState => ({
                            items: prevState.items.map(item => (item.id === id ? { ...item, checkedOut: checkedOutBy } : item))
                        }))}
                        deleteItem={null}
                    />}

                <h1>List of your things in {this.state.currentLocation}:</h1>
                {this.state.loading ? "Loading..." : 
                    userItems.length === 0 ? "No items listed!" : 
                    <ItemListings 
                        data={userItems}
                        currentUser={this.props.currentUser}
                        updateItem={null}
                        deleteItem={(id) => this.setState(prevState => ({
                            items: prevState.items.filter(item => (item.id !== id))
                        }))}
                    />}

                <h1>Add an item to {this.state.currentLocation}:</h1>
                <AddItem 
                    username={this.props.currentUser}
                    location={this.state.currentLocation}
                    updateItems={(i) => this.setState(prevState => ({items: [i, ...prevState.items]}))}
                />
            </div>
        );
    }
}

export default CampusSpaces;
