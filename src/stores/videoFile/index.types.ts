export interface VideoFileStore {
  videoFile?: File;
  updateVideoFile: (value?: File) => void;
}
