import { createContext } from "react";
import type { WeddingContextType } from "../types";

export const WeddingContext = createContext<WeddingContextType | undefined>(
  undefined
);
