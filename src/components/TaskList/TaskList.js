import React from 'react'

import Task from '../Task/Task'

export default class TaskList extends React.Component {
    state = {
      ar: true,
    }

  render() {
    const { ar } = this.state

    return (
      <ul className="todo-list">
        <Task taskClass="completed" taskStatus="Completed task" created="created 17 seconds ago" />
        <Task taskClass="editing" taskStatus="Editing task" created="created 5 minutes ago" isEditing="true" />
        <Task taskStatus="Active task" created="created 5 minutes ago" qwe={ar} />
      </ul>
    )
  }
}
