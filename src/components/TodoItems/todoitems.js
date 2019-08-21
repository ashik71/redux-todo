import React, { Component } from 'react';
import { Card, FormGroup, Divider, FormControlLabel, Switch, Tooltip, IconButton } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const styles = {
    done: {        
        opacity: ".5",
        display: "flex",
        width: "100%"
    },
    header: {
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    main: {
        width: "100%",
        maxWidth: "400px",
        margin: "20px auto"
    },
    card: {
        padding: "20px",
        margin: "20px 0"
    },
    todo: {
        position: "relative",
        display: "flex",
        flexFow: "row",
        alignContent: "space-between"
    },
    label: {
        display: "flex",
        width: "100%"
    },
    divider: {
        position: "absolute",
        width: "100%",
        top: 0
    },
    editicon: {

    }
};

class TodoItems extends Component {
    handleChange = () => {
        var lang = this.dropdown.value;
        this.props.onSelectLanguage(lang);
    }
    render() {
        return (
            <div>
                <Card style={styles.card}>
                    <FormGroup>
                        <div style={styles.todo}>
                            <Divider style={styles.divider} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={!this.props.data.completed}
                                        onChange={() => this.props.toggle(this.props.data)}
                                    />
                                }
                                label={this.props.data.title}
                                style={this.props.data.completed ? styles.done : styles.label}
                            />
                            <Tooltip title="Edit" placement="top">
                                <IconButton
                                    aria-label="edit"
                                    onClick={() => this.props.handleEditTask(this.props.data.id)}
                                >
                                    <EditIcon className='editicon' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete task" placement="top">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => this.props.deleteTask(this.props.data)}                                    
                                >
                                    <DeleteIcon className='icon' />
                                </IconButton>
                            </Tooltip>
                        </div>

                    </FormGroup>
                </Card>
            </div>
        );
    }
}

export default TodoItems;


