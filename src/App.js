/*eslint no-unused-vars: "warn"*/
import React, { useState } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

function App() {
  const [taskList, setTaskList] = useState([
    {
      taskClass: 'completed',
      text: 'Completed task',
      created: 'created 17 seconds ago',
      isDone: false,
      isEditing: false,
      id: 0,
    },
    {
      taskClass: 'editing',
      text: 'Editing task',
      created: 'created 17 seconds ago',
      isDone: false,
      isEditing: true,
      id: 1,
    },
    {
      taskClass: '',
      text: 'Active task',
      created: 'created 5 minutes ago',
      isDone: false,
      isEditing: false,
      id: 2,
    },
  ])

  const taskDoneToggle = (id) => {
    setTaskList(
      taskList.map((obj, i) => {
        const task = { ...obj }
        if (i === id) {
          task.isDone = !task.isDone
        }
        return task
      }),
    )
  }

  const taskEdit = (id) => {
    setTaskList(
      taskList.map((obj, i) => {
        const task = { ...obj }
        if (i === id) {
          task.isEditing = !task.isEditing
        }
        return task
      }),
    )
  }

  const taskDeleted = (id) => {
    setTaskList(taskList.filter((obj, i) => i !== id))
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList
            taskList={taskList}
            onClickDone={(id) => taskDoneToggle(id)}
            onClickEdit={(id) => taskEdit(id)}
            onClickDelete={(id) => taskDeleted(id)}
          />
          <Footer />
        </section>
      </section>
    </div>
  )
}

export default App
