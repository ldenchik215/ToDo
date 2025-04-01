import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Timer from './Timer'

export default function Task({
  text,
  time,
  isRunning,
  created,
  isEditing,
  isDone,
  id,
  onClickDelete,
  taskEdit,
  toggleTaskState,
}) {
  const [input, setInput] = useState(text)
  const [inputCache, setInputCache] = useState(input)

  const taskClasses = []

  if (isEditing) {
    taskClasses.push('editing')
  }

  if (isDone) {
    taskClasses.push('completed')
  }

  const changeInputValue = (e, inputVal = inputCache, setFn = setInput) => {
    e.target.value = inputVal.trim()
    setFn(inputVal.trim())
  }

  const cancelEdit = (e) => {
    changeInputValue(e, inputCache, setInput)
    toggleTaskState(id, 'isEditing')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      changeInputValue(e, input, setInputCache)
      taskEdit(id, input)
    }
    if (e.key === 'Escape') {
      cancelEdit(e)
    }
  }

  return (
    <li className={taskClasses.join(' ')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={isDone}
          id={id}
          onChange={() => toggleTaskState(id, 'isDone')}
        />
        <label>
          <span className="title">{text}</span>
          <Timer time={time} toggleTaskState={toggleTaskState} id={id} isRunning={isRunning} isDone={isDone} />
          <span className="description">created {formatDistanceToNow(new Date(created), { addSuffix: true })}</span>
        </label>
        <button
          className="icon icon-edit"
          type="button"
          aria-label="Edit task"
          onClick={() => toggleTaskState(id, 'isEditing')}
        />
        <button className="icon icon-destroy" type="button" aria-label="Delete task" onClick={onClickDelete} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={cancelEdit}
          value={input}
          autoFocus
        />
      )}
    </li>
  )
}
