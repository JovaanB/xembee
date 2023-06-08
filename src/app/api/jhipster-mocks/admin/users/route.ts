import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  createUser,
  updateUserById,
} from '@/app/api/jhipster-mocks/admin/users/service';
import {
  apiMethod,
  badRequestResponse,
} from '@/app/api/jhipster-mocks/helpers';

export const POST = apiMethod({
  admin: true,
  handler: async ({ req }) => {
    const bodyParsed = z
      .object({
        login: z.string().min(2),
        email: z.string().email(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        langKey: z.string(),
        authorities: z.array(z.string()),
        activated: z.boolean().optional(),
      })
      .safeParse(await req.json());

    if (!bodyParsed.success) {
      return badRequestResponse();
    }

    const user = await createUser({ activated: true, ...bodyParsed.data });
    return NextResponse.json(user);
  },
});
export const PUT = apiMethod({
  admin: true,
  handler: async ({ req }) => {
    const bodyParsed = z
      .object({
        id: z.number(),
        login: z.string().min(2),
        email: z.string().email(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        langKey: z.string(),
        authorities: z.array(z.string()),
        activated: z.boolean().optional(),
      })
      .safeParse(await req.json());

    if (!bodyParsed.success) {
      return badRequestResponse();
    }

    const user = await updateUserById(bodyParsed.data.id, bodyParsed.data);
    return NextResponse.json(user);
  },
});
