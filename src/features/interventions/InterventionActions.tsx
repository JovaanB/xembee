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
import { Intervention } from '@/features/interventions/schema';

export type UserActionProps = Omit<MenuProps, 'children'> & {
  intervention: Intervention;
};

export const InterventionActions = ({
  intervention,
  ...rest
}: UserActionProps) => {
  const { t } = useTranslation(['common', 'interventions']);

  return (
    <Menu isLazy placement="left-start" {...rest}>
      <MenuButton as={ActionsButton} />
      <Portal>
        <MenuList>
          <MenuItem
            as={Link}
            to={`/admin/interventions/${intervention.id}`}
            icon={<Icon icon={LuEdit} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.edit')}
          </MenuItem>

          <MenuDivider />
          <ConfirmMenuItem
            icon={<Icon icon={LuTrash2} fontSize="lg" color="gray.400" />}
          >
            {t('common:actions.delete')}
          </ConfirmMenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
