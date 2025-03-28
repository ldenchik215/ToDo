import React, { useState } from 'react'

export default function NewTaskForm({ taskAdd }) {
  const [inputTask, setInputTask] = useState('')
  const [inputSec, setInputSec] = useState('')
  const [inputMinute, setInputMinute] = useState('')

  const inputSecValidate = (inputValue) => {
    if (Number.isNaN(Number(inputValue))) {
      setInputSec('')
      return
    }
    if (Number(inputValue) > 59) {
      setInputSec('59')
    } else {
      setInputSec(inputValue.trim())
    }
  }

  const inputMinuteValidate = (inputValue) => {
    if (Number.isNaN(Number(inputValue))) {
      setInputMinute('')
      return
    }
    setInputMinute(inputValue.trim())
  }

  const handleSubmit = (e, text, sec, minute) => {
    e.preventDefault()
    if (!text.trim()) return

    taskAdd(text, sec, minute)
    setInputTask('')
    setInputSec('')
    setInputMinute('')
  }

  const handleKeyDown = (e, setFn) => {
    if (e.key === 'Escape') {
      setFn('')
      e.target.value = ''
      e.target.blur()
    }
  }

  return (
    <form className="new-todo-form" action="submit" onSubmit={(e) => handleSubmit(e, inputTask, inputSec, inputMinute)}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={(e) => setInputTask(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, setInputTask)}
        value={inputTask}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={(e) => inputSecValidate(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, setInputSec)}
        value={inputSec}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={(e) => inputMinuteValidate(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, setInputMinute)}
        value={inputMinute}
      />
      <button type="submit" aria-label="submit" style={{ display: 'none' }} />
    </form>
  )
}
