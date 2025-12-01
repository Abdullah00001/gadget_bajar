import z from 'zod';

export const chatBotSchema = z.object({
  message: z.string(),
});
