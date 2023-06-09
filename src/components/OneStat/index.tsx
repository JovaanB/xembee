import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';

export const OneStat = ({
  title,
  value,
  percentage,
  percentageType,
}: {
  title: string;
  value: number;
  percentage: number | undefined;
  percentageType: string | undefined;
}) => (
  <Stat minWidth="200px">
    <StatLabel>{title}</StatLabel>
    <StatNumber>{value}</StatNumber>
    {percentage === undefined ? null : (
      <StatHelpText>
        <StatArrow type={percentageType as 'increase' | 'decrease'} />
        {percentage}%
      </StatHelpText>
    )}
  </Stat>
);
