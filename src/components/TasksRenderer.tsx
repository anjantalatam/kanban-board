import { TTask } from "@/store";
import TaskModal, { ETaskAction } from "./Sidenav/TaskModal";

function TasksRenderer({ tasks }: { tasks: TTask[] }) {
  console.log(tasks, "ts");
  if (tasks == null) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskModal
          action={ETaskAction.Update}
          title=""
          task={task}
          modalTrigger={
            <div className="w-full px-3 py-4 bg-secondary rounded-lg hover:text-primary cursor-pointer shadow-md">
              <span className="font-bold">{task.name}</span>
            </div>
          }
        />
      ))}
    </div>
  );
}

export default TasksRenderer;
