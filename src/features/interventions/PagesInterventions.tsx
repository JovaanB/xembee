import React from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Code,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuPlus, LuRefreshCw } from 'react-icons/lu';
import { Link, useSearchParams } from 'react-router-dom';

import {
  DataList,
  DataListCell,
  DataListFooter,
  DataListHeader,
  DataListRow,
} from '@/components/DataList';
import { Page, PageContent } from '@/components/Page';
import {
  Pagination,
  PaginationButtonFirstPage,
  PaginationButtonLastPage,
  PaginationButtonNextPage,
  PaginationButtonPrevPage,
  PaginationInfo,
} from '@/components/Pagination';
import { AdminNav } from '@/features/admin/AdminNav';
import { useInterventionList } from '@/features/interventions/service';

import { UserActions } from './UserActions';
import { UserStatus } from './UserStatus';

export default function PageInterventions() {
  const { t } = useTranslation(['interventions']);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams?.get('page') || 1);

  const pageSize = 20;
  const users = useInterventionList({
    page: page - 1,
    size: pageSize,
  });

  return (
    <Page containerSize="xl" nav={<AdminNav />}>
      <PageContent>
        <HStack mb="4">
          <Box flex="1">
            <Heading size="md">{t('interventions:list.title')}</Heading>
          </Box>
          <Box>
            <Button
              display={{ base: 'none', sm: 'flex' }}
              as={Link}
              to="/admin/interventions/create"
              variant="@primary"
              leftIcon={<LuPlus />}
            >
              {t('interventions:list.actions.createUser')}
            </Button>
            <IconButton
              display={{ base: 'flex', sm: 'none' }}
              aria-label={t('interventions:list.actions.createUser')}
              as={Link}
              to="/admin/interventions/create"
              size="sm"
              variant="@primary"
              icon={<LuPlus />}
            />
          </Box>
        </HStack>

        <DataList>
          <DataListHeader isVisible={{ base: false, md: true }}>
            <DataListCell
              colName="id"
              colWidth="4rem"
              isVisible={{ base: false, lg: true }}
            >
              {t('interventions:data.id.label')}
            </DataListCell>
            <DataListCell colName="name">
              {t('interventions:data.name.label')}
            </DataListCell>
            <DataListCell colName="comment">
              {t('interventions:data.comment.label')}
            </DataListCell>
            <DataListCell colName="module">
              {t('interventions:data.module.label')}
            </DataListCell>
            <DataListCell colName="status">
              <Box as="span" display={{ base: 'none', md: 'block' }}>
                {t('interventions:data.status.label')}
              </Box>
            </DataListCell>
            <DataListCell colName="actions" colWidth="3rem" align="flex-end" />
          </DataListHeader>
          {users.isError && (
            <Center p={4}>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>
                  {t('interventions:feedbacks.loadingUserError.title')}
                </AlertTitle>
                <AlertDescription>
                  {t('interventions:feedbacks.loadingUserError.description')}
                  <Button
                    colorScheme="error"
                    variant="ghost"
                    size="sm"
                    leftIcon={<LuRefreshCw />}
                    isLoading={users.isLoadingPage}
                    onClick={() => users.refetch()}
                  >
                    {t('interventions:list.actions.refetch')}
                  </Button>
                </AlertDescription>
              </Alert>
            </Center>
          )}
          {users.data?.content?.map((user) => (
            <DataListRow as={LinkBox} key={user.id}>
              <DataListCell colName="id">
                <Code maxW="full" fontSize="xs">
                  {user.id}
                </Code>
              </DataListCell>
              <DataListCell colName="name">
                <HStack maxW="100%">
                  <Box minW="0">
                    <Text noOfLines={1} maxW="full" fontWeight="bold">
                      <LinkOverlay
                        as={Link}
                        to={`/admin/interventions/${user.id}`}
                      >
                        {user.name}
                      </LinkOverlay>
                    </Text>
                  </Box>
                </HStack>
              </DataListCell>

              <DataListCell colName="comment">{user.comment}</DataListCell>

              <DataListCell colName="module">{user.module}</DataListCell>

              <DataListCell colName="status">
                <UserStatus status={user.status} />
              </DataListCell>
              <DataListCell colName="actions">
                <UserActions user={user} />
              </DataListCell>
            </DataListRow>
          ))}
          <DataListFooter>
            <Pagination
              isLoadingPage={users.isLoadingPage}
              setPage={(newPage) =>
                setSearchParams({ page: newPage.toString() })
              }
              page={page}
              pageSize={pageSize}
              totalItems={users.data?.totalItems}
            >
              <PaginationButtonFirstPage />
              <PaginationButtonPrevPage />
              <PaginationInfo flex="1" />
              <PaginationButtonNextPage />
              <PaginationButtonLastPage />
            </Pagination>
          </DataListFooter>
        </DataList>
      </PageContent>
    </Page>
  );
}
