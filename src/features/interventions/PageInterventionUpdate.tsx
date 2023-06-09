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
import { useToastError, useToastSuccess } from '@/components/Toast';
import { UserForm } from '@/features/interventions/InterventionForm';
import { Intervention } from '@/features/interventions/schema';
import {
  useUserFormQuery,
  useUserUpdate,
} from '@/features/interventions/service';
import { Loader } from '@/layout/Loader';

export default function PageInterventionUpdate() {
  const { t } = useTranslation(['common', 'interventions']);

  const params = useParams();
  const navigate = useNavigate();
  const user = useUserFormQuery(params?.login?.toString());

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const userUpdate = useUserUpdate({
    onError: (error) => {
      if (error.response) {
        const { title, errorKey } = error.response.data;
        toastError({
          title: t('interventions:update.feedbacks.updateError.title'),
          description: title,
        });
        switch (errorKey) {
          case 'userexists':
            form.setErrors({
              login: t('interventions:data.login.alreadyUsed'),
            });
            break;
          case 'emailexists':
            form.setErrors({
              email: t('interventions:data.email.alreadyUsed'),
            });
            break;
        }
      }
    },
    onSuccess: () => {
      toastSuccess({
        title: t('interventions:update.feedbacks.updateSuccess.title'),
      });
      navigate(-1);
    },
  });

  const form = useForm<Omit<Intervention, 'id'>>({
    ready: !user.isLoading,
    initialValues: user.data,
    onValidSubmit: (values) => {
      if (!user.data?.id) return null;
      userUpdate.mutate({
        id: user.data.id,
        ...values,
      });
    },
  });

  return (
    <Page containerSize="md" isFocusMode>
      <PageTopBar showBack onBack={() => navigate('/admin/interventions')}>
        <HStack spacing="4">
          <Box flex="1">
            {user.isLoading || user.isError ? (
              <SkeletonText maxW="6rem" noOfLines={2} />
            ) : (
              <Stack spacing="0">
                <Heading size="sm">{user.data?.id}</Heading>
                <Text
                  fontSize="xs"
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                >
                  {t('interventions:data.id.label')}: {user.data?.id}
                </Text>
              </Stack>
            )}
          </Box>
          {!!user && <Box>{user.status}</Box>}
        </HStack>
      </PageTopBar>
      {user.isLoading && <Loader />}
      {user.isError && <ErrorPage errorCode={404} />}
      {user.isSuccess && (
        <Formiz connect={form}>
          <form noValidate onSubmit={form.submit}>
            <PageContent>
              <UserForm />
            </PageContent>
            <PageBottomBar>
              <ButtonGroup justifyContent="space-between">
                <Button onClick={() => navigate('/admin/interventions')}>
                  {t('common:actions.cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="@primary"
                  isLoading={userUpdate.isLoading}
                >
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
