import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AssessmentProvider } from '@/context/AssessmentContext';
import { App } from './App';
import './styles/globals.css';

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error(
    '[Loka Financial Journey] Root element #root not found. Check index.html.',
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </StrictMode>,
);
