"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface CurrencyProps {
  value?: string | number | any;
}

const Currency: React.FC<CurrencyProps> = ({
  value = 0
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Convert the value from cents to dollars
  const dollarValue = Number(value) / 100;

  return ( 
    <div className="font-semibold">
      {formatter.format(dollarValue)}
    </div>
  );
}

export default Currency;