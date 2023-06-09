import React, { useCallback, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  StatGroup,
  Text,
  theme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuBatteryFull } from 'react-icons/lu';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Wind } from '@/components/Logo/Wind';
import { OneStat } from '@/components/OneStat';
import { Page, PageContent } from '@/components/Page';
import {
  BATTERY_THRESHOLD,
  FIVE_SECONDS,
  MAX_BATTERY,
  MAX_DAILY_ENERGY,
  MAX_INSTANT_ENERGY,
  MAX_NOISE_POLLUTION,
  MIN_DAILY_ENERGY,
  MIN_INSTANT_ENERGY,
  MIN_NOISE_POLLUTION,
  ONE_SECOND,
  VARIATION_DAILY_ENERGY,
  VARIATION_INSTANT_ENERGY,
  VARIATION_NOISE_POLLUTION,
  ZERO,
  initialFakeStatisticsData,
} from '@/lib/fakeData';
import {
  calculAverage,
  generateRandomBoolean,
  generateRandomNumber,
} from '@/lib/helpingFunctions';

import { useAccount } from '../account/service';

export default function PageDashboard() {
  const { t } = useTranslation(['dashboard']);
  const account = useAccount();
  const navigate = useNavigate();

  const [module, setModule] = useState('');
  const [fakeStatistics, setFakeStatistics] = useState(
    initialFakeStatisticsData
  );
  const [globalStatistics, setGlobalStatistics] = useState({
    globalInstantEnergy: ZERO,
    globalInstantEnergyPercentage: ZERO,
    globalDailyEnergy: ZERO,
    globalDailyEnergyPercentage: ZERO,
    globalNoisePollution: ZERO,
  });

  const countModulesWithoutNeedMaintenance = Object.values(
    fakeStatistics
  ).filter((value) => !value.needMaintenance).length;

  const selectedModule = fakeStatistics[module as keyof typeof fakeStatistics];

  const {
    instantEnergy = ZERO,
    dailyEnergy = ZERO,
    instantEnergyPercentage = ZERO,
    dailyEnergyPercentage = ZERO,
    noisePollution = ZERO,
    needMaintenance = false,
  } = selectedModule || {};

  const {
    globalInstantEnergy,
    globalInstantEnergyPercentage,
    globalDailyEnergy,
    globalDailyEnergyPercentage,
    globalNoisePollution,
  } = globalStatistics;

  const generateFakeInstantAndNoisePollutionData = useCallback(() => {
    let globalInstantEnergy = ZERO;
    let globalInstantEnergyPourcentage = ZERO;
    let globalNoisePollution = ZERO;

    setFakeStatistics((prevState) => {
      const newState = { ...prevState };

      Object.entries(prevState).forEach(([key, value]) => {
        const newInstantEnergy = value.needMaintenance
          ? ZERO
          : generateRandomNumber({
              min: value.instantEnergy < ZERO ? ZERO : MIN_INSTANT_ENERGY,
              max:
                value.instantEnergy < MAX_INSTANT_ENERGY
                  ? value.instantEnergy + VARIATION_INSTANT_ENERGY
                  : MAX_INSTANT_ENERGY,
            });

        const newInstantEnergyPercentage = value.needMaintenance
          ? ZERO
          : Number(
              (
                Math.round(
                  (newInstantEnergy / value.instantEnergy) *
                    VARIATION_DAILY_ENERGY
                ) - VARIATION_DAILY_ENERGY
              ).toFixed(2)
            );

        const newNoisePollution = value.needMaintenance
          ? ZERO
          : generateRandomNumber({
              min:
                value.noisePollution < VARIATION_NOISE_POLLUTION
                  ? MIN_NOISE_POLLUTION
                  : value.noisePollution - VARIATION_NOISE_POLLUTION,
              max:
                value.noisePollution > 90
                  ? MAX_NOISE_POLLUTION
                  : value.noisePollution + VARIATION_NOISE_POLLUTION,
            });

        globalInstantEnergy += newInstantEnergy;
        globalInstantEnergyPourcentage += newInstantEnergyPercentage;
        globalNoisePollution += newNoisePollution;

        (newState as any)[key] = {
          ...value,
          instantEnergy: newInstantEnergy,
          instantEnergyPercentage: newInstantEnergyPercentage,
          noisePollution: newNoisePollution,
        };
      });

      return {
        ...newState,
      };
    });

    setGlobalStatistics((prevState) => ({
      ...prevState,
      globalInstantEnergy: calculAverage(
        globalInstantEnergy,
        countModulesWithoutNeedMaintenance
      ),
      globalInstantEnergyPercentage: calculAverage(
        globalInstantEnergyPourcentage,
        countModulesWithoutNeedMaintenance
      ),
      globalNoisePollution: calculAverage(
        globalNoisePollution,
        countModulesWithoutNeedMaintenance
      ),
    }));
  }, []);

  const generateFakeDailyAndBatteryData = useCallback(() => {
    let globalDailyEnergy = ZERO;
    let globalDailyEnergyPercentage = ZERO;
    let globalBattery = ZERO;

    setFakeStatistics((prevState) => {
      const newState = { ...prevState };

      Object.entries(prevState).map(([key, value]) => {
        const newDailyEnergy = value.needMaintenance
          ? ZERO
          : generateRandomNumber({
              min:
                value.dailyEnergy > MIN_DAILY_ENERGY
                  ? value.dailyEnergy - VARIATION_DAILY_ENERGY
                  : MIN_DAILY_ENERGY,
              max:
                value.dailyEnergy < MAX_DAILY_ENERGY
                  ? value.dailyEnergy + VARIATION_DAILY_ENERGY
                  : MAX_DAILY_ENERGY,
            });

        const newDailyEnergyPercentage = value.needMaintenance
          ? ZERO
          : Number(
              (
                Math.round((newDailyEnergy / value.dailyEnergy) * 100) - 100
              ).toFixed(2)
            );

        const upOrDownBattery = generateRandomBoolean() ? 1 : -1;

        const newBattery =
          value.battery < 1 || value.needMaintenance
            ? ZERO
            : value.battery > MAX_BATTERY
            ? MAX_BATTERY
            : value.battery + upOrDownBattery;

        globalDailyEnergy += newDailyEnergy;
        globalDailyEnergyPercentage += newDailyEnergyPercentage;
        globalBattery += newBattery;

        (newState as any)[key] = {
          ...value,
          dailyEnergy: newDailyEnergy,
          dailyEnergyPercentage: newDailyEnergyPercentage,
          battery: newBattery,
        };
      });

      return {
        ...newState,
      };
    });

    setGlobalStatistics((prevState) => ({
      ...prevState,
      globalDailyEnergy: calculAverage(
        globalDailyEnergy,
        countModulesWithoutNeedMaintenance
      ),
      globalDailyEnergyPercentage: calculAverage(
        globalDailyEnergyPercentage,
        countModulesWithoutNeedMaintenance
      ),
      globalBattery: calculAverage(
        globalBattery,
        countModulesWithoutNeedMaintenance
      ),
    }));
  }, [dailyEnergy]);

  useEffect(() => {
    const interval = setInterval(() => {
      generateFakeInstantAndNoisePollutionData();
    }, ONE_SECOND);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    generateFakeInstantAndNoisePollutionData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      generateFakeDailyAndBatteryData();
    }, FIVE_SECONDS);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      <PageContent>
        <Heading size="md" mb="4">
          {t('dashboard:title')}
        </Heading>
        <Box>
          <Card marginTop={1} padding={8} minWidth="100%">
            <CardHeader display="flex" flexWrap="wrap">
              <OneStat
                title={`${t('dashboard:instantEnergy')} (kw/h)`}
                value={globalInstantEnergy}
                percentage={globalInstantEnergyPercentage}
                percentageType={
                  globalInstantEnergyPercentage > ZERO ? 'increase' : 'decrease'
                }
              />
              <OneStat
                title={`${t('dashboard:dailyEnergy')} (kw/h)`}
                value={globalDailyEnergy}
                percentage={globalDailyEnergyPercentage}
                percentageType={
                  globalDailyEnergyPercentage > ZERO ? 'increase' : 'decrease'
                }
              />
              <OneStat
                title={`${t('dashboard:noisePollution')} (Db)`}
                value={globalNoisePollution}
                percentage={undefined}
                percentageType={undefined}
              />
            </CardHeader>
          </Card>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          marginTop={2}
        >
          {Object.entries(fakeStatistics).map(([m, stats]) => (
            <Card
              key={m}
              onClick={() => {
                setModule(m);
              }}
              margin={1}
              display="flex"
              minWidth={220}
              flexDirection="row"
              alignItems="center"
              border={m === module ? '1px solid lightgrey' : 'none'}
              shadow={m === module ? 'lg' : 'none'}
            >
              <CardHeader>
                {(fakeStatistics as any)[m].needMaintenance ? (
                  <RiErrorWarningFill
                    size="40px"
                    color={theme.colors.red[400]}
                  />
                ) : (
                  <Wind />
                )}
              </CardHeader>
              <CardBody>
                <Box>
                  <Text textAlign="center">{m}</Text>

                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box>
                      <LuBatteryFull
                        color={
                          stats.battery > BATTERY_THRESHOLD
                            ? theme.colors.green[600]
                            : theme.colors.red[400]
                        }
                        size="20px"
                      />
                      <Text
                        color={
                          stats.battery > BATTERY_THRESHOLD
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
                </Box>
              </CardBody>
            </Card>
          ))}
        </Box>

        {account.isAdmin && needMaintenance && (
          <Box marginTop={2} width="100%">
            <Button
              width="100%"
              type="button"
              colorScheme="red"
              onClick={() => {
                navigate('/admin/interventions');
              }}
            >
              {t('dashboard:needMaintenance')}
            </Button>
          </Box>
        )}

        <Card align="center" padding={8} margin="10px 0px">
          <StatGroup>
            <OneStat
              title={`${t('dashboard:instantEnergy')} (kw/h)`}
              value={instantEnergy}
              percentage={instantEnergyPercentage}
              percentageType={
                instantEnergyPercentage > ZERO ? 'increase' : 'decrease'
              }
            />
            <OneStat
              title={`${t('dashboard:dailyEnergy')} (kw/h)`}
              value={dailyEnergy}
              percentage={dailyEnergyPercentage}
              percentageType={
                dailyEnergyPercentage > ZERO ? 'increase' : 'decrease'
              }
            />
            <OneStat
              title={`${t('dashboard:noisePollution')} (Db)`}
              value={noisePollution}
              percentage={undefined}
              percentageType={undefined}
            />
          </StatGroup>
        </Card>
      </PageContent>
    </Page>
  );
}
