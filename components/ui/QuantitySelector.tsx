import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector = ({ initialQuantity = 1, onChange}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      onChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        onChange(newQuantity);
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
      onChange(value);
    }
  };

  return (
    <div className="flex items-center">
      <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
      <Input type="number" value={quantity} onChange={handleInputChange} />
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
};

export default QuantitySelector;