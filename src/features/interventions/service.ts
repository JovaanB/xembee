import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import {
  Intervention,
  InterventionList,
  zIntervention,
  zInterventionList,
} from '@/features/interventions/schema';

type UserMutateError = ApiErrorResponse & {
  errorKey: 'userexists' | 'emailexists';
};

const INTERVENTIONS_BASE_URL = '/admin/interventions';

const usersKeys = createQueryKeys('usersService', {
  users: (params: { page?: number; size?: number }) => [params],
  user: (params: { id?: string }) => [params],
  userForm: null,
});

export const useInterventionList = (
  { page = 0, size = 10 } = {},
  queryOptions: UseQueryOptions<
    InterventionList,
    AxiosError<ApiErrorResponse>
  > = {}
) => {
  const result = useQuery({
    queryKey: usersKeys.users({ page, size }).queryKey,
    queryFn: async () => {
      const response = await Axios.get(INTERVENTIONS_BASE_URL, {
        params: { page, size, sort: 'id,desc' },
      });
      return zInterventionList().parse(response);
    },
    keepPreviousData: true,
    ...queryOptions,
  });

  const { content: users, totalItems } = result.data || {};
  const totalPages = Math.ceil((totalItems ?? 0) / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    users,
    totalItems,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

type UseUserQueryOptions = UseQueryOptions<
  Intervention,
  AxiosError<ApiErrorResponse>
>;
export const useUser = (
  interventionId?: string,
  queryOptions: UseUserQueryOptions = {}
) => {
  return useQuery({
    queryKey: usersKeys.user({ id: interventionId }).queryKey,
    queryFn: async () => {
      const response = await Axios.get(
        `${INTERVENTIONS_BASE_URL}/${interventionId}`
      );
      return zIntervention().parse(response);
    },
    enabled: !!interventionId,
    ...queryOptions,
  });
};

export const useUserFormQuery = (
  userLogin?: string,
  queryOptions: UseUserQueryOptions = {}
) =>
  useUser(userLogin, {
    queryKey: usersKeys.userForm.queryKey,
    staleTime: Infinity,
    cacheTime: 0,
    ...queryOptions,
  });

export const useUserUpdate = (
  config: UseMutationOptions<
    Intervention,
    AxiosError<UserMutateError>,
    Intervention
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payload) => {
      const response = await Axios.put(INTERVENTIONS_BASE_URL, payload);
      return zIntervention().parse(response);
    },
    {
      ...config,
      onSuccess: (data, payload, ...args) => {
        queryClient.cancelQueries(usersKeys.users._def);
        queryClient
          .getQueryCache()
          .findAll(usersKeys.users._def)
          .forEach(({ queryKey }) => {
            queryClient.setQueryData<InterventionList | undefined>(
              queryKey,
              (cachedData) => {
                if (!cachedData) return;
                return {
                  ...cachedData,
                  content: (cachedData.content || []).map((user) =>
                    user.id === data.id ? data : user
                  ),
                };
              }
            );
          });
        queryClient.invalidateQueries(usersKeys.users._def);
        queryClient.invalidateQueries(
          usersKeys.user({ id: payload.id.toString() })
        );
        if (config.onSuccess) {
          config.onSuccess(data, payload, ...args);
        }
      },
    }
  );
};

export const useUserCreate = (
  config: UseMutationOptions<
    Intervention,
    AxiosError<UserMutateError>,
    Pick<Intervention, 'id' | 'name' | 'comment' | 'deleted' | 'status'>
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ ...payload }) => {
      const response = await Axios.post('/admin/interventions', {
        ...payload,
      });
      return zIntervention().parse(response);
    },
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(usersKeys.users._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};

export const useUserRemove = (
  config: UseMutationOptions<
    void,
    AxiosError<ApiErrorResponse>,
    Pick<Intervention, 'id'>
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (intervention) => {
      await Axios.delete(`/admin/interventions/${intervention.id}`);
    },
    {
      ...config,
      onSuccess: (...args) => {
        queryClient.invalidateQueries(usersKeys.users._def);
        config?.onSuccess?.(...args);
      },
    }
  );
};
