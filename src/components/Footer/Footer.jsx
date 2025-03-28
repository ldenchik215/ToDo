import TaskFilter from '../TasksFilter/TasksFilter'

export default function Footer({ deleteCompleeted, tasksFilter, tasksLeft, filterStatus }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter tasksFilter={tasksFilter} filterStatus={filterStatus} />
      <button className="clear-completed" type="button" onClick={deleteCompleeted}>
        Clear completed
      </button>
    </footer>
  )
}
