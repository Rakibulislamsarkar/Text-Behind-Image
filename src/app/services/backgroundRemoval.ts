import { RemoveBgResult, removeBackgroundFromImageBase64 } from "remove.bg";

export async function removeBackground(imageFile: File): Promise<Blob> {
  // Convert File to base64
  const base64Image = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      resolve(base64String.split(',')[1]);
    };
    reader.readAsDataURL(imageFile);
  });

  try {
    const result = await removeBackgroundFromImageBase64({
      base64img: base64Image,
      apiKey: process.env.NEXT_PUBLIC_REMOVEBG_API_KEY!,
      size: 'regular',
      type: 'auto'
    });

    // Convert the response to a Blob
    return new Blob([Buffer.from(result.base64img, 'base64')], { type: 'image/png' });
  } catch (error) {
    console.error('Background removal failed:', error);
    throw error;
  }
}