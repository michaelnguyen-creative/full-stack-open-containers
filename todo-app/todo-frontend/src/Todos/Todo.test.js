import Todo from './Todo'
import { render, screen } from '@testing-library/react'

describe('a single todo', () => {
  test('renders data properly', async () => {
    const todo = {
      _id: '644a89cc559de5f288043a6c',
      text: 'Write code',
      done: true,
    }
    const mockFn = jest.fn()

    render(<Todo todo={todo} onClickDelete={mockFn} onClickComplete={mockFn} />)
    const text = screen.getByText(todo.text)
    expect(text).toBeDefined()
  })
})
