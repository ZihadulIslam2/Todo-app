import React from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native'

const Navbar = ({
  activeView,
  setActiveView,
  labels,
  activeLabel,
  setActiveLabel,
  onAddLabel,
}) => {
  return (
    <View>
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
      {activeView === 'collection' && (
        <ScrollView horizontal style={styles.labelContainer}>
          <TouchableOpacity
            style={[
              styles.labelItem,
              activeLabel === 'All' && styles.activeLabelItem,
            ]}
            onPress={() => setActiveLabel('All')}
          >
            <Text style={styles.labelText}>All</Text>
          </TouchableOpacity>
          {labels.map((label) => (
            <TouchableOpacity
              key={label}
              style={[
                styles.labelItem,
                activeLabel === label && styles.activeLabelItem,
              ]}
              onPress={() => setActiveLabel(label)}
            >
              <Text style={styles.labelText}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addLabelButton} onPress={onAddLabel}>
            <Text style={styles.addLabelText}>+</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
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
  labelContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
  },
  labelItem: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    marginRight: 10,
  },
  activeLabelItem: {
    backgroundColor: '#24A0ED',
  },
  labelText: {
    fontSize: 14,
  },
  addLabelButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 15,
  },
  addLabelText: {
    fontSize: 14,
    color: 'white',
  },
})

export default Navbar
