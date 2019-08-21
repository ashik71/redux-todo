import {
    ADD_TASK,
    GET_TASK
} from './types';
import axios from 'axios';

import { JSON_SERVER } from '../components/misc';

export function addTask(dataToSubmit,previousTasks) {
    return (dispatch) => {
        return axios.post(`${JSON_SERVER}`, {
            userId: 1,
            title: dataToSubmit,
            completed: false
        })
            .then(response => {
                let todos = [...previousTasks,response.data];                
                dispatch(
                    {
                        type: ADD_TASK,
                        payload: todos
                    }
                )
            })
            .catch(error => {
                throw (error);
            });
    };

}

export function getTasks() {
    return (dispatch) => {
        return fetch(`${JSON_SERVER}`)
            .then(response => response.json())
            .then(json => dispatch(
                { type: GET_TASK, payload: json.slice(0, 7) }))
            .catch(err => dispatch(
                { type: "ERROR", msg: "Unable to fetch data" }))
    }


}


