import React, { useState } from 'react'

export default function NewTaskForm({ handleKeyDown }) {
  const [input, setInput] = useState('')

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => handleKeyDown(input, setInput, e)}
      value={input}
    />
  )
}
