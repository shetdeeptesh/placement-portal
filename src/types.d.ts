import { RootState as ReduxRootState } from './utils/store'; // Update the path to match your actual store location

// Extend the global Window type to include RootState
declare global {
  interface Window {
    RootState: ReduxRootState;
  }
}