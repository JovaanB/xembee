import React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorPage } from '@/components/ErrorPage';
import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { InterventionForm } from '@/features/interventions/InterventionForm';
import { Intervention } from '@/features/interventions/schema';
import { useInterventionFormQuery } from '@/features/interventions/service';
import { Loader } from '@/layout/Loader';

export default function PageInterventionUpdate() {
  const { t } = useTranslation(['common', 'interventions']);

  const params = useParams();
  const navigate = useNavigate();
  const intervention = useInterventionFormQuery(params?.id);

  const form = useForm<Omit<Intervention, 'id'>>({
    ready: !intervention.isLoading,
    initialValues: intervention.data,
    onValidSubmit: (values) => {
      if (!intervention.data?.id) return null;
      console.log({ values });
    },
  });

  return (
    <Page containerSize="md" isFocusMode>
      <PageTopBar showBack onBack={() => navigate('/admin/interventions')}>
        <HStack spacing="4">
          <Box flex="1">
            {intervention.isLoading || intervention.isError ? (
              <SkeletonText maxW="6rem" noOfLines={2} />
            ) : (
              <Stack spacing="0">
                <Heading size="sm">{intervention.data?.id}</Heading>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  {t('interventions:data.id.label')}: {intervention.data?.id}
                </Text>
              </Stack>
            )}
          </Box>
        </HStack>
      </PageTopBar>
      {intervention.isLoading && <Loader />}
      {intervention.isError && <ErrorPage errorCode={404} />}
      {intervention.isSuccess && (
        <Formiz connect={form}>
          <form noValidate onSubmit={form.submit}>
            <PageContent>
              <InterventionForm />
            </PageContent>
            <PageBottomBar>
              <ButtonGroup justifyContent="space-between">
                <Button onClick={() => navigate('/admin/interventions')}>
                  {t('common:actions.cancel')}
                </Button>
                <Button type="submit" variant="@primary">
                  {t('interventions:update.action.save')}
                </Button>
              </ButtonGroup>
            </PageBottomBar>
          </form>
        </Formiz>
      )}
    </Page>
  );
}
