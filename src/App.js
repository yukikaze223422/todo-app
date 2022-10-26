import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetail, setTodoDetail] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [decision, setDecision] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [isComplete, setIsComplete] = useState([]);

  const onClickTodoList = () => {
    const newTodo = [
      ...todoList,
      { id: todoList.length + 1, title: todoTitle, detail: todoDetail },
    ];
    setTodoList(newTodo);
    setTodoTitle("");
    setTodoDetail("");
  };

  const onClickDelete = (id) => {
    const newTodo = [...todoList];
    newTodo.splice(id, 1);
    setTodoList(newTodo);
  };

  const onClickEdit = (todo, id) => {
    setDecision(true);
    setTodoTitle(todo.title);
    setTodoDetail(todo.detail);
    setCurrentTodo(todo.id);
  };

  const onClickChancel = () => {
    setDecision(false);
    setTodoTitle("");
  };

  const onClickComplete = (id) => {
    const newTodo = [...isComplete, todoList[id]];
    const deleteTodo = [...todoList];
    deleteTodo.splice(id, 1);
    setIsComplete(newTodo);
    setTodoList(deleteTodo);
  };

  const onClickReturn = (id) => {
    const newTodo = [...isComplete];
    const returnTodo = [...todoList, isComplete[id]];
    newTodo.splice(id, 1);
    setIsComplete(newTodo);
    setTodoList(returnTodo);
  };

  const onClickEditResult = (e) => {
    const newTodo = [...todoList];
    setTodoTitle(e.target.value);
    setTodoDetail(e.target.value);
    newTodo[currentTodo - 1].title = todoTitle;
    newTodo[currentTodo - 1].detail = todoDetail;
    setDecision(false);
  };

  return (
    <>
      <h2>TODO作成</h2>
      {decision ? (
        <>
          <form>
            <TextField
              label="title-edit"
              variant="standard"
              type="text"
              name="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <TextField
              label="detail-edit"
              variant="standard"
              type="text"
              name="detail"
              value={todoDetail}
              onChange={(e) => setTodoDetail(e.target.value)}
              sx={{ marginLeft: "10px" }}
            />
            <button type="button" onClick={onClickEditResult}>
              変更
            </button>
            <button type="button" onClick={onClickChancel}>
              キャンセル
            </button>
          </form>
        </>
      ) : (
        <>
          <form>
            <TextField
              label="title"
              variant="standard"
              type="text"
              name="title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <TextField
              label="detail"
              variant="standard"
              type="text"
              name="detail"
              value={todoDetail}
              onChange={(e) => setTodoDetail(e.target.value)}
              sx={{ marginLeft: "10px" }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="button"
              onClick={onClickTodoList}
              disabled={!todoTitle}
            >
              送信
            </Button>
          </form>
        </>
      )}
      <h2>TODOリスト</h2>
      <ul>
        {todoList.map((todo, id) => {
          return (
            <div key={todo.id}>
              <li>{todo.title}</li>
              <p>{todo.detail}</p>
              {decision ? (
                <></>
              ) : (
                <>
                  <button type="button" onClick={() => onClickDelete(todo)}>
                    削除
                  </button>
                  <button onClick={() => onClickEdit(todo, id)}>編集</button>
                  <button onClick={() => onClickComplete(id)}>完了</button>
                </>
              )}
            </div>
          );
        })}
      </ul>
      <h2>完了リスト</h2>
      <ul>
        {isComplete.map((todo, id) => {
          return (
            <div key={todo.id}>
              <li>{todo.title}</li>
              <p>{todo.detail}</p>
              <button type="button" onClick={() => onClickReturn(id)}>
                戻す
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;
