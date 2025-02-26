export default function TaskFilter({ tasksFilter, filterStatus = 'all' }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={filterStatus === 'all' ? 'selected' : null}
          type="button"
          onClick={() => {
            tasksFilter('all')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={filterStatus === false ? 'selected' : null}
          type="button"
          onClick={() => {
            tasksFilter(false)
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={filterStatus === true ? 'selected' : null}
          type="button"
          onClick={() => {
            tasksFilter(true)
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
