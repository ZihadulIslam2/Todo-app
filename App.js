import React, { useState } from 'react'
import { StyleSheet, Text, View,FlatList, Button, TextInput,  } from 'react-native'
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';

export default function App() {
  const [todos, setTodos] = useState([])

  const addTodoHandler = (todo)=>{
    setTodos((setTodos)=>[ 
      ...currentTodos,
      { id: Math.random().toString(), value: todo}
    ])
  };

  const deleteTodoHandler = (todoId)=>{
    setTodos((currentTodos)=>{
      return currentTodos.filter((todo)=> todo.id != todoId)
    })
  }

  return (
    <View style={styles.container}>
     <AddTodo onAddTodo={addTodoHandler}/>
     <FlatList 
     data={todos}
     renderItem={({item})=>(
      <TodoItem item={item} onDelete={deleteTodoHandler}/>
     )}
     keyExtractor={(item, index)=>item.id}
     />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
   padding: 50
  },
})
