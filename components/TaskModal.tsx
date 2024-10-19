import { Task } from "@/types";
import React, { useEffect } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  editingTask: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingTask,
}) => {
  const [taskData, setTaskData] = React.useState<
    Omit<Task, "id" | "completed">
  >({
    title: "",
    description: "",
    priority: "medium",
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
      });
    } else {
      setTaskData({ title: "", description: "", priority: "medium" });
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: editingTask ? editingTask.id : Date.now(),
      completed: editingTask ? editingTask.completed : false,
      ...taskData,
    };
    onSubmit(newTask);
    setTaskData({ title: "", description: "", priority: "medium" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center z-20">
      <div className="bg-neutral-800 p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-950"
            required
          />
          <textarea
            placeholder="Task Description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
            className="w-full p-2 mb-2 border rounded bg-gray-950"
            required
          />
          <select
            value={taskData.priority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTaskData({
                ...taskData,
                priority: e.target.value as "high" | "medium" | "low",
              })
            }
            className="w-full p-2 mb-4 border rounded bg-gray-950"
          >
            {["high", "medium", "low"].map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </option>
            ))}
          </select>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
