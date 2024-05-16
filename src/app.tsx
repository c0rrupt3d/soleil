import "./app.css";
import Header from "@/components/header";
import Layout from "@/components/layout";
import { useShallow } from "zustand/react/shallow";
import { useThemeStore } from "./store/themeStore";
import { useEffect } from "react";


function App() {

  const { theme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex flex-col w-full">
    <Header/>
      <div className="opacity-45 hidden dark:flex blur-3xl -z-50p fixed h-full w-full overflow-hidden pointer-events-none">
        <div className=" bg-[radial-gradient(circle,rgba(180,57,102,0.5)_0%,rgba(0,0,0,0)_60%)] absolute flex w-[35rem] h-[35rem] -bottom-0 -left-20"></div>
        <div className=" bg-[radial-gradient(circle,rgba(111,47,172,0.5)_0%,rgba(0,0,0,0)_60%)] absolute flex w-[35rem] h-[35rem] bottom-40 -left-10"></div>
        <div className=" bg-[radial-gradient(circle,rgba(21,38,175,0.5)_0%,rgba(0,0,0,0)_60%)] absolute flex w-[35rem] h-[35rem] top-722 right-10"></div>
        <div className=" bg-[radial-gradient(circle,rgba(21,38,175,0.5)_0%,rgba(0,0,0,0)_60%)] absolute flex w-[35rem] h-[35rem] top-0 -right-40"></div>
        <div className=" bg-[radial-gradient(circle,rgba(180,57,102,0.5)_0%,rgba(0,0,0,0)_60%)] absolute flex w-[35rem] h-[35rem] top-20 right-10"></div>
      </div>
      <Layout/>
    </div>
  );
}

export default App;
