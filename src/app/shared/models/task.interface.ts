export interface TaskResponse {
  projectId: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

export interface DefaultResponse {
  mensaje: string;
  code?: number;
}