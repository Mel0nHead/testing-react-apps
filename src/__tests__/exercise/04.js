// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const mockSubmit = jest.fn()
  render(<Login onSubmit={mockSubmit} />)

  const usernameField = screen.getByLabelText(/username/i)
  const passwordField = screen.getByLabelText(/password/i)

  userEvent.type(usernameField, 'Kensignton Chubb')
  userEvent.type(passwordField, '1234')

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(mockSubmit).toHaveBeenCalledWith({
    username: 'Kensignton Chubb',
    password: '1234',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
