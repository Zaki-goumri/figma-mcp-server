import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { sendCommandToFigma } from '../../bin/mcp-server'; // Assuming this is the correct path

interface LocalToolResponse {
  content: Array<{ type: "text"; text: string }>;
}


export const CreateFrameInputSchema = z.object({
  fileKey: z.string().describe('The file key of the Figma document.'),
  name: z.string().describe('The name of the new frame.'),
  width: z.number().positive().describe('The width of the new frame.'),
  height: z.number().positive().describe('The height of the new frame.'),
  x: z.number().optional().describe('The x-coordinate of the new frame.'),
  y: z.number().optional().describe('The y-coordinate of the new frame.'),
});

export const createFrameTool = {
  name: 'create_frame',
  description: 'Creates a new frame in the specified Figma document.',
  inputSchema: CreateFrameInputSchema,
  handler: async (args: { [x: string]: any }): Promise<LocalToolResponse> => {
    const input = CreateFrameInputSchema.parse(args);
    try {
      const result = await sendCommandToFigma('create_frame', input);
      return {
        content: [
          {
            type: 'text',
            text: `Frame created successfully: ${JSON.stringify(result)}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error creating frame: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  },
};
