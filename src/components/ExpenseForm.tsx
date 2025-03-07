import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { DraftExpense } from '../types';
import { Value } from '../types/index';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });
  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);

  const { dispatch, state, remainingBudget } = useBudget();
  useEffect(() => {
    if (state.editingid) {
      const editingExpense = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editingid
      )[0];
      setExpense(editingExpense);
      setPreviousAmount(editingExpense.amount);
    }
  }, [state.editingid]);

  const hangleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };
  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validar
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // Validad que no pase del límite
    if (expense.amount - previousAmount > remainingBudget) {
      setError('Ese gasto se sale del presupuesto');
      return;
    }

    // Agregar o actualizar Gasto
    if (state.editingid) {
      dispatch({
        type: 'update-expense',
        payload: { expense: { ...expense, id: state.editingid } },
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    // Reiniciar
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });

    setPreviousAmount(0);
  };
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        {state.editingid ? 'Actualizar Gasto' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Agerga el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={hangleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Agerga la cantidad del gasto: ej. 100"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={hangleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Categoríá:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={hangleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingid ? 'Actualizar Gasto' : 'Registrar Gasto'}
      />
    </form>
  );
}
