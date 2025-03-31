export default function Timer({ time = 0, toggleTaskState, isRunning, isDone, id }) {
  const formatTime = () => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')

    return isDone ? '00:00' : `${minutes}:${seconds}`
  }

  const startTimer = () => {
    toggleTaskState(id, 'isRunning')
  }

  const stopTimer = () => {
    toggleTaskState(id, 'isRunning')
  }

  return (
    <span className="description">
      <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} disabled={isRunning} />
      <button type="button" className="icon icon-pause" aria-label="pause" onClick={stopTimer} disabled={!isRunning} />
      {formatTime()}
    </span>
  )
}
