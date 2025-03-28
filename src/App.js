/*eslint no-unused-vars: "warn"*/
import React, { useState, useEffect, useReducer } from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

const initialState = [
  {
    text: 'Completed task',
    created: new Date(2024, 5),
    isDone: true,
    isEditing: false,
    id: 0,
    isRunning: false,
    time: 200,
  },
  {
    text: 'Editing task',
    created: new Date(2025, 1),
    isDone: false,
    isEditing: false,
    id: 1,
    isRunning: false,
    time: 200,
  },
  {
    text: 'Active task',
    created: new Date(2024, 1),
    isDone: false,
    isEditing: false,
    id: 2,
    isRunning: false,
    time: 200,
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'TASK_ADD':
      return [
        ...state,
        {
          id: Date.now(),
          created: Date.now(),
          text: action.payload.text,
          isDone: false,
          isEditing: false,
          isRunning: false,
          time: action.payload.time,
        },
      ]

    case 'TASK_TOGGLE_STATE':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, [action.payload.boolTaskState]: !task[action.payload.boolTaskState] }
          : task,
      )

    case 'TASK_EDIT':
      return state.map((task) =>
        task.id === action.payload.id ? { ...task, text: action.payload.text, isEditing: false } : task,
      )

    case 'TASK_DELETE':
      return state.filter((task) => task.id !== action.payload.id)

    case 'TASK_DELETE_COMPLETED':
      return state.filter((task) => !task.isDone)

    case 'TIMER_UPDATE':
      return state.map((task) =>
        task.id === action.payload.id && task.isRunning ? { ...task, time: Math.max(task.time - 1, 0) } : task,
      )

    default:
      throw new Error()
  }
}

export default function App() {
  const [taskList, dispatch] = useReducer(reducer, initialState)

  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = filterStatus === 'all' ? taskList : taskList.filter((task) => task.isDone === filterStatus)
  const taskLeft = taskList?.filter((task) => !task.isDone).length

  const tasksFilter = (status) => {
    if (status === 'all') {
      setFilterStatus('all')
    } else {
      setFilterStatus(status)
    }
  }

  const toggleTaskState = (id, boolTaskState) => {
    dispatch({
      type: 'TASK_TOGGLE_STATE',
      payload: {
        id,
        boolTaskState,
      },
    })
  }

  const taskDeleted = (id) => {
    dispatch({
      type: 'TASK_DELETE',
      payload: {
        id,
      },
    })
  }

  const deleteCompleeted = () => {
    dispatch({
      type: 'TASK_DELETE_COMPLETED',
    })
  }

  const taskAdd = (text, sec, minute) => {
    if (text.trim()) {
      const time = Number(minute) * 60 + Number(sec)
      dispatch({
        type: 'TASK_ADD',
        payload: {
          text,
          time,
        },
      })
    }
  }

  const taskEdit = (id, inputVal) => {
    dispatch({
      type: 'TASK_EDIT',
      payload: {
        id,
        text: inputVal.trim(),
      },
    })
  }

  const timerUpdate = (id) => {
    dispatch({
      type: 'TIMER_UPDATE',
      payload: { id },
    })
  }

  useEffect(() => {
    const timers = setInterval(() => {
      taskList.forEach((task) => {
        if (task.isRunning) {
          timerUpdate(task.id)
        }
      })
    }, 1000)

    return () => clearInterval(timers)
  }, [taskList])

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm taskAdd={taskAdd} />
        </header>
        <section className="main">
          <TaskList
            filtered={filtered}
            taskEdit={taskEdit}
            toggleTaskState={toggleTaskState}
            onClickDelete={(id) => taskDeleted(id)}
          />
          <Footer
            deleteCompleeted={deleteCompleeted}
            tasksFilter={tasksFilter}
            tasksLeft={taskLeft}
            filterStatus={filterStatus}
          />
        </section>
      </section>
    </div>
  )
}
