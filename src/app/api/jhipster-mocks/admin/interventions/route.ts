import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getInterventionList } from '@/app/api/jhipster-mocks/admin/interventions/service';
import {
  apiMethod,
  badRequestResponse,
} from '@/app/api/jhipster-mocks/helpers';

export const GET = apiMethod({
  admin: true,
  handler: async ({ searchParams }) => {
    const options = z
      .object({
        page: z.string().optional().default('0').transform(Number),
        size: z.string().optional().default('10').transform(Number),
      })
      .default({ page: '0', size: '10' })
      .parse({
        page: searchParams.get('page'),
        size: searchParams.get('size'),
      });
    const { users, total } = await getInterventionList({
      skip: options.page * options.size,
      take: options.size,
    });
    const headers = new Headers();
    headers.set('x-total-count', total.toString());
    return NextResponse.json(users, { headers });
  },
});

export const POST = apiMethod({
  admin: true,
  handler: async ({ req }) => {
    const bodyParsed = z
      .object({
        name: z.string().min(2),
        comment: z.string().email(),
        module: z.string().nullable(),
      })
      .safeParse(await req.json());

    if (!bodyParsed.success) {
      return badRequestResponse();
    }

    // const user = await createUser({ activated: true, ...bodyParsed.data });
    // return NextResponse.json(user);
  },
});
