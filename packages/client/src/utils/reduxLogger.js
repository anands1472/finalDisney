const reduxLogger = (store) => (next) => (action) => {
  console.group(action.type)
  if (typeof action !== 'function') {
    console.log('%c Dispatching ', 'background: #222; color: #bada55', action)
  }
  let start = performance.now()
  let result = next(action)
  let end = performance.now()
  console.log(
    '%c Action with type "' +
      action.type +
      '" took ' +
      (end - start).toFixed(2) +
      ' milliseconds.',
    'background: #bada55; color: #222'
  )
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default reduxLogger
