import React, { Component } from 'react';
import './MapComponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import IncidentsService from '../Services/IncidentsService';
import CircularProgress from '@material-ui/core/CircularProgress';

const KeyValueDisplay = ({ data }) =>
    Object.entries(data).map(([k, v]) => {
        if (typeof v === 'object') {
            return (
                <KeyValueDisplay key={k} data={v} />
            )
        }
        return (
            <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
            </tr>
        )
    });

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 37.5,
            lng: -77.5,
            zoom: 10,
            incident: null,
            loaded: false
        }

        IncidentsService.getIncident(this.props.match.params.i).then((incident) => {
            this.setState({
                lat: incident.address.latitude,
                lng: incident.address.longitude,
                zoom: 16,
                incident: incident,
                loaded: true
            });
        });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div className="loading">
                    <h2> Loading ... </h2>
                    <CircularProgress size={100} />
                </div>
            );
        }
        else {
            const position = [this.state.lat, this.state.lng];
            return (
                <div>
                    <Map center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={position}>
                            <Popup>
                                {this.state.incident.address.address_line1}
                                <br />
                                {this.state.incident.address.city + ", " + this.state.incident.address.state}
                            </Popup>
                        </Marker>
                    </Map>
                    <div className="details">
                        <h3>Description</h3>
                        <table>
                            <tbody>
                                <KeyValueDisplay data={this.state.incident.description} />
                            </tbody>
                        </table>
                        <h3>Fire Department</h3>
                        <table>
                            <tbody>
                                <KeyValueDisplay data={this.state.incident.fire_department} />
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default MapComponent;