const replacedValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const formatInputLength = (value: string) =>
  Number(value.replace(' ', '').replace(replacedValues, ''));

export default formatInputLength;
