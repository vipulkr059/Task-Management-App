import SearchBar from "@/components/SearchBar";
import TaskList from "@/components/TaskList";
import TaskModal from "@/components/TaskModal";
import { Task } from "@/types";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  const tasks = [
    {
      id: 1,
      title: "Study",
      description: "Module 1 need to be completed",
      priority: "medium",
      completed: false,
    },
    {
      id: 2,
      title: "Complete Assignment",
      description: "Finish NextJS project",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      title: "Go for a walk",
      description: "30-minute walk in the park",
      priority: "low",
      completed: false,
    },
  ];

  return { props: { initialTasks: tasks } };
}

export default function Home({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      const storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
          setTasks(parsedTasks);
        } else {
          setTasks(initialTasks);
        }
      }
    } else {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    if (editingTask) {
      updateTask(newTask);
    } else {
      setTasks([newTask, ...tasks]);
    }
    setEditingTask(null);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleCompleted = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 flex p-8">
      <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="md:block hidden text-2xl font-bold">
            {" "}
            <span className="underline underline-offset-8 decoration-green-500">
              {" "}
              Task
            </span>{" "}
            Manager
          </h1>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            onClick={() => {
              setModalOpen(true);
              setEditingTask(null);
            }}
            className="bg-blue-500 text-white p-4 rounded-full w-5 h-5 flex items-center justify-center font-semibold text-xl"
          >
            +
          </button>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={addTask}
          editingTask={editingTask}
        />

        <TaskList
          tasks={filteredTasks}
          onEdit={openEditModal}
          onDelete={deleteTask}
          onToggleCompleted={toggleCompleted}
        />
      </div>
    </div>
  );
}
