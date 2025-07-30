import { useState } from 'react';

interface CheckboxProps {
  id: number;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxOne: React.FC<CheckboxProps> = ({ name, id, checked, onChange }) => {
  return (
    <div>
      <label htmlFor={id.toString()} className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id={id.toString()}
            className="sr-only"
            checked={checked}
            onChange={onChange} // Pass event to parent component
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              checked ? 'border-primary bg-gray dark:bg-transparent' : ''
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-sm ${checked ? 'bg-[#30BFAC]' : ''}`}></span>
          </div>
        </div>
        {name}
      </label>
    </div>
  );
};

export default CheckboxOne;
