import { z } from 'zod';

export type Intervention = z.infer<ReturnType<typeof zIntervention>>;
export const zIntervention = () =>
  z.object({
    id: z.number(),
    name: z.string(),
    comment: z.string().nullish(),
    module: z.string(),
    status: z.string(),
    deleted: z.boolean(),
  });

export type InterventionList = z.infer<ReturnType<typeof zInterventionList>>;
export const zInterventionList = () =>
  z.object({
    content: z.array(zIntervention()),
    totalItems: z.string().transform(Number),
  });
