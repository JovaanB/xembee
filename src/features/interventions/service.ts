import { createQueryKeys } from '@lukemorales/query-key-factory';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import {
  Intervention,
  InterventionList,
  zIntervention,
  zInterventionList,
} from '@/features/interventions/schema';

const INTERVENTIONS_BASE_URL = '/admin/interventions';

const interventionsKeys = createQueryKeys('interventionsService', {
  interventions: (params: { page?: number; size?: number }) => [params],
  intervention: (params: { id?: string }) => [params],
  interventionForm: null,
});

export const useInterventionList = (
  { page = 0, size = 10 } = {},
  queryOptions: UseQueryOptions<
    InterventionList,
    AxiosError<ApiErrorResponse>
  > = {}
) => {
  const result = useQuery({
    queryKey: interventionsKeys.interventions({ page, size }).queryKey,
    queryFn: async () => {
      const response = await Axios.get(INTERVENTIONS_BASE_URL, {
        params: { page, size, sort: 'id,desc' },
      });
      return zInterventionList().parse(response);
    },
    keepPreviousData: true,
    ...queryOptions,
  });

  const { content: interventions, totalItems } = result.data || {};
  const totalPages = Math.ceil((totalItems ?? 0) / size);
  const hasMore = page + 1 < totalPages;
  const isLoadingPage = result.isFetching;

  return {
    interventions,
    totalItems,
    hasMore,
    totalPages,
    isLoadingPage,
    ...result,
  };
};

type UseInterventionQueryOptions = UseQueryOptions<
  Intervention,
  AxiosError<ApiErrorResponse>
>;
export const useIntervention = (
  interventionId?: string,
  queryOptions: UseInterventionQueryOptions = {}
) => {
  return useQuery({
    queryKey: interventionsKeys.intervention({ id: interventionId }).queryKey,
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

export const useInterventionFormQuery = (
  id?: string,
  queryOptions: UseInterventionQueryOptions = {}
) =>
  useIntervention(id, {
    queryKey: interventionsKeys.interventionForm.queryKey,
    staleTime: Infinity,
    cacheTime: 0,
    ...queryOptions,
  });
