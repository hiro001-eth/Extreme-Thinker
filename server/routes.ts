import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema } from "@shared/schema";
import fs from "fs/promises";
import path from "path";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/transactions", async (_req, res) => {
    const transactions = await storage.getTransactions();
    res.json(transactions);
  });

  app.post("/api/transactions", async (req, res) => {
    const result = insertTransactionSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const { amount, date, remarks, time, imageUrl } = result.data;

    // Save image to file system if imageUrl is provided (base64)
    if (imageUrl && imageUrl.startsWith("data:image/jpeg;base64,")) {
      try {
        const base64Data = imageUrl.replace(/^data:image\/jpeg;base64,/, "");
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `receipt_${timestamp}.jpg`;
        const filePath = path.join(process.cwd(), "images", fileName);
        
        await fs.writeFile(filePath, base64Data, "base64");
        console.log(`Successfully saved image to: ${filePath}`);
      } catch (err) {
        console.error("Failed to save image to disk:", err);
      }
    }

    const transaction = await storage.createTransaction(result.data);
    res.json(transaction);
  });

  return httpServer;
}
