import { atom } from "jotai";
import type { Product } from "@/types/product";

export const productAtom = atom<Product[]>([]);
