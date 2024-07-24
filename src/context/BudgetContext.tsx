import { createContext, ReactNode, useReducer } from 'react';
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from '../reducers/budget-reducer';

type BugetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
};
type BudgetProviderProps = {
  children: ReactNode;
};
export const BudgetContext = createContext<BugetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
