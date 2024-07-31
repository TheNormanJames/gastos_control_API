import { DraftExpense } from '../types';
import { Expense } from '../types/index';

export type BudgetActions =
  | { type: 'add-budget'; payload: { budget: number } }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'add-expense'; payload: { expense: DraftExpense } }
  | { type: 'remove-expense'; payload: { id: Expense['id'] } }
  | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
  | { type: 'update-expense'; payload: { expense: Expense } }
  | { type: 'reset-app' };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingid: Expense['id'];
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget');

  return localStorageBudget ? +localStorageBudget : 0;
};
const localStorageExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');

  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingid: '',
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: crypto.randomUUID(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }
  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingid: '',
    };
  }
  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }
  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload.id),
    };
  }
  if (action.type === 'get-expense-by-id') {
    return {
      ...state,
      editingid: action.payload.id,
      modal: true,
    };
  }
  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      editingid: '',
    };
  }
  if (action.type === 'reset-app') {
    return {
      budget: 0,
      modal: false,
      expenses: [],
      editingid: '',
    };
  }
  return state;
};
