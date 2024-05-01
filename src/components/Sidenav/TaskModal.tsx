import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TTask, useKanbanStore } from "@/store";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const statuses = [
  {
    label: "TODO",
    value: "todo",
  },
  {
    label: "DOING",
    value: "doing",
  },
  {
    label: "DONE",
    value: "done",
  },
];

export enum ETaskAction {
  Create = "create",
  Update = "update",
  Delete = "delete",
}

type ITaskModal =
  | {
      action: ETaskAction.Create;
      title: string;
      modalTrigger: React.ReactNode;
      task?: undefined;
    }
  | {
      action: ETaskAction.Update;
      title: string;
      modalTrigger: React.ReactNode;
      task: TTask;
    };

function TaskModal({ action, modalTrigger, task, title }: ITaskModal) {
  const [name, setName] = useState(task?.name ?? "");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(task?.status ?? "");

  const { activeBoardId, createNewTask, updateTask, deleteTask } =
    useKanbanStore();

  const handleTaskSubmit = (customAction?: ETaskAction) => {
    setOpen(false);
    const taskAction = customAction ?? action;

    switch (taskAction) {
      case ETaskAction.Create:
        if (activeBoardId) {
          createNewTask(activeBoardId, {
            id: new Date().getTime(),
            name,
            status,
          });
        }
        break;
      case ETaskAction.Update:
        if (task && activeBoardId) {
          updateTask(activeBoardId, {
            id: task.id,
            name,
            status,
          });
        }
        break;

      case ETaskAction.Delete:
        if (task && activeBoardId) {
          deleteTask(activeBoardId, task.id);
        }
    }
  };

  const getTaskAction = (action: ETaskAction) => {
    switch (action) {
      case ETaskAction.Create:
        return "Create New Task";

      case ETaskAction.Update:
        return "Update Task";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              minLength={4}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select the status of the task" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleTaskSubmit()}>
            {getTaskAction(action)}
          </Button>

          {action === "update" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    variant="destructive"
                    onClick={() => handleTaskSubmit(ETaskAction.Delete)}>
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Task</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskModal;
