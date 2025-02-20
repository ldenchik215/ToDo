export default function TaskFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'all' ? 'selected' : null} type="button" onClick={() => setFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'active' ? 'selected' : null} type="button" onClick={() => setFilter('active')}>
          Active
        </button>
      </li>
      <li>
        <button
          className={filter === 'completed' ? 'selected' : null}
          type="button"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
