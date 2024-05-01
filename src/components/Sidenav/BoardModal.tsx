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
import { TBoard, useKanbanStore } from "@/store";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

export enum EBoardAction {
  Create = "create",
  Update = "update",
  Delete = "delete",
}

type TBoardModal =
  | {
      action: EBoardAction.Create;
      title: string;
      modalTrigger: React.ReactNode;
      currentBoard?: undefined;
    }
  | {
      action: EBoardAction.Update;
      title?: string;
      modalTrigger: React.ReactNode;
      currentBoard: TBoard;
    };

function BoardModal({
  title,
  action,
  modalTrigger,
  currentBoard,
}: TBoardModal) {
  const [name, setName] = useState(currentBoard?.name ?? "");
  const [open, setOpen] = useState(false);
  const { createNewBoard, updateBoard, deleteBoard } = useKanbanStore();

  const handleBoardSubmit = (customAction?: EBoardAction) => {
    const boardAction = customAction ?? action;
    console.log("here-0");

    switch (boardAction) {
      case EBoardAction.Create:
        createNewBoard(name);
        setName("");
        break;
      case EBoardAction.Update:
        if (currentBoard) {
          updateBoard(currentBoard.id, name);
        }
        break;
      case EBoardAction.Delete:
        if (currentBoard) {
          deleteBoard(currentBoard.id);
        }
        break;
    }

    setOpen(false);
  };

  const getBoardActionName = (action: EBoardAction) => {
    switch (action) {
      case EBoardAction.Create:
        return "Create New Board";

      case EBoardAction.Update:
        return "Update Board";
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handleBoardSubmit()}>
            {getBoardActionName(action)}
          </Button>

          {action === "update" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    variant="destructive"
                    onClick={() => handleBoardSubmit(EBoardAction.Delete)}>
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

export default BoardModal;
