// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

jest.mock('react-use-geolocation', () => {
  return {
    useCurrentPosition: jest.fn(),
  }
})

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 100,
      longitude: 150,
    },
  }

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    successFn => {
      promise.then(() => {
        successFn(fakePosition)
      })
    },
  )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  resolve()
  await promise
  act(() => {})

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  const {
    coords: {latitude, longitude},
  } = fakePosition

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
