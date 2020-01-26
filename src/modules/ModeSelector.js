import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const OWNER_MODE = 1
const RENTEE_MODE = 2
const CATEGORY_MODE = 3

class ModeSelector extends React.Component {
    render() {
        return (
            <div>
                <FormControl 
                style={{
                    width: '100%',
                    alignContent: 'center',
                    marginBottom: '20px',
                    backgroundColor: 'white',
                    opacity: '1',
                    paddingTop: '10px',
                    paddingBottom: '10px'
                }} 
                component="fieldset">
                <RadioGroup 
                    style={{
                        display:"inline-block",
                        textAlign:"center",
                    }}
                    aria-label="position" 
                    name="position" 
                    value={this.props.mode} 
                    onChange={this.props.handleChangeMode} row>
                    <FormControlLabel
                        value={OWNER_MODE}
                        control={<Radio color="primary" />}
                        label="View my items"
                        labelPlacement="top"
                        checked={this.props.mode == OWNER_MODE}
                    />
                    <FormControlLabel
                        value={RENTEE_MODE}
                        control={<Radio color="primary" />}
                        label="View my rents"
                        labelPlacement="top"
                        checked={this.props.mode == RENTEE_MODE}
                    />
                    <FormControlLabel
                        value={CATEGORY_MODE}
                        control={<Radio color="primary" />}
                        label="View all items"
                        labelPlacement="top"
                        checked={this.props.mode == CATEGORY_MODE}
                    />
                </RadioGroup>
                </FormControl>
            </div>
          );
    }
}

export default ModeSelector