export interface ITodo {
  title: string;
  description: string;
  checked: boolean;
  id?: string;
  _id?: string;
}

export interface ITodos {
  user: string;
  _id: string;
  todos: ITodo[] | [];
}
