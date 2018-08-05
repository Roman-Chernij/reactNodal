import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles as  WithStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import red from '@material-ui/core/colors/red';
import SvgIcon from '@material-ui/core/SvgIcon';

import Field from './field/Field';
import { v4 } from 'uuid';

import './popup.css';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 500
    },
    formControl: {
        margin: 0,
        minWidth: 120,
    },
    color: {
        primary: {
            backgroundColor: red[300],
            color: red[300]
        }
    },

    button: {
        color: {
            backgroundColor: red[300],
            color: red[300]
        }
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
        open: false,
        add: true,
        localChoice: ''
    };

    componentWillMount() {
        const { add } = this.state;
        const { def } = this.props;

        if ( add )  {
            this.setState({
                localChoice: def,
                add: false
            })
        }
    }

    render() {
        const { classes, item, ch } = this.props;
        const { localChoice } = this.state;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Open modal popup</Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle
                        className="title"
                    >
                        Структура номеров
                    </DialogTitle>
                    <DialogContent>
                        <Button
                            variant="fab"
                            mini
                            onClick={this.handleClose}
                            className={'btn-close-top'}
                        >
                            <CancelIcon className={classes.icon} />
                        </Button>
                        <form className={'form'}>
                            {
                                localChoice.map((i) => <Field
                                    key={i.id}
                                    item={item}
                                    cont={i}
                                    deleteField={this.deleteField}
                                    updateField={this.updateField}
                                />)
                            }
                        </form>
                    </DialogContent>
                    <DialogActions className="btn-row">
                        <Button
                            color="primary"
                            className={classes.button}
                            onClick={this.addNewField}
                        >
                            Добавить
                        </Button>
                    </DialogActions>
                    <DialogActions className="btn-row">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                this.setState({open: false});
                                ch(this.state.localChoice)
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={this.handleClose}
                        >
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        const { def } = this.props;
        this.setState({
            open: false,
            localChoice: def
        });
    };

    addNewField = () => {
        const addField = (obj) => {
            return ([
                ...this.state.localChoice,
                obj
            ])
        };
        this.setState({
            localChoice: addField({
                id: v4(),
                value: 2,
                number: 22
            })
        })
    };

    updateField = (obj) => {

        const { localChoice } = this.state;
        const { name, numd, id } = obj;
        let newArr = [];

            for(let i = 0; i < localChoice.length; i++) {

            if (localChoice[i].id === id) {
                let item = {};
                for (let key in localChoice[i]) {
                    if (key === name) {
                        item[name] =  numd;
                    } else {
                        item[key] =  localChoice[i][key];
                    }

                }
                newArr.push(item)
            } else {
                newArr.push(localChoice[i])
            }
        }
        this.setState({localChoice: newArr})
    };

    deleteField = (id) => {
        const { localChoice } = this.state;
        const newArr = (id) => {
            let arr = [];
            for (let i = 0; i < localChoice.length; i++) {
                if (localChoice[i].id !== id) arr.push(localChoice[i])
            }
            return arr;
        };

        this.setState({localChoice: newArr(id)})
    }
}

DialogSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WithStyles(styles)(DialogSelect);

