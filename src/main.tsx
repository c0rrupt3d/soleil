import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "@fontsource-variable/inter";
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main vaul-drawer-wrapper="" className="flex h-full min-w-svw w-full bg-background">
      <App />
    </main>
    <Toaster/>
    <Analytics/>
  </React.StrictMode>
);
