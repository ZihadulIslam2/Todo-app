import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

const Navbar = ({ activeView, setActiveView }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[
          styles.navItem,
          activeView === 'current' && styles.activeNavItem,
        ]}
        onPress={() => setActiveView('current')}
      >
        <Text style={styles.navText}>Current</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          activeView === 'history' && styles.activeNavItem,
        ]}
        onPress={() => setActiveView('history')}
      >
        <Text style={styles.navText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          activeView === 'collection' && styles.activeNavItem,
        ]}
        onPress={() => setActiveView('collection')}
      >
        <Text style={styles.navText}>Labels</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  navItem: {
    padding: 10,
  },
  activeNavItem: {
    backgroundColor: '#24A0ED',
    borderRadius: 5,
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Navbar
