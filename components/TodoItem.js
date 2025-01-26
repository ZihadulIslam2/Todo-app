import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import deleteIcon from '../assets/delete.png'
const TodoItem = ({ item, onDelete }) => {
  return (
    <>
      <View style={styles.todoItem}>
        <Text>{item.value}</Text>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Image source={deleteIcon} style={styles.deleteIconStyle} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#efefef',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  deleteIconStyle: {
    width: 20,
    height: 20,
    marginLeft: 10,
  }
})

export default TodoItem
