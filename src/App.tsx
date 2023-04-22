import { useState } from 'react'
import Header from './Components/Header'
import TodoContainer from './Components/TodoContainer'
import TodoObj from './todoModel'
import FunctionContext from './Context/functionContext'

function App() {

  const [todos, setTodos] = useState<TodoObj[]>([])

  // delete todo from the list
  function removeTodo(id: number): void {
    // let temp: TodoObj[] = [...todo]
    // const matchedIndex: number = temp.findIndex((item: TodoObj) => item.id === id)
    // temp.splice(matchedIndex, 1)
    // setTodo(temp)
    setTodos(todos.filter((item: TodoObj) => id !== item.id))
  }

  // enter edit mode by changing the boolean property of the object
  function enterEditMode(id: number) {
    setTodos(
      (prevState: TodoObj[]) => (
        prevState.map(
          (item: TodoObj) => (
            id === item.id

              ? {
                ...item,
                editMode: !item.editMode
              }

              : item
          )
        )
      )
    )
  }

  // save edited todo
  function saveEditedTodo(id: number, editedTodo: string) {
    setTodos(
      (prevState: TodoObj[]) => (
        prevState.map(
          (item: TodoObj) => (
            id === item.id

              ? {
                ...item,
                editMode: !item.editMode,
                todo: editedTodo
              }

              : item
          )
        )
      )
    )
  }

  // changed checked value
  function changeChecked(id: number) {
    setTodos(
      (prevState: TodoObj[]) => (
        prevState.map(
          (item: TodoObj) => (
            id === item.id

              ? {
                ...item,
                checked: !item.checked
              }

              : item
          )
        )
      )
    )
  }

  return (
    <FunctionContext.Provider value={{ removeTodo, enterEditMode, saveEditedTodo, changeChecked }} >
      <div className='py-8 px-2 md:px-20'>
        <div className="container mx-auto bg-graay py-8 px-4 sm:px-12 rounded-lg flex flex-col gap-10">
          <h1 className='text-center text-4xl text-bluey font-semibold underline'>My Todos</h1>
          <Header setTodos={setTodos} />
          <hr className='border border-gray-300' />
          <TodoContainer todos={todos} />
        </div >
      </div>
    </FunctionContext.Provider>
  )
}

export default App
