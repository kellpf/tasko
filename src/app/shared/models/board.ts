export interface Task {
  id: string;
  title: string;
  description: string;
  tags?: TagProp[];
}

export interface ColumnProp {
  id: string;
  title: string;
  tasks?: Task[];
}

export interface Board {
  columns: ColumnProp[];
}

export interface TagProp {
  label: string;
  color: TagColor;
}

export type TagColor = 'blue' | 'purple' | 'orange' | 'green' | 'pink' | 'gray';



