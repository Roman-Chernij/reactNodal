import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles as  WithStyles} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 500
    }
});

function CancelIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </SvgIcon>
    );
}


class DialogSelect extends Component {
    state = {
        id: ''
    };

    handleChange = name => event => {
        const { updateField } = this.props;
        const { id } = this.state;

        updateField({
            id,
            name,
            numd: Number(event.target.value)
        })
    };

    componentWillMount() {
        const { cont } = this.props;
        this.setState({id: cont.id});
    }

    render() {
        const { classes, item, cont, deleteField } = this.props;
        const { id } = this.state;
        return (
            <FormControl
                style={{
                    display:'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                className={classes.formControl}
            >
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={5}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            value={cont.value}
                            onChange={this.handleChange('value')}
                            input={<Input id="age-simple" />}
                        >
                            {
                                item.map((i, index) => i.value === 1 ?
                                    <MenuItem key={index} value={i.value}><em>{i.title}</em></MenuItem>:
                                    <MenuItem key={index} value={i.value}>{i.title}</MenuItem> )
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="number"
                            style={{
                                width: '100%',
                                margin: 0
                            }}
                            value={cont.number}
                            type="number"
                            onChange={this.handleChange('number')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="fab"
                            style={{
                                backgroundColor: '#fbe6e9',
                                boxShadow: 'none',
                                color:'#f44336'
                            }}
                            mini
                            onClick={() => deleteField(id)}
                            className={classes.button}
                        >
                            <CancelIcon className={classes.icon} />
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        );
    }
}

DialogSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

const Field = WithStyles(styles)(DialogSelect);

export default Field;

