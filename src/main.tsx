import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/theme-provider";
import App from "./App";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorBackground: "#0f172a",
          colorText: "#f8fafc",
          colorPrimary: "#ffffff",
          colorInputBackground: "#1e293b",
          colorInputText: "#f8fafc",
          colorTextSecondary: "#94a3b8",
        },
        elements: {
          card: {
            backgroundImage: "url('/bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "1px solid #1e293b",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          },
          socialButtonsBlockButton: {
            backgroundColor: "#1e293b",
            borderColor: "#334155",
            color: "#f8fafc",
          },
          formFieldInput: {
            backgroundColor: "#1e293b",
            borderColor: "#334155",
          },
          footerActionLink: {
            color: "#f8fafc",
            textDecoration: "underline",
          },
        }
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ThemeProvider defaultTheme="dark" storageKey="codemaster-theme">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);
