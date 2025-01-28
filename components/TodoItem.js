import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import CheckboxIcon from './CheckboxIcon'
import deleteIcon from '../assets/delete.png'

const TodoItem = ({ item, onDelete, onToggleComplete }) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => onToggleComplete(item.id)}
      >
        <CheckboxIcon checked={item.completed} />
        <Text
          style={[styles.todoText, item.completed && styles.completedTodoText]}
        >
          {item.value}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Image source={deleteIcon} style={styles.deleteIconStyle} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#efefef',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    marginLeft: 10,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteIconStyle: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
})

export default TodoItem
