import React from 'react';

import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { UserForm } from '@/features/interventions/UserForm';
import { Intervention } from '@/features/interventions/schema';
import { useUserCreate } from '@/features/interventions/service';

export default function PageInterventionCreate() {
  const { t } = useTranslation(['common', 'interventions']);
  const navigate = useNavigate();

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  const createUser = useUserCreate({
    onError: (error) => {
      if (error.response) {
        const { title, errorKey } = error.response.data;
        toastError({
          title: t('interventions:create.feedbacks.updateError.title'),
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
        title: t('interventions:create.feedbacks.updateSuccess.title'),
      });
      navigate('/admin/interventions');
    },
  });

  const form = useForm<
    Pick<Intervention, 'id' | 'status' | 'name' | 'comment' | 'deleted'>
  >({
    onValidSubmit: (values) => {
      const newUser = {
        ...values,
      };
      createUser.mutate(newUser);
    },
  });

  return (
    <Page containerSize="md" isFocusMode>
      <Formiz connect={form}>
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => navigate('/admin/interventions')}>
            <Heading size="md">{t('interventions:create.title')}</Heading>
          </PageTopBar>
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
                isLoading={createUser.isLoading}
              >
                {t('interventions:create.action.save')}
              </Button>
            </ButtonGroup>
          </PageBottomBar>
        </form>
      </Formiz>
    </Page>
  );
}
