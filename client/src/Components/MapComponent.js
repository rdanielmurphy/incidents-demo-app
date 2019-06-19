import React, { Component } from 'react';
import './MapComponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapComponent extends Component {
    constructor() {
        super()
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
            </Map>
        );
    }
}

export default MapComponent;