import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('Todolist component testing',()=>{

  test('renders learn react link', () => {
    render(<TodoList />);
    const linkElement = screen.getByText(/Todo List App/i)
    expect(linkElement).toBeInTheDocument();
  });

  


})
