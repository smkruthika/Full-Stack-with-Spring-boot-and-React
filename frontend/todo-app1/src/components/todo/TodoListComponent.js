import React, {Component} from 'react';
import TodoService from '../../api/todo/TodoService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment';

class TodoListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          todos: [],
          message: ''
        }
        this.getAllTodosPerUser = this.getAllTodosPerUser.bind(this);
        this.updateTodoById = this.updateTodoById.bind(this);
        this.deleteTodoById = this.deleteTodoById.bind(this);
        this.addTodo = this.addTodo.bind(this);

    }

    componentDidMount() {
        const user = AuthenticationService.getUserLoggedIn();
        this.getAllTodosPerUser(user);
    }

    getAllTodosPerUser(user) {
        TodoService.getAllTodosPerUser(user)
        .then(response => {
            this.setState({
                todos: response.data
            })
        })
    }

    deleteTodoById(id) {
        const user = AuthenticationService.getUserLoggedIn();
        TodoService.deleteTodoById(user, id)
        .then(response => {
            this.setState({
                message: `Delete of todo ${id} successful`
            })
            this.getAllTodosPerUser(user)
        })
    }

    updateTodoById(id) {
        this.props.history.push(`/todos/${id}`)
    }

    addTodo() {
        this.props.history.push(`/todos/-1`)
    }

    render () {
        console.log(this.state.todos)
        return (
        <div>
            <h1>Todo List</h1>
            {this.state.message !== '' &&
                <div className="alert alert-success">
                    {this.state.message}
                </div>
            }
            <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>IsCompleted</th>
                        <th>Target date</th>
                        <th>Update</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {this.state.todos.map(
                        todo =>
                        <tr>
                            <td>{todo.description}</td>
                            <td>{todo.completed.toString()}</td>
                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                            <td><button className="btn btn-success" onClick={() => this.updateTodoById(todo.id)}>Update</button></td>
                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoById(todo.id)}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            <button className="btn btn-success" onClick={this.addTodo} >Add</button>
        </div>
    )
  }
}

export default TodoListComponent;