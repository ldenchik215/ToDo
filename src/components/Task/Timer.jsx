export default function Timer({ time = 0, toggleTaskState, isRunning, id }) {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0')
  const seconds = String(time % 60).padStart(2, '0')

  const startTimer = () => {
    console.log('start', time)
    toggleTaskState(id, 'isRunning')
  }

  const stopTimer = () => {
    console.log('stop')
    toggleTaskState(id, 'isRunning')
  }

  return (
    <span className="description">
      <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} disabled={isRunning} />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={stopTimer} disabled={!isRunning} />
      {`${minutes}:${seconds}`}
    </span>
  )
}
