import React from 'react'

export default function Task({ text, created, isEditing, isDone, id, onClickDone, onClickEdit, onClickDelete }) {
  const taskClasses = []

  if (isEditing) {
    taskClasses.push(' editing')
  }

  if (isDone) {
    taskClasses.push('completed')
  }

  return (
    <li className={taskClasses}>
      <div className="view">
        <input className="toggle" type="checkbox" id={id} onClick={() => onClickDone()} />
        <label htmlFor={id}>
          <span className="description">{text}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit task" onClick={onClickEdit} />
        <button className="icon icon-destroy" type="button" aria-label="Delete task" onClick={onClickDelete} />
      </div>
      {isEditing && <input type="text" className="edit" defaultValue={text} />}
    </li>
  )
}
