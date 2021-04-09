// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm({password}) {
  const username = faker.internet.userName()
  const passwordToReturn = password ?? faker.internet.password()

  return {username, password: passwordToReturn}
}

test('submitting the form calls onSubmit with username and password', () => {
  const mockSubmit = jest.fn()
  render(<Login onSubmit={mockSubmit} />)
  const {username, password} = buildLoginForm({password: 'abc'})

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(mockSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
