import React from 'react';

import { useTranslation } from 'react-i18next';
import { LuBookOpen, LuUsers } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components/Nav';

export const AdminNav = () => {
  const { t } = useTranslation(['admin']);
  const { pathname } = useLocation();
  const isActive = (to: string) => pathname?.startsWith(to);
  return (
    <Nav>
      <NavGroup title={t('admin:nav.administration')}>
        <NavItem
          as={Link}
          to="/admin/interventions"
          isActive={isActive('/admin/interventions')}
          icon={LuUsers}
        >
          {t('admin:nav.interventions')}
        </NavItem>
      </NavGroup>
    </Nav>
  );
};
