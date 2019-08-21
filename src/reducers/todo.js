import {
    ADD_TASK,    
    GET_TASK
} from '../actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case GET_TASK:            
            return { ...state, todos: action.payload }
        case ADD_TASK:
            return { ...state, todos: action.payload }
        default:
            return state;
    }
}