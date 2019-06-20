import React, { Component } from 'react';
import './MapComponent.css';
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import IncidentsService from '../Services/IncidentsService';
import CircularProgress from '@material-ui/core/CircularProgress';
import EnrichService from '../Services/EnrichService';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

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

const ApparatusStatusDisplay = ({ data }) =>
    Object.entries(data.unit_status).map(([k, v]) => {
        return <Marker color="red" position={[v.latitude, v.longitude]}>
            <Popup>
                {data.unit_type + " " + data.unit_id}
                <br />
                {k + " at " + v.timestamp}
            </Popup>
        </Marker>
    });

const ApparatusRouteDisplay = ({ data }) => {
    let positions = [];
    let statuses = [];

    Object.entries(data.unit_status).map(([k, v]) => {
        statuses.push(v);
    });

    statuses.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    statuses.map((v) => {
        positions.push([v.latitude, v.longitude]);
    });

    return <Polyline positions={positions} />;
}

class MapComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: 37.5,
            lng: -77.5,
            zoom: 10,
            incident: null,
            loaded: false,
            weather: {},
            apparatus: undefined
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
                    weather: weather,
                    apparatus: undefined
                });
            });
        });
    }

    handleListItemClick(e, obj) {
        if (this.state.apparatus && this.state.apparatus.car_id === obj.car_id) {
            this.setState({
                apparatus: null
            });
        } else {
            this.setState({
                apparatus: obj
            });
        }
    }

    render() {
        const scope = this;
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
                        {(() => {
                            if (this.state.apparatus) {
                                return (
                                    <ApparatusStatusDisplay data={this.state.apparatus} />
                                )
                            }
                        })()}
                        {(() => {
                            if (this.state.apparatus) {
                                return (
                                    <ApparatusRouteDisplay data={this.state.apparatus} />
                                )
                            }
                        })()}
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
                        <h3>Apparatuses (Click to see route)</h3>
                        <List component="nav" aria-label="Main mailbox folders">
                            {this.state.incident.apparatus.map((object, i) => {
                                return (
                                    <ListItem
                                        button
                                        onClick={event => scope.handleListItemClick(event, object)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={this.state.apparatus && this.state.apparatus.car_id === object.car_id ? true : false}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={object.unit_type + " " + object.unit_id} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Paper>
                </div>
            );
        }
    }
}

export default MapComponent;