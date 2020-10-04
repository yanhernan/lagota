import {useRef} from 'react';
import debounce from 'lodash.debounce';

export const useDebounce = (
  func: (params?: any) => void,
  wait: number = 500,
) => {
  const funcRes = useRef(debounce(func, wait)).current;
  return funcRes;
};
