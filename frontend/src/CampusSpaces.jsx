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

    componentDidMount = () => {
        fetch('/api/locations', {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({locations: responseJSON, loading: false}));
        fetch('/api/items/' + this.state.currentLocation, {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({items: responseJSON, loading: false}));
    }

    // Makes a lot of reads on firebase?
    updateItems = async (location) => {
        this.setState({loading: true});
        fetch('/api/items/' + location, {method: 'GET'})
        .then(response => response.json())
        .then(responseJSON => this.setState({currentLocation: location, items: responseJSON, loading: false}));
    }

    render() {
        const locations = this.state.locations;
        const locationsDropdown = 
            locations.map((location, key) => 
                <option key={key} value={location.location}>{location.location}</option>
            );

        return (
            <div className="App">
                <div className="currentUser">
                    <h1>Current User:</h1>
                    {this.props.currentUser}
                </div>

                <div className="locationSelect">
                    <h1>Select Location:</h1>
                    <select onChange={(e) => this.updateItems(e.currentTarget.value)}>
                        {locationsDropdown}
                    </select>
                </div>

                <h1>List of available things in {this.state.currentLocation}:</h1>
                {this.state.loading ? "Loading..." : 
                    this.state.items.length === 0 ? "No items listed!" : 
                    <ItemListings data={this.state.items}/>}

                <h1>Add an item to {this.state.currentLocation}:</h1>
                <AddItem 
                    username={this.props.currentUser}
                    location={this.state.currentLocation}
                    updateItems={(i) => this.setState({items: i})}
                />
            </div>
        );
    }
}

export default CampusSpaces;
