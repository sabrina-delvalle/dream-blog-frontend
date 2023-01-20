import React, { Component } from 'react';

class ImageComponent extends Component {
    constructor(props){
        super(props);
        this.state = {image: localStorage.getItem('image')}
    }
    render() {
        return (
            <div>
                <img src={this.state.image} alt="user profile" className="profile-img2" width='80px'/>
            </div>
        );
    }
}

export default ImageComponent;