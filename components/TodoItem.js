import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const TodoItem = ({ item, onDelete }) => {
    return(
        <TouchableOpacity onPress={()=>onDelete(item.id)}>
            <View style={styles.todoItem}>
                <Text>{item.value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   todoItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f8f8',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5
}
})

export default TodoItem;