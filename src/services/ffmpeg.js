import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({
  log: true,
  // corePath: "https://unpkg.com/@ffmpeg/core@0.12.4/dist/ffmpeg-core.js", // Optional CDN for stability
});

export async function createVideo(imageUrl, audioUrl) {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  ffmpeg.FS("writeFile", "image.jpg", await fetchFile(imageUrl));
  ffmpeg.FS("writeFile", "audio.mp3", await fetchFile(audioUrl));

  await ffmpeg.run(
    "-loop", "1",
    "-i", "image.jpg",
    "-i", "audio.mp3",
    "-c:v", "libx264",
    "-t", "10",
    "-pix_fmt", "yuv420p",
    "output.mp4"
  );

  const data = ffmpeg.FS("readFile", "output.mp4");
  const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
  return URL.createObjectURL(videoBlob);
}
