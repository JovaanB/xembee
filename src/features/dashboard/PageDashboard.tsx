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
import { LuBatteryFull } from 'react-icons/lu';

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
    setFakeStatistics(({ all, M01x00210, M02x00210 }) => {
      const newInstantEnergyModuleOne = generateRandomNumber({
        min: M01x00210.instantEnergy < 0 ? M01x00210.instantEnergy - 20 : 200,
        max: M01x00210.instantEnergy < 400 ? M01x00210.instantEnergy + 20 : 400,
      });

      const newInstantEnergyPercentageModuleOne = Number(
        (
          Math.round(
            (newInstantEnergyModuleOne / M01x00210.instantEnergy) * 100
          ) - 100
        ).toFixed(2)
      );

      const newInstantEnergyModuleTwo = generateRandomNumber({
        min: M02x00210.instantEnergy < 0 ? M02x00210.instantEnergy - 20 : 200,
        max: M02x00210.instantEnergy < 400 ? M02x00210.instantEnergy + 20 : 400,
      });

      const newInstantEnergyPercentageModuleTwo = Number(
        (
          Math.round(
            (newInstantEnergyModuleTwo / M02x00210.instantEnergy) * 100
          ) - 100
        ).toFixed(2)
      );

      return {
        all: {
          ...all,
          instantEnergy:
            (newInstantEnergyModuleOne + newInstantEnergyModuleTwo) / 2,
          instantEnergyPercentage:
            (newInstantEnergyPercentageModuleOne +
              newInstantEnergyPercentageModuleTwo) /
            2,
        },
        M01x00210: {
          ...M01x00210,
          instantEnergy: newInstantEnergyModuleOne,
          instantEnergyPercentage: newInstantEnergyPercentageModuleOne,
        },
        M02x00210: {
          ...M02x00210,
          instantEnergy: newInstantEnergyModuleOne,
          instantEnergyPercentage: newInstantEnergyPercentageModuleTwo,
        },
      };
    });
  }, []);

  const generateFakeDailyAndBatteryData = useCallback(() => {
    setFakeStatistics(({ all, M01x00210, M02x00210 }) => {
      const newDailyEnergyModuleOne = generateRandomNumber({
        min: M01x00210.dailyEnergy > 100 ? M01x00210.dailyEnergy - 100 : 200,
        max: M01x00210.dailyEnergy < 400 ? M01x00210.dailyEnergy + 100 : 400,
      });

      const newDailyEnergyPercentageModuleOne = Number(
        (
          Math.round((newDailyEnergyModuleOne / M01x00210.dailyEnergy) * 100) -
          100
        ).toFixed(2)
      );

      const newDailyEnergyModuleTwo = generateRandomNumber({
        min: M02x00210.dailyEnergy > 100 ? M02x00210.dailyEnergy - 100 : 200,
        max: M02x00210.dailyEnergy < 400 ? M02x00210.dailyEnergy + 100 : 400,
      });

      const newDailyEnergyPercentageModuleTwo = Number(
        (
          Math.round((newDailyEnergyModuleTwo / M02x00210.dailyEnergy) * 100) -
          100
        ).toFixed(2)
      );

      const upOrDownBatteryModuleOne = generateRandomBoolean() ? 1 : -1;
      const upOrDownBatteryModuleTwo = generateRandomBoolean() ? 1 : -1;

      const newBatteryModuleOne =
        fakeStatistics.M01x00210.battery < 0
          ? 0
          : fakeStatistics.M01x00210.battery > 100
          ? 100
          : fakeStatistics.M01x00210.battery + upOrDownBatteryModuleOne;

      const newBatteryModuleTwo =
        fakeStatistics.M02x00210.battery < 0
          ? 0
          : fakeStatistics.M02x00210.battery > 100
          ? 100
          : fakeStatistics.M02x00210.battery + upOrDownBatteryModuleTwo;

      return {
        all: {
          ...all,
          dailyEnergy: (newDailyEnergyModuleOne + newDailyEnergyModuleTwo) / 2,
          dailyEnergyPercentage:
            (newDailyEnergyPercentageModuleOne +
              newDailyEnergyPercentageModuleTwo) /
            2,
          battery: (newBatteryModuleOne + newBatteryModuleTwo) / 2,
        },
        M01x00210: {
          ...M01x00210,
          dailyEnergy: newDailyEnergyModuleOne,
          dailyEnergyPercentage: newDailyEnergyPercentageModuleOne,
          battery: newBatteryModuleOne,
        },
        M02x00210: {
          ...M02x00210,
          dailyEnergy: newDailyEnergyModuleTwo,
          dailyEnergyPercentage: newDailyEnergyPercentageModuleTwo,
          battery: newBatteryModuleTwo,
        },
      };
    });
  }, [
    dailyEnergy,
    fakeStatistics.M01x00210.battery,
    fakeStatistics.M02x00210.battery,
  ]);

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
  }, [
    dailyEnergy,
    fakeStatistics.M01x00210.battery,
    fakeStatistics.M02x00210.battery,
  ]);

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
        <Box display="flex" flexDirection="row" marginTop={2}>
          {Object.entries(fakeStatistics).map(([m, stats]) => (
            <Card
              key={m}
              onClick={() => setModule(m)}
              margin={1}
              display="flex"
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
                  <Text>{m === 'all' ? 'Tous' : m}</Text>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
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
