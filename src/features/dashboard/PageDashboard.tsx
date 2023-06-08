import React, { useCallback, useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  theme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuBatteryFull, LuBatteryWarning } from 'react-icons/lu';

import { Wind } from '@/components/Logo/Wind';
import { Page, PageContent } from '@/components/Page';
import { initialFakeStatisticsData } from '@/lib/fakeData';
import {
  generateRandomBoolean,
  generateRandomNumber,
} from '@/lib/helpingFunctions';

const ONE_SECOND = 1000;
const FIVE_SECONDS = 5000;

export default function PageDashboard() {
  const { t } = useTranslation(['dashboard']);

  const [module, setModule] = useState('all');
  const [fakeStatistics, setFakeStatistics] = useState(
    initialFakeStatisticsData
  );

  const selectedModule = fakeStatistics[module as keyof typeof fakeStatistics];

  const {
    instantEnergy,
    dailyEnergy,
    instantEnergyPercentage,
    dailyEnergyPercentage,
  } = selectedModule;

  const generateFakeInstantData = useCallback(() => {
    setFakeStatistics((prevState) => {
      const newState = { ...prevState };

      Object.entries(prevState).map(([key, value]) => {
        let globalInstantEnergy = 0;
        let globalInstantEnergyPourcentage = 0;

        const newInstantEnergy = generateRandomNumber({
          min: value.instantEnergy < 0 ? value.instantEnergy - 20 : 200,
          max: value.instantEnergy < 400 ? value.instantEnergy + 20 : 400,
        });

        const newInstantEnergyPercentage = Number(
          (
            Math.round((newInstantEnergy / value.instantEnergy) * 100) - 100
          ).toFixed(2)
        );

        globalInstantEnergy += newInstantEnergy;
        globalInstantEnergyPourcentage += newInstantEnergyPercentage;

        newState[key] = {
          ...value,
          instantEnergy: key === 'all' ? globalInstantEnergy : newInstantEnergy,
          instantEnergyPercentage:
            key === 'all'
              ? globalInstantEnergyPourcentage
              : newInstantEnergyPercentage,
        };
      });

      return {
        ...newState,
      };
    });
  }, []);

  const generateFakeDailyAndBatteryData = useCallback(() => {
    setFakeStatistics((prevState) => {
      const newState = { ...prevState };
      Object.entries(prevState).map(([key, value]) => {
        let globalDailyEnergy = 0;
        let globalDailyEnergyPourcentage = 0;
        let globalBattery = 0;

        const newDailyEnergy = generateRandomNumber({
          min: value.dailyEnergy > 100 ? value.dailyEnergy - 100 : 200,
          max: value.dailyEnergy < 400 ? value.dailyEnergy + 100 : 400,
        });

        const newDailyEnergyPercentage = Number(
          (
            Math.round((newDailyEnergy / value.dailyEnergy) * 100) - 100
          ).toFixed(2)
        );

        const upOrDownBattery = generateRandomBoolean() ? 1 : -1;

        const newBattery =
          value.battery < 0
            ? 0
            : value.battery > 100
            ? 100
            : value.battery + upOrDownBattery;

        globalDailyEnergy += newDailyEnergy;
        globalDailyEnergyPourcentage += newDailyEnergyPercentage;
        globalBattery += newBattery;

        newState[key] = {
          ...value,
          dailyEnergy: key === 'all' ? globalDailyEnergy : newDailyEnergy,
          dailyEnergyPercentage:
            key === 'all'
              ? globalDailyEnergyPourcentage
              : newDailyEnergyPercentage,
          battery: newBattery,
        };
      });

      return {
        ...newState,
      };
    });
  }, [dailyEnergy]);

  useEffect(() => {
    const interval = setInterval(() => {
      generateFakeInstantData();
    }, ONE_SECOND);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    generateFakeInstantData();
  }, [module]);

  useEffect(() => {
    const interval = setInterval(() => {
      generateFakeDailyAndBatteryData();
    }, FIVE_SECONDS);
    return () => clearInterval(interval);
  }, [dailyEnergy]);

  return (
    <Page>
      <PageContent>
        <Heading size="md" mb="4">
          {t('dashboard:title')}
        </Heading>
        <Alert status="success" colorScheme="brand" borderRadius="md">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle fontSize="lg">
              {t('dashboard:welcome.title')}
            </AlertTitle>
            <AlertDescription display="block">
              {t('dashboard:welcome.description')}
              <br />
            </AlertDescription>
          </Box>
        </Alert>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="baseline"
          marginTop={2}
        >
          {Object.entries(fakeStatistics).map(([m, stats]) => (
            <Card
              key={m}
              onClick={() => setModule(m)}
              margin={1}
              display="flex"
              minWidth={220}
              flexDirection="row"
              alignItems="center"
              border={m === module ? '1px solid lightgrey' : 'none'}
              shadow={m === module ? 'lg' : 'none'}
            >
              <CardHeader>
                <Wind />
              </CardHeader>
              <CardBody>
                <Box>
                  <Text textAlign="center">{m === 'all' ? 'Tous' : m}</Text>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {m === 'M01x00210' ? (
                      <LuBatteryWarning
                        color={theme.colors.red[400]}
                        size="20px"
                      />
                    ) : (
                      <>
                        <LuBatteryFull
                          color={
                            stats.battery > 60
                              ? theme.colors.green[600]
                              : theme.colors.red[400]
                          }
                          size="20px"
                        />
                        <Text
                          color={
                            stats.battery > 60
                              ? theme.colors.green[600]
                              : theme.colors.red[400]
                          }
                          fontWeight={800}
                          ml={1}
                        >
                          {stats.battery}%
                        </Text>
                      </>
                    )}
                  </Box>
                </Box>
              </CardBody>
            </Card>
          ))}
        </Box>
        {module === 'all' && (
          <Alert status="warning" borderRadius="md" marginTop={3}>
            <AlertIcon />
            <Box flex="1">
              <AlertDescription display="block">
                {t('dashboard:warning.noModuleSelected')}
                <br />
              </AlertDescription>
            </Box>
          </Alert>
        )}
        <Card size="lg" align="center" padding={8} margin="10px 0px">
          <StatGroup width="100%">
            <Stat>
              <StatLabel>{t('dashboard:instantEnergy')} (kw/h)</StatLabel>
              <StatNumber>{instantEnergy}</StatNumber>
              <StatHelpText>
                <StatArrow
                  type={instantEnergyPercentage > 0 ? 'increase' : 'decrease'}
                />
                {instantEnergyPercentage}%
              </StatHelpText>
            </Stat>

            <Stat>
              <StatLabel>{t('dashboard:dailyEnergy')} (kw/h)</StatLabel>
              <StatNumber>{dailyEnergy}</StatNumber>
              <StatHelpText>
                <StatArrow
                  type={dailyEnergyPercentage > 0 ? 'increase' : 'decrease'}
                />
                {dailyEnergyPercentage}%
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Card>
      </PageContent>
    </Page>
  );
}
