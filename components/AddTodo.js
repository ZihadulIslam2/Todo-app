import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

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
      <Button title="Add" onPress={addTodo} />
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
    borderWidth: 1,
    padding: 10,
    width: '80%',
  },
})

export default AddTodo
