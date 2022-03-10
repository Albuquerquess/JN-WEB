export const formatPhone = (phone: string) => {
  return phone
    .replaceAll('_', '')
    .replaceAll('+', '')
    .replaceAll('(', '')
    .replaceAll('-', '')
    .replaceAll(' ', '')
    .replaceAll(')', '');
};
