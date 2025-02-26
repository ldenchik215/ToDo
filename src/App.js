/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect, useCallback } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

export default function App() {
  const [taskList, setTaskList] = useState([
    {
      text: 'Completed task',
      created: new Date(2024, 5),
      isDone: true,
      isEditing: false,
      id: 0,
    },
    {
      text: 'Editing task',
      created: new Date(2025, 1),
      isDone: false,
      isEditing: true,
      id: 1,
    },
    {
      text: 'Active task',
      created: new Date(2024, 1),
      isDone: false,
      isEditing: false,
      id: 2,
    },
  ])

  const [filtered, setFiltered] = useState(taskList)
  const [filterStatus, setFilterStatus] = useState('all')

  const tasksFilter = useCallback(
    (status) => {
      if (status === 'all') {
        setFilterStatus('all')
        setFiltered(taskList)
      } else {
        const newFiltered = taskList.filter((task) => task.isDone === status)
        setFilterStatus(status)
        setFiltered(newFiltered)
      }
    },
    [taskList],
  )

  useEffect(() => {
    tasksFilter(filterStatus)
  }, [filterStatus, tasksFilter])

  const toggleTaskState = (id, boolTaskState) => {
    setTaskList(
      taskList.map((item) => {
        const task = {
          ...item,
        }
        if (task.id === id) {
          task[boolTaskState] = !task[boolTaskState]
        }
        return task
      }),
    )
  }

  const taskDoneToggle = (id) => {
    toggleTaskState(id, 'isDone')
  }

  const taskEditToggle = (id) => {
    toggleTaskState(id, 'isEditing')
  }

  const taskDeleted = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id))
  }

  const deleteComleeted = () => {
    setTaskList(taskList.filter((item) => !item.isDone))
  }

  const taskAdd = (text) => {
    if (text.trim() === '') return
    const newTask = {
      text: text.trim(),
      created: Date.now(),
      isDone: false,
      isEditing: false,
      id: Date.now(),
    }

    setTaskList([...taskList, newTask])
  }

  const taskEdit = (id, inputVal) => {
    setTaskList(
      taskList.map((item) => {
        const task = {
          ...item,
        }
        if (item.id === id) {
          task.text = inputVal.trim()
          task.isEditing = false
        }
        return task
      }),
    )
  }

  const handleKeyDown = (input, setInput, e) => {
    if (e.key === 'Enter') {
      taskAdd(input)
      setInput('')
      e.target.value = ''
      e.target.blur()
    }
    if (e.key === 'Escape') {
      setInput('')
      e.target.value = ''
      e.target.blur()
    }
  }

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm handleKeyDown={handleKeyDown} />
        </header>
        <section className="main">
          <TaskList
            filtered={filtered}
            taskEdit={taskEdit}
            onClickDone={(id) => taskDoneToggle(id)}
            onClickEdit={(id) => taskEditToggle(id)}
            onClickDelete={(id) => taskDeleted(id)}
          />
          <Footer
            deleteComleeted={deleteComleeted}
            tasksFilter={tasksFilter}
            tasksLeft={taskList.filter((task) => !task.isDone).length}
            filterStatus={filterStatus}
          />
        </section>
      </section>
    </div>
  )
}
