import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Task({
  text,
  created,
  isEditing,
  isDone,
  id,
  onClickDone,
  taskEditToggle,
  onClickDelete,
  taskEdit,
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      changeInputValue(e, input, setInputCache)
      taskEdit(id, input)
    }
    if (e.key === 'Escape') {
      changeInputValue(e, inputCache, setInput)
      taskEditToggle()
    }
  }

  return (
    <li className={taskClasses.join(' ')}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={isDone} id={id} onChange={() => onClickDone()} />
        <label htmlFor={id}>
          <span className="description">{text}</span>
          <span className="created">created {formatDistanceToNow(new Date(created), { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit task" onClick={taskEditToggle} />
        <button className="icon icon-destroy" type="button" aria-label="Delete task" onClick={onClickDelete} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          value={input}
        />
      )}
    </li>
  )
}
