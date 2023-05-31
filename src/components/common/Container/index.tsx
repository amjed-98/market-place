import { type ReactNode } from 'react';

type Props = {
  children: ReactNode | ReactNode[];
  className?: string;
};

function Container({ children, className = '' }: Props) {
  return <div className={`px-40 max-lg:px-8  ${className}`}>{children}</div>;
}

export default Container;
