import { z, ZodError } from 'zod';
import { ValidationError } from './errors';

export const FigmaFileKeySchema = z.string().regex(
  /^[a-zA-Z0-9]{22,128}$/,
  'Invalid Figma file key format'
);

export const NodeIdSchema = z.string().regex(
  /^[:0-9]+$/,
  'Invalid node ID format'
);

export const NodeIdsArraySchema = z.array(NodeIdSchema).min(1).max(50);

export const ExportFormatSchema = z.enum(['png', 'jpg', 'svg', 'pdf']);

export const SearchCriteriaSchema = z.object({
  type: z.string().optional(),
  name: z.string().optional(),
  limit: z.number().min(1).max(100).default(50),
}).refine(
  (data) => data.type || data.name,
  { message: 'Either type or name must be provided' }
);

export function validateInput<T>(schema: z.ZodSchema<T>, input: unknown): T {
  try {
    return schema.parse(input);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError(
        `Validation failed: ${error.issues.map((e: any) => e.message).join(', ')}`
      );
    }
    throw error;
  }
}
