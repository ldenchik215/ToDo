/*eslint-disable react/jsx-props-no-spreading*/
import React from 'react'

import Task from '../Task/Task'

export default function TaskList({ filtered, taskEdit, onClickDelete, toggleTaskState }) {
  const tasks = filtered?.map((task) => (
    <Task
      key={task.id}
      {...task}
      taskEdit={taskEdit}
      toggleTaskState={toggleTaskState}
      onClickDelete={() => onClickDelete(task.id)}
    />
  ))

  return <ul className="todo-list">{tasks}</ul>
}
