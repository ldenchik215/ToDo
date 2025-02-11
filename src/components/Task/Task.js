import { useState, useId } from 'react'

export default function Task({ taskStatus, created, isEditing }) {
  const id = useId()
  const [complete, setComplete] = useState(false)

  const onTaskClick = () => {
    setComplete(!complete)
  }

  return (
    <li className={complete ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" id={id} onClick={onTaskClick} />
        <label htmlFor={id}>
          <span className="description">{taskStatus}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit task" />
        <button className="icon icon-destroy" type="button" aria-label="Delete task" />
      </div>
      {isEditing && <input type="text" className="edit" value="Editing task" />}
    </li>
  )
}
