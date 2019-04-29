import React, {Component} from 'react';
import './App.css';

class AddItem extends Component {

    state = {
        item: "",
        description: ""
    }

    handleSubmit = async e => {
        this.setState({loading: true});
        e.preventDefault();
        const resp = await fetch('/api/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                item: this.state.item,
                description: this.state.description,
                location: this.props.location,
                checkedOut: false
            })
        });
        const items = await resp.text();
        console.log(items);
        this.props.updateItems(items);
    };

    render() {
        return (
            <div className="AddItem">
                <form onSubmit={this.handleSubmit}>
                    Item:
                    <input 
                        type="text" 
                        value={this.item} 
                        onChange={(e) => this.setState({item: e.target.value})}
                    />
                    Description:
                    <input 
                        type="text" 
                        value={this.description} 
                        onChange={(e) => this.setState({description: e.target.value})}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AddItem;