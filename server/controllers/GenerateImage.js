import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config();

const url = "https://apiimagestrax.vercel.app/api/genimage";

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }) // ✅ Correct body
    });

    if (response.ok) {
      const buffer = Buffer.from(await response.arrayBuffer());
   // Convert to base64 data URL for response
      const base64 = buffer.toString("base64");
      const dataUrl = `data:image/png;base64,${base64}`;

      res.status(200).json({ photo: dataUrl });
    } else {
      console.error(`Failed to generate image. Status code: ${response.status}`);
      next(createError(response.status, "Failed to generate image"));
    }
  } catch (error) {
    console.log(error?.message || error);
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message
      )
    );
  }
};
