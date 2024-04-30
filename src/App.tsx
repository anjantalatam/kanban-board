import "./App.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <>
      <ThemeProvider>
        <Button className="bg-primary">Click here</Button>
        <ModeToggle />
      </ThemeProvider>
    </>
  );
}

export default App;
