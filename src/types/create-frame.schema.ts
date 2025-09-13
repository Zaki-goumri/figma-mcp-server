import { z } from "zod";

export const CreateFrameInputSchema = z.object({
  fileKey: z.string().describe('The file key of the Figma document.'),
  name: z.string().describe('The name of the new frame.'),
  width: z.number().positive().describe('The width of the new frame.'),
  height: z.number().positive().describe('The height of the new frame.'),
  x: z.number().optional().describe('The x-coordinate of the new frame.'),
  y: z.number().optional().describe('The y-coordinate of the new frame.'),
});
