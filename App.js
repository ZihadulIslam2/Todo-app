import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'

export default function App() {
  const [todos, setTodos] = useState([])

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
      { id: Math.random().toString(), value: todo },
    ])
  }

  // Function to delete a todo
  const deleteTodoHandler = (todoId) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId)
    })
  }

  return (
    <View style={styles.container}>
      <AddTodo onAddTodo={addTodoHandler} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem item={item} onDelete={deleteTodoHandler} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
})
