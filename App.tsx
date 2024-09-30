import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useTasks} from './src/hooks/useTasks';

const App = () => {
  const {tasks, newTask, quote, setNewTask, addTask, completeTask, deleteTask} =
    useTasks();

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView style={styles.sectionContainer}>
        <View>
          <TextInput
            placeholder="Add new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Add Task" onPress={addTask} />

          <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.taskItemContainer}>
                <TouchableOpacity>
                  <View style={styles.taskItemContainer}>
                    <Text
                      style={
                        item.completed
                          ? styles.taskItemCompleted
                          : styles.taskItem
                      }>
                      {item.text}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.taskItemButtonContainer}>
                  <TouchableOpacity onPress={() => completeTask(item.id)}>
                    <Text style={styles.taskItemButton}>
                      {item.completed ? 'Completed!' : 'Complete Item'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Text style={styles.taskItemButton}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          {quote && <Text style={styles.quote}>{quote}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  taskItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskItem: {
    fontSize: 12,
    marginVertical: 8,
  },
  taskItemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  taskItemButton: {
    fontSize: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    color: 'blue',
  },
  taskItemCompleted: {
    fontSize: 12,
    marginVertical: 8,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  quote: {
    marginTop: 20,
    fontSize: 20,
    color: 'blue',
    fontStyle: 'italic',
  },
});

export default App;
