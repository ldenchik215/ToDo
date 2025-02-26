/*eslint-disable react/jsx-props-no-spreading*/
import React from 'react'

import Task from '../Task/Task'

export default function TaskList({ filtered, taskEdit, onClickDone, onClickEdit, onClickDelete }) {
  const tasks = filtered.map((task) => {
    return (
      <Task
        key={task.id}
        {...task}
        taskEdit={taskEdit}
        onClickDone={() => onClickDone(task.id)}
        taskEditToggle={() => onClickEdit(task.id)}
        onClickDelete={() => onClickDelete(task.id)}
      />
    )
  })

  return <ul className="todo-list">{tasks}</ul>
}
