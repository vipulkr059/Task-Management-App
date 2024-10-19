import { BiPencil, BiTrash } from "react-icons/bi";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleCompleted: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
}

const priorities = { high: 1, medium: 2, low: 3 };

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompleted,
  onDelete,
  onEdit,
}) => {
  const sortedTasks = [...tasks].sort(
    (a, b) => priorities[a.priority] - priorities[b.priority]
  );

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`p-4 bg-neutral-800 rounded-lg shadow-sm border border-gray-200 ${
            task.completed ? "opacity-50" : ""
          }`}
        >
          <div className="flex flex-col  gap-4 w-full">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center gap-2 w-full">
                <h3 className="md:text-xl text-lg font-semibold">
                  {task.title}
                </h3>
                <div
                  className={`font-medium flex items-center justify-center rounded-2xl md:w-[90px] w-fit md:px-4 px-2 md:text-base text-xs ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() +
                    task.priority.slice(1)}
                </div>
              </div>
              <p className="md:text-base text-sm">{task.description}</p>
              <div className="flex items-center  gap-3">
                <button
                  onClick={() => onToggleCompleted(task.id)}
                  className={` text-white p-1 rounded md:text-base text-sm flex items-center justify-center ${
                    task.completed ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="bg-blue-500 text-white p-1 rounded md:text-base text-sm flex items-center justify-center"
                >
                  <BiPencil className="text-xl" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 text-white p-1 rounded md:text-base text-sm flex items-center justify-center"
                >
                  <BiTrash className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
