export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}
