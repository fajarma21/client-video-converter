export interface ProgressStore {
  converting: boolean;
  isError: boolean;
  progress: number;
  messages: string[];
  time: number;
  finishConverting: (time: number) => void;
  convertError: (error: string) => void;
  startConverting: (name: string) => void;
  updateProgress: (value: number) => void;
  updateMessage: (value: string) => void;
  resetProgress: () => void;
}
