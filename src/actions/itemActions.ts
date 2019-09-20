import { GET_ITEMS, ADD_ITEM, TOGGLE_COMPLETE, CLEAR_ITEMS } from "./types";
import { Dispatch } from "redux";
import Todo from "../interfaces/Todo";
import { Performance } from "perf_hooks";

export const getItems = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_ITEMS,
    payload: []
  });
};

export const addTodo = (task: string) => (dispatch: Dispatch) => {
  const t1 = new Date().getTime();
  const newTodo: Todo = {
    id: Math.random(),
    task,
    completed: false
  };

  dispatch({
    type: ADD_ITEM,
    payload: newTodo
  });
  const t2 = new Date().getTime();
  console.log("Creating new todo took " + (t2 - t1) + "ms");
};

export const toggleComplete = (id: number) => (dispatch: Dispatch) => {
  dispatch({
    type: TOGGLE_COMPLETE,
    payload: id
  });
};

export const clearItems = () => (dispatch: Dispatch) => {
    dispatch({
        type: CLEAR_ITEMS
    })
}
