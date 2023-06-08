import { Badge, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuCheck, LuX } from 'react-icons/lu';

import { Icon } from '@/components/Icons';

export const UserStatus = ({ status = 'pending', ...rest }) => {
  const { t } = useTranslation(['interventions']);
  return status === 'pending' ? (
    <Badge size="sm" colorScheme="warning" {...rest}>
      <Box as="span" display={{ base: 'none', md: 'block' }}>
        {t('interventions:data.status.pending')}
      </Box>
      <Icon
        icon={LuCheck}
        aria-label={t('interventions:data.status.pending')}
        display={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  ) : (
    <Badge size="sm" colorScheme="success" {...rest}>
      <Box as="span" display={{ base: 'none', md: 'block' }}>
        {t('interventions:data.status.validated')}
      </Box>
      <Icon
        icon={LuX}
        aria-label={t('interventions:data.status.validated')}
        display={{ base: 'inline-flex', md: 'none' }}
      />
    </Badge>
  );
};
