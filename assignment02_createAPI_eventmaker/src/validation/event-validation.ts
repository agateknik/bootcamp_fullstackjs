import { z } from "zod";

export const createEventValidation = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  location: z.string().min(1, "Location wajib diisi"),
  dateTime: z.string().min(1, "Tanggal wajib diisi"),
});
