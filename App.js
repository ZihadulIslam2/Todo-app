import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import Navbar from './components/Navbar'
import bgImage from './assets/todo background image.png'

export default function App() {
  const [todos, setTodos] = useState([])
  const [activeView, setActiveView] = useState('current') // 'current', 'history', or 'collection'

  // Load todos from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await AsyncStorage.getItem('todos')
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos))
      }
    }
    loadTodos()
  }, [])

  // Save todos to AsyncStorage whenever the todos state changes
  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Function to add a new todo
  const addTodoHandler = (todo) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Math.random().toString(), value: todo, completed: false },
    ])
  }

  // Function to delete a todo
  const deleteTodoHandler = (todoId) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId)
    })
  }

  // Function to toggle todo completion
  const toggleTodoComplete = (todoId) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    })
  }

  // Sort todos: incomplete first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0
    return a.completed ? 1 : -1
  })

  // Filter todos based on the active view
  const filteredTodos = sortedTodos.filter((todo) => {
    if (activeView === 'current') return !todo.completed
    if (activeView === 'history') return todo.completed
    return true // 'collection' view shows all todos
  })

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Navbar activeView={activeView} setActiveView={setActiveView} />
        {activeView === 'current' && <AddTodo onAddTodo={addTodoHandler} />}
        <FlatList
          data={filteredTodos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onDelete={deleteTodoHandler}
              onToggleComplete={toggleTodoComplete}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
})
