import React, { Component } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { getTasks, addTask } from '../../actions/todo_actions';
import { connect } from 'react-redux';
import TodoItems from './todoitems';
import { green } from '@material-ui/core/colors';
const styles = {
    root:{

    },    
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
        editTask: false
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
        let { newTask } = this.state;
        this.props.dispatch(addTask(newTask,this.props.todos.todos)).then(response=>{            
            this.setState({
                tasks: this.props.todos.todos,
                newTask:''
            })
        });
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

    handleEditTask = id => {
        const filteredTasks = this.state.tasks.filter(task=>
            task.id !== id);
        const selectedTask = this.state.tasks.filter(task=>
            task.id === id);
            console.log(selectedTask[0]);
        this.setState({
            tasks: filteredTasks,
            newTask: selectedTask[0].title,
            editTask : true
        })
        
    };

    render() {
        const { newTask } = this.state;
        const { todos } = this.props;       
        return (
            <div id="main" style={styles.main}>
                <header style={styles.header}>
                    <TextField
                        label="Add new task"
                        value={newTask}
                        onChange={this.onTextUpdate}
                    />
                    <Button
                        variant="contained"  
                        color= {this.state.editTask ? "secondary" :"primary" }                     
                        disabled={!newTask}
                        onClick={this.addTask}                                                
                    >
                        {this.state.editTask ? 'Edit' :'Add'}
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
                            data={data}
                            onTextUpdate={this.onTextUpdate}
                            toggle={this.toggle}
                            deleteTask={this.deleteTask}
                            handleEditTask = {this.handleEditTask}                            
                        />
                    )
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