const React = require('react')
const ReactDOM = require('react-dom')
const {act} = require('react-dom/test-utils')

function Comp() {
  const [state, setState] = React.useState()
  React.useEffect(() => {
    setTimeout(() => {
      console.log('updating state')
      setState('blah')
    })
  }, [state])
  return null
}

test('example', async () => {
  const container = document.createElement('div')

  // using `act` is required to get effect callbacks run when rendering components
  // (React Testing Library does this automatically)
  act(() => {
    ReactDOM.render(React.createElement(Comp), container)
  })

  // the `cleanup` function from React Testing Library (which also happens automatically)
  // flushes all the in-flight effects by waiting for the next tick of the event loop
  // this is basically a simplified version of: https://github.com/facebook/react/blob/master/packages/shared/enqueueTask.js
  await new Promise((resolve) => setImmediate(resolve))

  // this is the last thing that happens in cleanup (to avoid memory leaks)
  ReactDOM.unmountComponentAtNode(container)
})
