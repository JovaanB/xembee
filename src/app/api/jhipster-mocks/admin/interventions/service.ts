import { Intervention } from '@prisma/client';

import { db } from '@/app/api/jhipster-mocks/db';

export type InterventionFormatted<
  U extends Partial<Intervention> = Intervention
> = ReturnType<typeof formatInterventionFromDb<U>>;

export const formatInterventionFromDb = <U extends Partial<Intervention>>(
  intervention?: U | null
) => {
  if (!intervention) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...userSafe } = intervention;

  return {
    ...userSafe,
  };
};

export const getInterventionById = async (id: number) => {
  const intervention = await db.intervention.findUnique({ where: { id } });
  return formatInterventionFromDb(intervention);
};

export const getInterventionList = async (
  options: { skip?: number; take?: number } = {}
) => {
  const [interventions, total] = await Promise.all([
    db.intervention.findMany({
      skip: options.skip ?? 0,
      take: options.take ?? 2,
    }),
    db.intervention.count(),
  ]);

  return {
    users: interventions.map(formatInterventionFromDb),
    total,
  } as const;
};
