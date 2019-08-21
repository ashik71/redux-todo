import React, { Component } from 'react';
import { TextField, Button, CircularProgress, ButtonGroup } from '@material-ui/core';
import { getTasks, addTask, updateTask } from '../../actions/todo_actions';
import { connect } from 'react-redux';
import TodoItems from './todoitems';
const styles = {
    done: {
        textDecoration: "line-through",
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
    }
};


class AddToDo extends Component {
    state = {
        tasks: [],
        newTask: "",
        loading: false,
        editTask: false,
        editId: null,
        editedData: null
    };

    componentDidMount() {
        this.setState({ loading: true })
        this.props.dispatch(getTasks()).then(() => {
            this.setState({
                tasks: this.props.todos.todos,
                loading: false
            })

        })

    }

    onTextUpdate = e => {
        this.setState({ newTask: e.target.value });
    };

    addTask = () => {
        if (!this.state.editTask) {
            let { newTask } = this.state;
            this.props.dispatch(addTask(newTask, this.props.todos.todos)).then(response => {
                this.setState({
                    tasks: this.props.todos.todos,
                    newTask: ''
                })
            });
        } else {

            const selectedTask = this.state.editedData;

            selectedTask.title = this.state.newTask;

            this.props.dispatch(updateTask(selectedTask, this.state.tasks)).then(response => {
                this.setState({
                    tasks: this.props.todos.todos,
                    newTask: '',
                    editId: null,
                    editTask: false,
                    editedData: null
                })
            });

        }
    };
    toggle = task => {
        let { tasks } = this.state;
        tasks[tasks.indexOf(task)].completed = !tasks[tasks.indexOf(task)].completed;
        this.setState({ tasks: tasks, newTask: "" });
    };
    deleteTask = task => {
        let { tasks } = this.state;
        tasks.splice(tasks.indexOf(task), 1);
        this.setState({ tasks: tasks, newTask: "" });
    };

    deleteCompleted = () => {
        const completedTasks = this.state.tasks.filter(task => task.completed === true);

        let { tasks } = this.state;
        
        completedTasks.forEach(element => {
            tasks.splice(tasks.indexOf(element), 1);
        });        
        this.setState({ tasks: tasks, newTask: "" });
    }
    deleteAll =()=>{
        let { tasks } = this.state;
        tasks.splice(0, tasks.length);
        this.setState({ tasks: tasks, newTask: "" });
    }
    handleEditTask = id => {
        const filteredTasks = this.state.tasks.filter(task =>
            task.id !== id);
        const selectedTask = this.state.tasks.filter(task =>
            task.id === id);

        this.setState({
            tasks: filteredTasks,
            newTask: selectedTask[0].title,
            editTask: true,
            editId: id,
            editedData: selectedTask[0]
        });

    };
    render() {
        const { newTask } = this.state;        
        return (
            <div id="main" style={styles.main}>
                <header style={styles.header}>
                    <TextField
                        label={this.state.editTask ? "Edit task" : "Add new task"}
                        value={newTask}
                        onChange={this.onTextUpdate}
                    />
                    <Button
                        variant="contained"
                        color={this.state.editTask ? "secondary" : "primary"}
                        disabled={!newTask}
                        onClick={this.addTask}
                    >
                        {this.state.editTask ? 'Edit' : 'Add'}
                    </Button>
                </header>
                {
                    this.state.loading ?
                        <CircularProgress
                            variant="indeterminate"
                            size={24}
                            thickness={4}
                            style={{ marginTop: '30px' }}
                        />
                        : null
                }
                {this.state.tasks ?
                    this.state.tasks.map(data =>
                        <TodoItems
                        key={data.id}
                            data={data}
                            onTextUpdate={this.onTextUpdate}
                            toggle={this.toggle}
                            deleteTask={this.deleteTask}
                            handleEditTask={this.handleEditTask}
                        />
                    )
                    : null
                }
                {
                    this.state.tasks.length >0 ?
                        <ButtonGroup fullWidth >
                            <Button style={{ backgroundColor: '#ffc107', margin: '3px' }} onClick={this.deleteCompleted}>Clear Completed</Button>
                            <Button style={{ backgroundColor: '#dc3545', margin: '3px' }} onClick={this.deleteAll}>Clear All</Button>
                        </ButtonGroup>
                        : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
export default connect(mapStateToProps)(AddToDo);