import TaskFilter from '../TasksFilter/TasksFilter'

export default function Footer({ deleteComleeted, filter, setFilter, tasksLeft }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter filter={filter} setFilter={setFilter} />
      <button className="clear-completed" type="button" onClick={deleteComleeted}>
        Clear completed
      </button>
    </footer>
  )
}
