import React, { useState } from "react";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [decision, setDecision] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [isComplete, setIsComplete] = useState([]);

  const onChangeTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const onClickTodoList = () => {
    const newTodo = [
      ...todoList,
      { id: todoList.length + 1, title: todoTitle },
    ];
    setTodoList(newTodo);
    setTodoTitle("");
  };

  const onClickDelete = (id) => {
    const newTodo = [...todoList];
    newTodo.splice(id, 1);
    setTodoList(newTodo);
  };

  const onClickEdit = (todo, id) => {
    setDecision(true);
    setTodoTitle(todo.title);
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
    newTodo[currentTodo - 1].title = todoTitle;
    setDecision(false);
  };

  return (
    <>
      <h2>TODO作成</h2>
      {decision ? (
        <>
          <form>
            <input
              type="text"
              name="text"
              placeholder="編集内容を入力"
              value={todoTitle}
              onChange={onChangeTitle}
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
            <input
              type="text"
              name="text"
              placeholder="タイトルを入力"
              value={todoTitle}
              onChange={onChangeTitle}
            />
            <button
              type="button"
              onClick={onClickTodoList}
              disabled={!todoTitle}
            >
              送信
            </button>
          </form>
        </>
      )}
      <h2>TODOリスト</h2>
      <ul>
        {todoList.map((todo, id) => {
          return (
            <div key={todo.id}>
              <li>{todo.title}</li>
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
