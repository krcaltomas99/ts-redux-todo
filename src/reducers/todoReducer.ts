import {
  GET_ITEMS,
  ADD_ITEM,
  TOGGLE_COMPLETE,
  CLEAR_ITEMS
} from "../actions/types";
import Todo from "../interfaces/Todo";

const initialState = {
  todos: [],
  loading: false
};

export default function(state = initialState, action: any = null) {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        todos: action.payload
      };
    }

    case ADD_ITEM: {
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    }

    case CLEAR_ITEMS: {
      return {
        ...state,
        todos: []
      };
    }

    case TOGGLE_COMPLETE: {
      const todos = state.todos.map((todo: Todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }

        return todo;
      });
      return {
        ...state,
        todos: todos
      };
    }

    default:
      return state;
  }
}
