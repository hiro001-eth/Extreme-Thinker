import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";
import fs from "fs/promises";
import path from "path";
import express from "express";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Serve generated images
  const generatedDir = path.join(process.cwd(), "generated");
  app.use("/generated", express.static(generatedDir));

  app.get("/api/transactions", async (_req, res) => {
    const transactions = await storage.getTransactions();
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      console.error("Validation error:", result.error);
      return res.status(400).json({ error: result.error });
    }

    let imageUrl = result.data.imageUrl;

    // Save image to file system if imageUrl is provided (base64)
    if (imageUrl && imageUrl.startsWith("data:image/jpeg;base64,")) {
      try {
        const base64Data = imageUrl.replace(/^data:image\/jpeg;base64,/, "");
        const timestamp = Date.now();
        const fileName = `receipt_${timestamp}.jpg`;
        const filePath = path.join(generatedDir, fileName);
        
        // Ensure the data is written correctly as a buffer
        await fs.writeFile(filePath, Buffer.from(base64Data, 'base64'));
        console.log(`Image saved to ${filePath}`);
        imageUrl = `/generated/${fileName}`;
      } catch (err) {
        console.error("Failed to save image to disk:", err);
      }
    }

    const transaction = await storage.createTransaction({
      ...result.data,
      imageUrl
    });
    res.json(transaction);
  });

  return httpServer;
}
