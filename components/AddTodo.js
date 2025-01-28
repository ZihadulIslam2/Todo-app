import React, { useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
} from 'react-native'

const AddTodo = ({ onAddTodo, labels }) => {
  const [todo, setTodo] = useState('')
  const [selectedLabels, setSelectedLabels] = useState([])
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false)

  const todoInputHandler = (enteredText) => {
    setTodo(enteredText)
  }

  const addTodo = () => {
    if (todo.trim() === '') return
    onAddTodo(todo, selectedLabels)
    setTodo('')
    setSelectedLabels([])
  }

  const toggleLabel = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label))
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a new task"
        style={styles.input}
        onChangeText={todoInputHandler}
        value={todo}
      />
      <TouchableOpacity
        onPress={() => setIsLabelModalVisible(true)}
        style={styles.labelButton}
      >
        <Text style={styles.labelButtonText}>Labels</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addTodo} style={styles.button}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>
      <Modal
        visible={isLabelModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={labels}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.labelItem,
                    selectedLabels.includes(item) && styles.selectedLabel,
                  ]}
                  onPress={() => toggleLabel(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsLabelModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderColor: 'black',
    backgroundColor: '#DBE9F4',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  labelButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  labelButtonText: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#24A0ED',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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
    maxHeight: '80%',
  },
  labelItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedLabel: {
    backgroundColor: '#e0e0e0',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#24A0ED',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default AddTodo
