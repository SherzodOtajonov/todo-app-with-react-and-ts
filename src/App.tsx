import React, {FC, useState, ChangeEvent} from 'react';
import './App.css';
import { Itask } from './Interfaces';
import TodoTask from './components/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<Itask[]>([]);
  
  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const handleDeadlineChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDeadline( Number(event.target.value) );
  };

  const addTask = (): void => {
    const newTask = {taskName: task, deadline: deadline};
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0); 
  };

  const completeTask = (taskNameToDelete: string): void => {
      setTodoList(todoList.filter((task: Itask) => {
        return task.taskName !== taskNameToDelete;
      }))
  }

  return (
    <div className="App">
      {/* header part */}
      <div className="header">
        <div className="input-container">
          <input type="text" placeholder="task" value={task} onChange={ handleTaskChange}/>
          <input type="number" placeholder="deadline (in days)" value={deadline} onChange={ handleDeadlineChange }/>
        </div>
        <button onClick={addTask}>Add Tasks</button>
      </div>

      {/* todolist past */}
      <div className="todo-list">
        {todoList.map((task: Itask, key: number) => {
          return <TodoTask key={ key } task={ task } completeTask={ completeTask }/>; 
        })}
      </div>
    </div>
  );
}

export default App;
