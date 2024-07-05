import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(index)}
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.name}
                </span>
                <Button variant="outline" size="sm" onClick={() => deleteTask(index)}>
                  Delete
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label htmlFor="taskName">Task Name</Label>
                      <Input
                        id="taskName"
                        value={task.name}
                        onChange={(e) =>
                          setTasks(
                            tasks.map((t, i) =>
                              i === index ? { ...t, name: e.target.value } : t
                            )
                          )
                        }
                      />
                      <Label htmlFor="taskDescription">Description</Label>
                      <Textarea id="taskDescription" />
                      <Button onClick={() => setSelectedTask(null)}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
            <div className="flex items-center space-x-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <Button onClick={addTask}>Add Task</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;