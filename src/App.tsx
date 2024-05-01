import "./App.css";

import { ThemeProvider } from "./components/theme-provider";

import Layout from "@/components/Layout";

function App() {
  return (
    <>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </>
  );
}

export default App;
