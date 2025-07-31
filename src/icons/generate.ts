import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const base = "src/icons";

const inputDir = path.join(base, "source");
const outputDir = path.join("src/lib/assets/icons");
const maskPath = path.join(base, "mask.svg");

async function process() {
  await fs.mkdir(outputDir, { recursive: true });

  const files = await fs.readdir(inputDir);

  for (const file of files) {
    generateIcon(inputDir, outputDir, file);
  }
}

async function generateIcon(input: string, output: string, file: string) {
  const parsed = path.parse(file);
  const name = `${parsed.name}.png`;

  const inputPath = path.join(input, file);
  const outputPath = path.join(output, name);

  try {
    // First, get the image metadata to determine dimensions
    const metadata = await sharp(inputPath).metadata();
    
    // Calculate the size for square cropping (use the smaller dimension)
    const cropSize = Math.min(metadata.width || 1024, metadata.height || 1024);
    
    // Crop to square and resize to 1024x1024
    const resizedInput = await sharp(inputPath)
      .resize(cropSize, cropSize, { fit: 'cover', position: 'center' })
      .resize(1024, 1024, { fit: 'fill' })
      .toBuffer();

    const masked = await sharp(resizedInput)
      .composite([{ input: maskPath, blend: "dest-in", top: 0, left: 0 }])
      .toBuffer();
    
    await sharp(masked).resize(1024).toFormat("png").toFile(outputPath);

    console.log(`Generated ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}:`, error);
  }
}

process();
