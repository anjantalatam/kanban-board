import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Label } from "@radix-ui/react-label";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const handleSwitchToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">
        <Sun className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />
      </Label>
      <Switch
        id="airplane-mode"
        className="primary"
        checked={theme === "dark"}
        onCheckedChange={handleSwitchToggle}
      />
      <Label htmlFor="airplane-mode">
        <Moon className="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100" />
      </Label>
    </div>
  );
}
