import React from 'react'
import { View, StyleSheet } from 'react-native'

const CheckboxIcon = ({ checked }) => {
  return (
    <View style={styles.checkbox}>
      {checked && <View style={styles.checked} />}
    </View>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
    borderRadius: 2,
  },
})

export default CheckboxIcon
