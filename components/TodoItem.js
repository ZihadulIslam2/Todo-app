import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import CheckboxIcon from './CheckboxIcon'
import deleteIcon from '../assets/delete.png'

const TodoItem = ({ item, onDelete, onToggleComplete, labels }) => {
  return (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => onToggleComplete(item.id)}
      >
        <CheckboxIcon checked={item.completed} />
        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoText,
              item.completed && styles.completedTodoText,
            ]}
          >
            {item.value}
          </Text>
          <ScrollView horizontal style={styles.labelContainer}>
            {item.labels && item.labels.length > 0 ? (
              item.labels.map((label) => (
                <View key={label} style={styles.label}>
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noLabelText}>No labels</Text>
            )}
          </ScrollView>
        </View>
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
  todoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  label: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 5,
  },
  labelText: {
    fontSize: 12,
  },
  noLabelText: {
    fontSize: 12,
    color: '#888',
  },
})

export default TodoItem
