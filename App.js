import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Pressable,
  Modal,
  TextInput,
  Text,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import Navbar from './components/Navbar'
import bgImage from './assets/todo background image.png'

export default function App() {
  const [todos, setTodos] = useState([])
  const [activeView, setActiveView] = useState('current') // 'current', 'history', or 'collection'
  const [labels, setLabels] = useState(['Personal', 'Work', 'Shopping'])
  const [activeLabel, setActiveLabel] = useState('All')
  const [isAddLabelModalVisible, setIsAddLabelModalVisible] = useState(false)
  const [newLabel, setNewLabel] = useState('')

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
  const addTodoHandler = (todo, selectedLabels) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Math.random().toString(),
        value: todo,
        completed: false,
        labels: selectedLabels || [],
      },
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

  // Filter todos based on the active view and label
  const filteredTodos = sortedTodos.filter((todo) => {
    if (activeView === 'current') return !todo.completed
    if (activeView === 'history') return todo.completed
    if (activeLabel === 'All') return true
    return todo.labels && todo.labels.includes(activeLabel)
  })

  const addLabel = () => {
    if (newLabel.trim() !== '' && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()])
      setNewLabel('')
      setIsAddLabelModalVisible(false)
    }
  }

  const deleteLabel = (label) => {
    setLabels((currentLabels) => currentLabels.filter((l) => l !== label))
    if (activeLabel === label) {
      setActiveLabel('All')
    }
    // Update todos to remove the deleted label
    setTodos((currentTodos) =>
      currentTodos.map((todo) => ({
        ...todo,
        labels: todo.labels ? todo.labels.filter((l) => l !== label) : [],
      }))
    )
  }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          labels={labels}
          activeLabel={activeLabel}
          setActiveLabel={setActiveLabel}
          onAddLabel={() => setIsAddLabelModalVisible(true)}
          onDeleteLabel={deleteLabel}
        />
        {activeView === 'current' && (
          <AddTodo onAddTodo={addTodoHandler} labels={labels} />
        )}
        <FlatList
          data={filteredTodos}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onDelete={deleteTodoHandler}
              onToggleComplete={toggleTodoComplete}
              labels={labels}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <Modal
          visible={isAddLabelModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.input}
                value={newLabel}
                onChangeText={setNewLabel}
                placeholder="Enter new label"
              />
              <Pressable style={styles.button} onPress={addLabel}>
                <Text style={styles.buttonText}>Add Label</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsAddLabelModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#24A0ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
