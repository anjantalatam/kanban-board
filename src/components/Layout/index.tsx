import { EllipsisVertical, Plus } from "lucide-react";
import Board from "../Board";
import Sidenav from "../Sidenav";
import TaskModal, { ETaskAction } from "../Sidenav/TaskModal";
import { Button } from "../ui/button";
import BoardModal, { EBoardAction } from "../Sidenav/BoardModal";
import { useKanbanStore } from "@/store";
import { getActiveBoard } from "@/lib/utils";

function Layout() {
  const store = useKanbanStore();
  const board = getActiveBoard(store);
  return (
    <main className="flex">
      <Sidenav />
      <div className="flex-1 flex flex-col border-l-2">
        <nav className="bg-[#2c2c39] w-full bg-secondary h-[5rem] px-7 flex justify-between items-center shadow-bottom">
          <span className="text-xl font-semibold">Platform Launch</span>
          <section className="flex items-center">
            <TaskModal
              action={ETaskAction.Create}
              title="Add New Task"
              modalTrigger={
                <Button className="rounded-2xl">
                  <Plus className="h-4 w-4" />
                  Add New Task
                </Button>
              }
            />

            {board?.name && (
              <BoardModal
                action={EBoardAction.Update}
                currentBoard={board}
                modalTrigger={<EllipsisVertical className="cursor-pointer" />}
              />
            )}
          </section>
        </nav>
        <Board />
      </div>
    </main>
  );
}

export default Layout;
