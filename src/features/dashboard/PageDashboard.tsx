import React, { useEffect, useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  FormLabel,
  Heading,
  Select,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuBattery } from 'react-icons/lu';

import { Page, PageContent } from '@/components/Page';

export default function PageDashboard() {
  const { t } = useTranslation(['dashboard']);

  const [module, setModule] = useState('module0');
  const [fakeStatistics, setFakeStatistics] = useState({
    module0: {
      battery: 70,
      instantEnergy: 300,
      dailyEnergy: 377,
      instantEnergyPercentage: 1,
      dailyEnergyPercentage: 1,
    },
    module1: {
      battery: 70,
      instantEnergy: 300,
      dailyEnergy: 377,
      instantEnergyPercentage: 1,
      dailyEnergyPercentage: 1,
    },
    module2: {
      battery: 70,
      instantEnergy: 300,
      dailyEnergy: 377,
      instantEnergyPercentage: 1,
      dailyEnergyPercentage: 1,
    },
  });

  const selectedModule = fakeStatistics[module as keyof typeof fakeStatistics];

  const {
    instantEnergy,
    dailyEnergy,
    instantEnergyPercentage,
    dailyEnergyPercentage,
  } = selectedModule;

  useEffect(() => {
    const interval = setInterval(() => {
      if (instantEnergy < 0) {
        setFakeStatistics((prevState) => ({
          module0: {
            ...prevState.module0,
            instantEnergy: 0,
            instantEnergyPercentage: 0,
            dailyEnergy: 0,
            dailyEnergyPercentage: 0,
          },
          module1: {
            ...prevState.module1,
            instantEnergy: 0,
            instantEnergyPercentage: 0,
          },
          module2: {
            ...prevState.module2,
            instantEnergy: 0,
            instantEnergyPercentage: 0,
          },
        }));
      }

      const generateRandomNumber = ({
        min,
        max,
      }: {
        min: number;
        max: number;
      }) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const newInstantEnergy = generateRandomNumber({
        min: instantEnergy > 100 ? instantEnergy - 20 : 300,
        max: instantEnergy > 100 ? instantEnergy + 20 : 350,
      });

      const newInstantEnergyPercentage = Number(
        (Math.abs((newInstantEnergy / instantEnergy) * 100) - 100).toFixed(2)
      );

      setFakeStatistics((prevState) => ({
        module0: {
          ...prevState.module0,
          instantEnergy:
            (fakeStatistics.module1.instantEnergy +
              fakeStatistics.module2.instantEnergy) /
            2,
          instantEnergyPercentage:
            (fakeStatistics.module1.instantEnergyPercentage +
              fakeStatistics.module2.instantEnergyPercentage) /
            2,
        },
        module1: {
          ...prevState.module1,
          instantEnergy: newInstantEnergy,
          instantEnergyPercentage: newInstantEnergyPercentage,
        },
        module2: {
          ...prevState.module2,
          instantEnergy: newInstantEnergy,
          instantEnergyPercentage: newInstantEnergyPercentage,
        },
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [instantEnergy]);

  useEffect(() => {
    const interval = setInterval(() => {
      const generateRandomNumber = ({
        min,
        max,
      }: {
        min: number;
        max: number;
      }) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const newDailyEnergy = generateRandomNumber({
        min: dailyEnergy > 100 ? dailyEnergy - 10 : 300,
        max: dailyEnergy > 100 ? dailyEnergy + 10 : 350,
      });

      const newDailyEnergyPercentage = Number(
        (Math.abs((newDailyEnergy / dailyEnergy) * 100) - 100).toFixed(2)
      );

      setFakeStatistics((prevState) => ({
        ...prevState,
        module1: {
          ...prevState.module1,
          dailyEnergy: newDailyEnergy,
          dailyEnergyPercentage: newDailyEnergyPercentage,
        },
        module2: {
          ...prevState.module2,
          dailyEnergy: newDailyEnergy,
          dailyEnergyPercentage: newDailyEnergyPercentage,
        },
      }));

      if (module.length > 0) {
        const upOrDownBatteryModuleOne = Math.random() < 0.5 ? -1 : 1;
        const upOrDownBatteryModuleTwo = Math.random() < 0.5 ? -1 : 1;
        const newBatteryModuleOne =
          fakeStatistics.module1.battery + upOrDownBatteryModuleOne;
        const newBatteryModuleTwo =
          fakeStatistics.module2.battery + upOrDownBatteryModuleTwo;

        setFakeStatistics((prevState) => ({
          ...prevState,
          module1: {
            ...prevState.module1,
            battery: newBatteryModuleOne,
          },
          module2: {
            ...prevState.module2,
            battery: newBatteryModuleTwo,
          },
        }));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [module, dailyEnergy]);

  useEffect(() => {
    if (fakeStatistics.module1.battery < 0) {
      setFakeStatistics((prevState) => ({
        ...prevState,
        module1: {
          ...prevState.module1,
          battery: 0,
        },
      }));
    }

    if (fakeStatistics.module2.battery < 0) {
      setFakeStatistics((prevState) => ({
        ...prevState,
        module2: {
          ...prevState.module2,
          battery: 0,
        },
      }));
    }

    if (fakeStatistics.module1.battery > 100) {
      setFakeStatistics((prevState) => ({
        ...prevState,
        module1: {
          ...prevState.module1,
          battery: 100,
        },
      }));
    }

    if (fakeStatistics.module2.battery > 100) {
      setFakeStatistics((prevState) => ({
        ...prevState,
        module2: {
          ...prevState.module2,
          battery: 100,
        },
      }));
    }
  }, [fakeStatistics.module1.battery, fakeStatistics.module2.battery]);

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
        <Stack direction="row" spacing="4" mt="4">
          <Stack direction="column" spacing="1" flex="1">
            <FormLabel htmlFor="module">
              {t('dashboard:selectModule')}
            </FormLabel>
            <Select
              id="module"
              defaultValue="module0"
              onChange={(e) => setModule(e.target.value)}
              variant="filled"
            >
              <option value="module0">Tous les modules</option>
              <option value="module1">Module X011-01</option>
              <option value="module2">Module X011-02</option>
            </Select>
          </Stack>
        </Stack>
        {module === 'module0' ? (
          <Alert status="warning" borderRadius="md" marginTop={3}>
            <AlertIcon />
            <Box flex="1">
              <AlertDescription display="block">
                {t('dashboard:warning.noModuleSelected')}
                <br />
              </AlertDescription>
            </Box>
          </Alert>
        ) : (
          <Alert
            status={selectedModule.battery > 60 ? 'success' : 'error'}
            borderRadius="md"
            marginTop={3}
          >
            <AlertDescription display="block">
              <Box display="flex">
                <LuBattery size="20px" />
                <Text fontWeight={800} ml={1}>
                  {selectedModule.battery}%
                </Text>
              </Box>
            </AlertDescription>
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
