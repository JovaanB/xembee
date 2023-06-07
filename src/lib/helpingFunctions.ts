export const generateRandomNumber = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomBoolean = () => {
  return Math.random() < 0.5;
};
