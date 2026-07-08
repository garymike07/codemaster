import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { useAuth } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider';
import { ToastProvider } from './hooks/useToast';
import App from './App';
import './index.css';

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const missingVars: string[] = [];
if (!CONVEX_URL) missingVars.push('VITE_CONVEX_URL');
if (!CLERK_PUBLISHABLE_KEY) missingVars.push('VITE_CLERK_PUBLISHABLE_KEY');

// eslint-disable-next-line react-refresh/only-export-components
function SetupGuide() {
  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚙️ CodeMaster — Setup Required</h1>
      <p style={{ marginBottom: '1rem' }}>
        The following environment variables are missing from{' '}
        <code style={{ background: '#f0f0f0', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
          .env.local
        </code>
        :
      </p>
      <ul style={{ marginBottom: '1rem' }}>
        {missingVars.map((v) => (
          <li key={v} style={{ color: '#d32f2f' }}>
            <strong>{v}</strong>
          </li>
        ))}
      </ul>
      <div
        style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Quick start:</strong>
        </p>
        {!CLERK_PUBLISHABLE_KEY && (
          <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            1. Create a free account at <a href="https://clerk.com">clerk.com</a> → get your
            Publishable Key
            <br />
            2. Add it to <code>.env.local</code>:{' '}
            <code>VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code>
          </p>
        )}
        {!CONVEX_URL && (
          <p style={{ fontSize: '0.875rem' }}>
            1. Run <code>bunx convex dev</code> to start the local backend
            <br />
            2. Copy the deployment URL and add <code>VITE_CONVEX_URL=...</code> to{' '}
            <code>.env.local</code>
          </p>
        )}
      </div>
      <p style={{ fontSize: '0.75rem', color: '#666' }}>
        After updating <code>.env.local</code>, restart the dev server.
      </p>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function ConfigGuard({ children }: { children: ReactNode }) {
  if (missingVars.length > 0) {
    return <SetupGuide />;
  }
  return <>{children}</>;
}

const convex = new ConvexReactClient(CONVEX_URL!);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigGuard>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY!}
        sdkMetadata={{
          name: 'codemaster',
          version: '1.0.0',
        }}
        appearance={{
          variables: {
            colorBackground: '#0f172a',
            colorText: '#faf9f6',
            colorPrimary: '#14b8a6',
            colorInputBackground: '#1e293b',
            colorInputText: '#faf9f6',
            colorTextSecondary: '#94a3b8',
            borderRadius: '0px',
          },
          elements: {
            card: {
              backgroundImage: "url('/bg.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '1px solid #1e293b',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            socialButtonsBlockButton: {
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              color: '#f8fafc',
            },
            formFieldInput: {
              backgroundColor: '#1e293b',
              borderColor: '#334155',
            },
            footerActionLink: {
              color: '#f8fafc',
              textDecoration: 'underline',
            },
          },
        }}
      >
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <ThemeProvider defaultTheme="dark" storageKey="codemaster-theme">
            <ToastProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ToastProvider>
          </ThemeProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ConfigGuard>
  </React.StrictMode>
);
