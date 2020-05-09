import axios from "axios";
import {API_URL} from '../../constants';
import {JPA_API_URL} from '../../constants';


class TodoService {
    getAllTodosPerUser(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
    }
    deleteTodoById(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }
    getTodoById(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }
    updateTodoById(name, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }
    addTodo(name, todo) {
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo)
    }
}

export default new TodoService()