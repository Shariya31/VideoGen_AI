export async function fetchVisuals(query) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    
    // First try to get a video (if available)
    if (data.photos[0]?.video_files?.[0]?.link) {
      return data.photos[0].video_files[0].link;
    }
    
    // Fall back to image if no video found
    if (data.photos[0]?.src?.original) {
      return data.photos[0].src.original;
    }
    
    throw new Error("No media found for this query");
  } catch (error) {
    console.error("Error fetching visuals:", error);
    throw error;
  }
}