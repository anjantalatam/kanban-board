import { TStore } from "@/store";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getActiveBoard(store: TStore) {
  const { boards, activeBoardId } = store;
  return boards.find((board) => board.id === activeBoardId);
}
