import React from 'react';

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Portal,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuEdit, LuTrash2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { ActionsButton } from '@/components/ActionsButton';
import { ConfirmMenuItem } from '@/components/ConfirmMenuItem';
import { Icon } from '@/components/Icons';
import { useToastError, useToastSuccess } from '@/components/Toast';
import { Intervention } from '@/features/interventions/schema';
import { useUserRemove, useUserUpdate } from '@/features/interventions/service';

export type UserActionProps = Omit<MenuProps, 'children'> & {
  user: Intervention;
};

export const UserActions = ({ user, ...rest }: UserActionProps) => {
  const { t } = useTranslation(['common', 'interventions']);
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const userUpdate = useUserUpdate({
    onSuccess: ({ status, id }) => {
      if (status === 'pending') {
        toastSuccess({
          title: t('interventions:feedbacks.activateUserSuccess.title'),
          description: t(
            'interventions:feedbacks.activateUserSuccess.description',
            {
              id,
            }
          ),
        });
      } else {
        toastSuccess({
          title: t('interventions:feedbacks.deactivateUserSuccess.title'),
          description: t(
            'interventions:feedbacks.deactivateUserSuccess.description',
            {
              id,
            }
          ),
        });
      }
    },
    onError: (_, { status, id }) => {
      if (status) {
        toastError({
          title: t('interventions:feedbacks.activateUserError.title'),
          description: t(
            'interventions:feedbacks.activateUserError.description',
            {
              id,
            }
          ),
        });
      } else {
        toastError({
          title: t('interventions:feedbacks.deactivateUserError.title'),
          description: t(
            'interventions:feedbacks.deactivateUserError.description',
            {
              id,
            }
          ),
        });
      }
    },
  });

  const isActionsLoading = userUpdate.isLoading;

  const userRemove = useUserRemove({
    onSuccess: (_, { id }) => {
      toastSuccess({
        title: t('interventions:feedbacks.deleteUserSuccess.title'),
        description: t(
          'interventions:feedbacks.deleteUserSuccess.description',
          {
            id,
          }
        ),
      });
    },
    onError: (_, { id }) => {
      toastError({
        title: t('interventions:feedbacks.deleteUserError.title'),
        description: t('interventions:feedbacks.deleteUserError.description', {
          id,
        }),
      });
    },
  });
  const removeUser = () => userRemove.mutate(user);
  const isRemovalLoading = userRemove.isLoading;

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton
        as={ActionsButton}
        isLoading={isActionsLoading || isRemovalLoading}
      />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/interventions/${user.id}`}
            icon={<Icon icon={LuEdit} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={LuTrash2} fontSize="lg" color="gray.400" />}
            onClick={removeUser}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
