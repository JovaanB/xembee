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
import { InterventionForm } from '@/features/interventions/InterventionForm';
import { Intervention } from '@/features/interventions/schema';

export default function PageInterventionCreate() {
  const { t } = useTranslation(['common', 'interventions']);
  const navigate = useNavigate();

  const form = useForm<
    Pick<Intervention, 'id' | 'status' | 'name' | 'comment' | 'deleted'>
  >({
    onValidSubmit: (values) => {
      const newIntervention = {
        ...values,
      };
      console.log({ newIntervention });
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
            <InterventionForm />
          </PageContent>
          <PageBottomBar>
            <ButtonGroup justifyContent="space-between">
              <Button onClick={() => navigate('/admin/interventions')}>
                {t('common:actions.cancel')}
              </Button>
              <Button type="submit" variant="@primary">
                {t('interventions:create.action.save')}
              </Button>
            </ButtonGroup>
          </PageBottomBar>
        </form>
      </Formiz>
    </Page>
  );
}
