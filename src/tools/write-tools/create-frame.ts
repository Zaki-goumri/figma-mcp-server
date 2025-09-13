
import { v4 as uuidv4 } from 'uuid';
import { sendCommandToFigma } from '../../bin/mcp-server'; // Assuming this is the correct path
import { RequestHandlerExtra } from "@modelcontextprotocol/sdk/shared/protocol";
import { LocalToolResponse } from '../../types/tool-responses';
import { CreateFrameInputSchema } from '../../types/create-frame.schema';






export const createFrameTool = {
  name: 'create_frame',
  description: 'Creates a new frame in the specified Figma document.',
  inputSchema: CreateFrameInputSchema,
  handler: async (args: { [x: string]: any }, extra: RequestHandlerExtra<any, any>): Promise<LocalToolResponse> => {
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
