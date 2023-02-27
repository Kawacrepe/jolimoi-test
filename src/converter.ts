export interface RomanNumeral {
  value: number;
  numeral: string;
}

export const toRomanNumeral = (number: number): string => {
  // Some defensive programming, just in case
  // Should not be necessary, as the input is validated in the route handler
  if (number < 0 || number > 100 || isNaN(number)) {
    throw new Error('Invalid input. Please provide a number between 0 and 100.');
  }

  const romanNumerals: RomanNumeral[] = [
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];
  
  const convert = (accumulator: string, {value, numeral}: RomanNumeral): string => {
    while (number >= value) {
      accumulator += numeral;
      number -= value;
    }
    return accumulator;
  };
  
  return romanNumerals.reduce(convert, '');
};