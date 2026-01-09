import { z } from "zod";

const createEventVal = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().min(1, "description is required"),
  location: z.string().min(1, "location is required"),
  dateTime: z.string().min(1, "dateTime is required"),
});

const updateEventVal = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  dateTime: z.string().min(1).optional(),
});

export { createEventVal, updateEventVal };
