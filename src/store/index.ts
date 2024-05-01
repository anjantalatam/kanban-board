import { create } from "zustand";
import { sampleData } from "@/lib/data.js";

export type TStore = {
  boards: TBoard[];
  activeBoardId: number | null;
};

export type TBoard = {
  id: number;
  name: string;
  tasks: TTask[];
};

export type TTask = {
  id: number;
  name: string;
  status: string;
};

type Action = {
  createNewBoard: (boardName: TBoard["name"]) => void;
  updateBoard: (boardId: TBoard["id"], newBoardName: TBoard["name"]) => void;
  deleteBoard: (boardId: TBoard["id"]) => void;
  updateActiveBoardId: (id: TStore["activeBoardId"]) => void;
  createNewTask: (boardId: TBoard["id"], task: TTask) => void;
  updateTask: (boardId: TBoard["id"], updatedTask: TTask) => void;
  deleteTask: (boardId: TBoard["id"], taskId: TTask["id"]) => void;
};

export const useKanbanStore = create<TStore & Action>((set) => ({
  boards: sampleData.boards,
  activeBoardId: sampleData.activeBoardId,
  updateActiveBoardId: (boardId) =>
    set((boards) => ({
      ...boards,
      activeBoardId: boardId,
    })),
  createNewBoard: (boardName) =>
    set((currenTStore) => {
      const id = new Date().getTime();
      return {
        activeBoardId: id,
        boards: [
          {
            id,
            name: boardName,
            tasks: [],
          },
          ...currenTStore.boards,
        ],
      };
    }),

  updateBoard: (boardId, newBoardName) =>
    set((currentStore) => {
      return {
        ...currentStore,
        boards: currentStore.boards.map((board) => {
          if (board.id === boardId) {
            return { ...board, name: newBoardName };
          }
          return board;
        }),
      };
    }),

  deleteBoard: (boardId) =>
    set((currentStore) => {
      return {
        ...currentStore,
        boards: currentStore.boards.filter((board) => board.id !== boardId),
      };
    }),

  createNewTask: (boardId, newTask) =>
    set((currenTStore) => ({
      ...currenTStore,
      boards: currenTStore.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: [newTask, ...board.tasks],
          };
        }
        return board;
      }),
    })),

  updateTask: (boardId, updatedTask) =>
    set((currenTStore) => ({
      ...currenTStore,
      boards: currenTStore.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task.id === updatedTask.id) {
                return { ...task, ...updatedTask };
              }
              return task;
            }),
          };
        }
        return board;
      }),
    })),

  deleteTask: (boardId, taskId) =>
    set((currenTStore) => ({
      ...currenTStore,
      boards: currenTStore.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      }),
    })),
}));
