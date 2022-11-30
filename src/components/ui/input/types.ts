import React, { ReactNode } from 'react';

export type TInputPropsOption = {
  value: string | number | boolean;
  label: string;
};

export type TInputProps = React.HTMLAttributes<HTMLDivElement> & {
  type: 'select' | 'text' | 'number' | 'multiselect' | 'date' | 'min-max';
  value: any;
  onValue: (v: any) => void;
  label?: string;
  min?: number;
  max?: number;
  options?: Array<TInputPropsOption>;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  helper?: string | ReactNode;
};
