import React from 'react';

import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuLogOut, LuMoon, LuSun, LuUser } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';

import { Icon } from '@/components/Icons';
import { useAccount } from '@/features/account/service';

export const AccountMenu = ({ ...rest }) => {
  const { t } = useTranslation(['layout']);

  const { colorMode, toggleColorMode } = useColorMode();
  const account = useAccount();
  const navigate = useNavigate();

  return (
    <Box color="gray.800" _dark={{ color: 'white' }}>
      <Menu placement="bottom-end" {...rest}>
        <MenuButton borderRadius="full" _focusVisible={{ shadow: 'outline' }}>
          <Avatar size="sm" icon={<></>} name={account.data?.login}>
            {account.isLoading && <Spinner size="xs" />}
          </Avatar>
        </MenuButton>
        <MenuList maxW="12rem" overflow="hidden">
          <MenuGroup title={account.data?.email} noOfLines={1}>
            <MenuItem
              as={Link}
              to="/account"
              icon={<Icon icon={LuUser} fontSize="lg" color="gray.400" />}
            >
              {t('layout:accountMenu.myAccount')}
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            icon={
              <Icon
                icon={colorMode === 'dark' ? LuSun : LuMoon}
                fontSize="lg"
                color="gray.400"
              />
            }
            onClick={() => toggleColorMode()}
          >
            {colorMode === 'dark'
              ? t('layout:accountMenu.switchColorModeLight')
              : t('layout:accountMenu.switchColorModeDark')}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<Icon icon={LuLogOut} fontSize="lg" color="gray.400" />}
            onClick={() => navigate('/logout')}
          >
            {t('layout:accountMenu.logout')}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
