import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import { FieldTextarea } from '@/components/FieldTextarea';
import { initialFakeStatisticsData } from '@/lib/fakeData';

export const InterventionForm = () => {
  const { t } = useTranslation(['common', 'interventions']);

  return (
    <Stack
      direction="column"
      borderRadius="lg"
      spacing="6"
      shadow="md"
      bg="white"
      _dark={{ bg: 'gray.900' }}
      p="6"
    >
      <FieldInput
        name="name"
        label={t('interventions:data.name.label')}
        required={t('interventions:data.name.required') as string}
      />
      <FieldSelect
        name="module"
        label={t('interventions:data.module.label')}
        options={Object.keys(initialFakeStatisticsData).map((key) => ({
          label: key,
          value: key,
        }))}
      />
      <FieldTextarea
        name="comment"
        label={t('interventions:data.comment.label')}
      />
    </Stack>
  );
};
