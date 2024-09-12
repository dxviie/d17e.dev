import {getPlaiceholder} from "plaiceholder";

export async function getBlurHashFromImage(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  const {base64} = await getPlaiceholder(Buffer.from(buffer));
  return base64;
}