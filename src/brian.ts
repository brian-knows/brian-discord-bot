import { BrianSDK } from "@brian-ai/sdk";
import * as dotenv from "dotenv";

dotenv.config();

const BRIAN_API_KEY = process.env.BRIAN_API_KEY;

if (!BRIAN_API_KEY) {
  throw new Error("No BRIAN_API_KEY provided.");
}

export const brian = new BrianSDK({ apiKey: BRIAN_API_KEY });
