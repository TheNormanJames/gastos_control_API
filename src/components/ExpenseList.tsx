import { useBudget } from '../hooks/useBudget';
import { useMemo } from 'react';
import ExpensDetails from './ExpensDetails';

export default function ExpenseList() {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);
  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos.
          </p>
          {state.expenses.map((expense) => (
            <ExpensDetails expense={expense} key={expense.id} />
          ))}
        </>
      )}
    </div>
  );
}
