/*eslint no-unused-vars: "warn"*/
import React, { useState } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

export default function App() {
  const [taskList, setTaskList] = useState([
    {
      taskClass: 'completed',
      text: 'Completed task',
      created: 'created 17 seconds ago',
      isDone: true,
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

  const [filter, setFilter] = useState('all')

  const tasksFiltered = taskList.filter((task) => {
    if (filter === 'active') return !task.isDone
    if (filter === 'completed') return task.isDone
    if (filter === 'all') return task
    return null
  })

  const toggleTaskState = (id, boolTaskState) => {
    setTaskList(
      taskList.map((item, i) => {
        const task = {
          ...item,
        }
        if (i === id) {
          task[boolTaskState] = !task[boolTaskState]
        }
        return task
      }),
    )
  }

  const taskDoneToggle = (id) => {
    toggleTaskState(id, 'isDone')
  }

  const taskEdit = (id) => {
    toggleTaskState(id, 'isEditing')
  }

  const taskDeleted = (id) => {
    setTaskList(taskList.filter((item, i) => i !== id))
  }

  const deleteComleeted = () => {
    setTaskList(taskList.filter((item) => !item.isDone))
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
            tasksFiltered={tasksFiltered}
            onClickDone={(id) => taskDoneToggle(id)}
            onClickEdit={(id) => taskEdit(id)}
            onClickDelete={(id) => taskDeleted(id)}
          />
          <Footer
            deleteComleeted={deleteComleeted}
            filter={filter}
            setFilter={setFilter}
            tasksLeft={taskList.filter((task) => !task.isDone).length}
          />
        </section>
      </section>
    </div>
  )
}
