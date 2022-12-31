import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncomplteTodo } from "./components/IncomplteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incomplteTodos, setIncomplteTodos] = useState([]);
  const [complteTodos, setComplteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押下時、incomplteTodos配列の全要素の最後にプレースホルダーの中身を追加(未入力で追加された場合はなんもしない)
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incomplteTodos, todoText];
    setIncomplteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incomplteTodos];
    newTodos.splice(index, 1);
    //ちゃんと更新しないと画面に反映されない！！
    setIncomplteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incomplteTodos];
    const newCompletes = [...complteTodos, newIncompleteTodos[index]];
    newIncompleteTodos.splice(index, 1);
    setIncomplteTodos(newIncompleteTodos);
    setComplteTodos(newCompletes);
  };

  const onClickReturn = (index) => {
    const newCompletes = [...complteTodos];
    const newIncompleteTodos = [...incomplteTodos, newCompletes[index]];
    newCompletes.splice(index, 1);
    setIncomplteTodos(newIncompleteTodos);
    setComplteTodos(newCompletes);
  };

  return (
    <>
      <InputTodo
        todoText={todoText} //props
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incomplteTodos.length >= 5}
      />

      {incomplteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTodoは5個までです</p>
      )}
      <IncomplteTodo
        incTodo={incomplteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {complteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickReturn(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
