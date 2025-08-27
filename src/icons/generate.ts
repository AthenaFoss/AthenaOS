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
    const resizedInput = await sharp(inputPath)
      .resize(1024, 1024, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
