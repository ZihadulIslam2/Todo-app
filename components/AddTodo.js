import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'

const AddTodo = ({ onAddTodo }) => {
  const [todo, setTodo] = useState('')

  const todoInputHandler = (enteredText) => {
    setTodo(enteredText)
  }

  const addTodo = () => {
    if (todo.trim() === '') return
    onAddTodo(todo)
    setTodo('')
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a new task"
        style={styles.input}
        onChangeText={todoInputHandler}
        value={todo}
      />
      <TouchableOpacity onPress={addTodo} style={styles.button}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    backgroundColor: '#DBE9F4',
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
  button: {
    margin: 10,
    backgroundColor: '#24A0ED', 
    padding: 10,
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
  },
})

export default AddTodo
