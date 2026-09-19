export interface Task {
  id: string;
  title: string;
  description: string;
  // Add priority
}

export interface ColumnProp {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  columns: ColumnProp[];
}

