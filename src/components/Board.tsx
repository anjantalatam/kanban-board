import { TTask, useKanbanStore } from "@/store";
import TasksRenderer from "./TasksRenderer";
import clsx from "clsx";
import { getActiveBoard } from "@/lib/utils";

function getTasksByStatus(tasks: TTask[]) {
  const tasksByStatus: Record<string, TTask[]> = {};

  tasks.forEach((task) => {
    if (tasksByStatus[task.status]) {
      tasksByStatus[task.status].push(task);
    } else {
      tasksByStatus[task.status] = [task];
    }
  });

  return tasksByStatus;
}

const boardStatuses = [
  {
    value: "todo",
    statusColor: "bg-[#0ba5e9]",
  },
  {
    value: "doing",
    statusColor: "bg-[#ec4899]",
  },
  {
    value: "done",
    statusColor: "bg-[#67e2ae]",
  },
];

function Board() {
  const store = useKanbanStore();

  const board = getActiveBoard(store);
  const tasksByStatus = board?.tasks ? getTasksByStatus(board?.tasks) : {};

  return (
    <div className="flex-1 flex gap-10 py-4 pl-8">
      {boardStatuses.map(({ value: status, statusColor }) => {
        return (
          <div className="flex-1 max-w-[30%] h-full" key={status}>
            <span className="text-secondary-foreground">
              <div
                className={clsx(
                  "w-3 h-3 rounded-full text-secondary inline-block mr-2",
                  statusColor
                )}></div>
              {status.toLocaleUpperCase()} ({tasksByStatus[status]?.length ?? 0}
              )
            </span>
            <TasksRenderer tasks={tasksByStatus[status] ?? null} />
          </div>
        );
      })}
    </div>
  );
}

export default Board;
