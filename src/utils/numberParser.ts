export const removeNonNumericCharacters = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const fixStringToReais = (value: string): number => {
  return parseFloat(removeNonNumericCharacters(value)) / 100;
};
