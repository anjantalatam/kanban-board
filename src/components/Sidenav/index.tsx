import { LayoutDashboard, Plus, SquareGanttChart } from "lucide-react";

import { useKanbanStore } from "@/store";
import clsx from "clsx";
import { ModeToggle } from "../mode-toggle";
import BoardModal, { EBoardAction } from "./BoardModal";
import { Button } from "../ui/button";

function Sidenav() {
  const { boards, updateActiveBoardId, activeBoardId } = useKanbanStore();
  console.log(activeBoardId, "activeBoardId");

  return (
    <div className="h-screen bg-secondary text-secondary-foreground w-[15rem] flex flex-col shadow-right">
      <h1 className="text-3xl h-[5rem] flex items-center justify-center">
        <SquareGanttChart className="text-primary mr-2 h-7 w-7" />
        kanban
      </h1>

      <section className="pt-2 pr-5">
        <p className="text-xs mb-3 pl-4">ALL BOARDS ({boards.length})</p>

        <div className="flex flex-col gap-2 mb-2">
          {boards.map((board) => {
            console.log(board.id, "board.id");
            const isActive = activeBoardId == board.id;
            return (
              <div
                key={board.id}
                className={clsx(
                  {
                    "bg-primary text-primary-foreground": isActive,
                  },
                  "py-2 pl-4 rounded-r-3xl cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  false duration-500 ease-in-out"
                )}
                onClick={() => updateActiveBoardId(board.id)}>
                <span className="flex gap-2 items-center">
                  <LayoutDashboard className="h-5 w-5" />
                  {board.name}
                </span>
              </div>
            );
          })}
        </div>

        <BoardModal
          action={EBoardAction.Create}
          title="Create New Board"
          modalTrigger={
            <Button variant="link" className="flex gap-2 items-center">
              <LayoutDashboard className="h-5 w-5" />
              <span className="flex items-center">
                <Plus className="h-3 w-3" />
                Create New Board
              </span>
            </Button>
          }
        />
      </section>
      <section className="mt-auto bg-[#f4f7fc] p-4 dark:bg-[#20212c] flex justify-center m-3 mb-5 rounded-xl">
        <ModeToggle />
      </section>
    </div>
  );
}

export default Sidenav;
