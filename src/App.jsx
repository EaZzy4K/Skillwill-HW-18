import { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';

const API_KEY = 'JVidXbN_N-Hgk1ZhPPhoLxWIQZbCgdd7cm3BPc3LCTgp2japkg'

function App() {
  const [taskList, setTaskList] = useState([])
  
  useEffect(() => {
    fetch('/api/v1/todo', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    })
    .then(res => {
      if(!res.ok) throw new Error("Response failed")
      return res.json()
    })
    .then(data => setTaskList(data.items.map(task => {
      return {
        taskName: task.taskName,
        id: task._uuid
      }
    }

    )))
    .catch(err => console.log(err))
  },[])

  const getTasks = () => {
    fetch('/api/v1/todo', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    })
    .then(res => {
      if(!res.ok) throw new Error("Response failed")
      return res.json()
    })
    .then(data => setTaskList(data.items.map(task => {
      return {
        taskName: task.taskName,
        id: task._uuid
      }
    }

    )))
    .catch(err => console.log(err))
  }

  const onFormSubmit = (taskName) => {
    console.log(taskName)

    fetch('/api/v1/todo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify([{taskName}])
    }).then(res => {
      if(!res.ok) throw new Error("Response failed")
      return res.json()
    }).then(data => setTaskList((prev) => [{
      taskName: data.items[0].taskName,
      id: data.items[0]._uuid
    }, ...prev]))
    .catch(err => console.log(err))
  }
  return (
    <div className="App">
      <UserForm onFormSubmit={onFormSubmit}/>
      <button onClick={getTasks}>GET tasks</button>
      <button onClick={() => setTaskList([])}>Clear tasks</button>

      {taskList.map((task) => <div key={task.id} style={{border: '2px solid grey', margin: '10px'}}>
          <h3>{task.taskName}</h3>
        </div>)}
    </div>
  );
}

export default App;
