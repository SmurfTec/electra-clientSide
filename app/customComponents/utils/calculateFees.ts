interface Fee {
  id: number;
  created_on: string;
  updated_on: string;
  type: string;
  fees: string;
  category: {
    id: number | null;
    name: string | null;
  };
  value_type: 'percentage' | 'value';
}

interface CalculatedFee extends Fee {
  calculatedFee: number;
}

export function calculateFees(fees: Fee[], baseAmount: number): CalculatedFee[] {
  const relevantFees = fees.filter(
    (fee) =>
      fee.type === 'Sales Tax' ||
      fee.type === 'Processing Fee' ||
      fee.type === 'Marketplace' ||
      fee.type === 'Shipping Fee'
  );

  return relevantFees.map((fee): CalculatedFee => {
    if (fee.value_type === 'percentage') {
      return {
        ...fee,
        calculatedFee: (baseAmount * parseFloat(fee.fees)) / 100,
      };
    } else {
      return {
        ...fee,
        calculatedFee: parseFloat(fee.fees),
      };
    }
  });
}
