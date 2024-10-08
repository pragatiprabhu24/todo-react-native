import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  View, 
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Icon from "react-native-vector-icons/FontAwesome";

const noTasksImage = require("@/assets/images/task.png");

interface Task {
  id: string;
  text: string;
}

const HomeScreen: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]); 

  const addTask = () => {
    if (task.trim() === "") {
      Alert.alert("Error", "Please enter a task");
      return;
    }
    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setTask("");
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.fullContainer}>
      <ThemedView style={styles.titleContainer}>
        <HelloWave />
        <ThemedText type="title" style={styles.textHead}>
          Hello, Welcome to daily task
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="plus" size={20} color="#fff" />
          <ThemedText style={styles.addButtonText}>Add New Task</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.taskCount}>
        Total Tasks: {tasks.length}
      </ThemedText>

      {tasks.length === 0 ? (
        <ThemedView style={styles.noTasksContainer}>
          <Image source={noTasksImage} style={styles.noTasksImage} />
          <ThemedText style={styles.noTasksText}>
            No tasks available. Add one!
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ThemedView style={styles.taskContainer}>
              <ThemedText style={styles.taskText}>
                <ThemedText style={styles.index}>{index + 1}</ThemedText>.{" "}
                {item.text}
              </ThemedText>
              <TouchableOpacity onPress={() => removeTask(item.id)}>
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
            </ThemedView>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    marginTop: 36,
  },
  textHead: {
    fontSize: 18,
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
  },
  taskCount: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00FF9C",
  },
  noTasksContainer: {
    alignItems: "center",
    marginVertical: 40,
    borderRadius: 50,
  },
  noTasksImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  noTasksText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "500",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    color: "black",
  },
  index: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default HomeScreen;
