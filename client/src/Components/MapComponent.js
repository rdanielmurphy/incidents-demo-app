import React, { Component } from 'react';
import './MapComponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import IncidentsService from '../Services/IncidentsService';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnrichService from '../Services/EnrichService';
import Paper from '@material-ui/core/Paper';

function keyToTitle(key) {
    return key.toLowerCase()
        .split('_')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}

const KeyValueDisplay = ({ data }) =>
    Object.entries(data).map(([k, v]) => {
        if (typeof v === 'object') {
            return (
                <KeyValueDisplay key={k} data={v} />
            )
        }
        return (
            <tr key={k}>
                <td width="30%"><b>{keyToTitle(k)}</b></td>
                <td>{v}</td>
            </tr >
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
            loaded: false,
            weather: {}
        }
    }

    componentDidMount() {
        const scope = this;
        IncidentsService.getIncident(this.props.match.params.i).then((incident) => {
            EnrichService.getWeather(incident.address.latitude, incident.address.longitude, incident.description.event_opened).then((weather) => {
                console.log(weather);
                scope.setState({
                    lat: incident.address.latitude,
                    lng: incident.address.longitude,
                    zoom: 16,
                    incident: incident,
                    loaded: true,
                    weather: weather
                });
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
                    <Paper className="details">
                        <h3>Description</h3>
                        <table>
                            <tbody>
                                <KeyValueDisplay data={this.state.incident.description} />
                                <tr>
                                    <td><b>Forecast</b></td>
                                    <td>{this.state.weather.currently.summary}<img alt="weather" src={this.state.weather.icon}></img></td>
                                </tr>
                                <tr>
                                    <td><b>Temperature</b></td>
                                    <td>{this.state.weather.currently.temperature}</td>
                                </tr>
                                <tr>
                                    <td><b>Probability of percipitation</b></td>
                                    <td>{this.state.weather.currently.precipProbability + "%"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>Fire Department</h3>
                        <table>
                            <tbody>
                                <KeyValueDisplay data={this.state.incident.fire_department} />
                            </tbody>
                        </table>
                    </Paper>
                </div>
            );
        }
    }
}

export default MapComponent;