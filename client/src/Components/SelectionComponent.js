import React, { Component } from 'react';
import './SelectionComponent.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

class SelectionComponent extends Component {
    render() {
        return (
            <div>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    Incident Selection
                </InputLabel>
                <Select
                    name="file"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </div>
        );
    }
}

export default SelectionComponent;