import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { addTodo, toggleComplete, clearItems } from "./actions/itemActions";
import Todo from "./interfaces/Todo";

function App(props: any): JSX.Element {
  const { todos } = props.todos;
  const [task, setTask] = useState<string>("");
  const [paused, setPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        props.addTodo(generateRandomString(30));
      }
    }, speed);
    return () => clearInterval(interval);
  }, [paused, speed]);

  return (
    <div className="App">
      <h3>Máš {todos.length} todos</h3>

      <form id="form" onSubmit={e => handleSubmit(e)}>
        <input type="text" value={task} onChange={e => handleChange(e)} />
        <button id="btn" type="submit">
          Přidat
        </button>
      </form>

      <button type="button" onClick={() => props.clearItems()}>
        Clear
      </button>

      <br />

      <div>
        <button onClick={() => togglePause()}>
          {paused ? "Pustit" : "Zastavit"}
        </button>

        <br />
        <label htmlFor="speed">Rychlost</label>
        <input
          id="speed"
          type="number"
          value={speed}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSpeed(parseInt(e.target.value))
          }
        />
      </div>

      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            <input
              checked={todo.completed}
              type="checkbox"
              onChange={() => handleToggle(todo.id)}
            ></input>
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );

  function togglePause() {
    setPaused(!paused);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    props.addTodo(task);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setTask(e.target.value);
  }

  function handleToggle(id: number): void {
    props.toggleComplete(id);
  }
}

function mapStateToProps(state: any) {
  return {
    todos: state.todo
  };
}

function generateRandomString(length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export default connect(
  mapStateToProps,
  { addTodo, toggleComplete, clearItems }
)(App);
