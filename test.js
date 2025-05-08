import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// API details
const url = "https://apiimagestrax.vercel.app/api/genimage";
const data = {
  prompt: "emma watson with CR7"
};

// Send POST request with fetch
try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {   
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(__dirname + "/outputjavaScript.png", buffer);
    console.log("Image saved as output.png");
  } else {
    console.error(`Failed to generate image. Status code: ${response.status}`);
  }
} catch (error) {
  console.error("Error during fetch:", error.message);
}
