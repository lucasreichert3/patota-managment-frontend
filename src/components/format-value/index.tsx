import React from 'react';
import CurrencyFormat from 'react-currency-format';

interface Props {
  value: number;
}

function FormatValue({value}: Props) {
  return (
    <CurrencyFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={'R$'}
      decimalSeparator='.'
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

export default FormatValue;
