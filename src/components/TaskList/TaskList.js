/*eslint-disable react/jsx-props-no-spreading*/
import React from 'react'

import Task from '../Task/Task'

export default function TaskList({ taskList, onClickDone, onClickEdit, onClickDelete }) {
  const tasks = taskList.map((task, idx) => {
    return (
      <Task
        key={idx}
        {...task}
        onClickDone={() => onClickDone(idx)}
        onClickEdit={() => onClickEdit(idx)}
        onClickDelete={() => onClickDelete(idx)}
      />
    )
  })

  return <ul className="todo-list">{tasks}</ul>
}
