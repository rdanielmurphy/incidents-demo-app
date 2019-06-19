import React, { Component } from 'react';
import './SelectionComponent.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import IncidentsService from '../Services/IncidentsService';
import Button from '@material-ui/core/Button';

class SelectionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            incidents: [],
            selectionId: ''
        }
    }

    componentDidMount() {
        IncidentsService.getIncidents().then((response) => {
            this.setState({
                incidents: response,
                loaded: true,
                selectionId: ''
            });
        }).catch((e) => {
            console.error('Could not load incidents');
        });
    }

    handleChange(e) {
        this.setState({
            selectionId: e.target.value
        });
    }

    startIncidentClick() {
        if (this.state.selectionId) {
            this.props.history.push('/map/' + this.state.selectionId);
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="selection">
                    <InputLabel>
                        Incident Selection
                    </InputLabel>
                    <Select
                        value={this.state.selectionId}
                        onChange={this.handleChange.bind(this)}
                        name="file">
                        {
                            Object.keys(this.state.incidents).map((key) => <MenuItem key={key} value={key}>{key}</MenuItem>)
                        }
                    </Select>
                    <br></br>
                    <Button onClick={this.startIncidentClick.bind(this)}>Start Incident</Button>
                </div>
            );
        } else {
            return (
                <div className="loading">
                    <h2> Loading ... </h2>
                    <CircularProgress size={100} />
                </div>
            );
        }
    }
}

export default SelectionComponent;