export const formatPhone = (phone: string) => {
  return phone
    .replaceAll('_', '')
    .replaceAll('+', '')
    .replaceAll('(', '')
    .replaceAll('-', '')
    .replaceAll(' ', '')
    .replaceAll(')', '');
};

export const formatNumber = (number: string) => {
  return Number(number.replaceAll(/[^\d,-]/g, '').replaceAll(`,`, `.`));
};

export const formatCurrency = (value: any) => {
  let valor = value;

  valor += '';
  valor = Number(valor.replace(/[\D]+/g, ''));
  valor += '';
  valor = valor.replace(/([0-9]{2})$/g, ',$1');

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }

  if (valor === 'NaN') {
    return 'R$ 0,00';
  }
  return `R$ ${valor}`;
};
