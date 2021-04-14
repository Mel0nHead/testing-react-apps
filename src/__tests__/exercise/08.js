// testing custom hooks
// http://localhost:3000/counter-hook

import useCounter from '../../components/use-counter'
import {renderHook, act} from '@testing-library/react-hooks'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)

  act(() => {
    result.current.decrement()
  })

  expect(result.current.count).toBe(0)
})

test('should be able to set a custom initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 5}))

  expect(result.current.count).toBe(5)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(6)

  act(() => {
    result.current.decrement()
  })

  expect(result.current.count).toBe(5)
})

test('should be able to set a custom step', () => {
  const {result} = renderHook(() => useCounter({step: 3}))

  expect(result.current.count).toBe(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(3)

  act(() => {
    result.current.decrement()
  })

  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
