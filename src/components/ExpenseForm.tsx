import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

export default function ExpenseForm() {
  type ValuePiece = Date | null;

  type Value = ValuePiece | [ValuePiece, ValuePiece];
  return (
    <form action="" className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>

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
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Categoríá:
        </label>
        <select id="category" className="bg-slate-100 p-2" name="category">
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
        <DatePicker className="bg-slate-100 p-2 border-0" />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Registrar Gasto"
      />
    </form>
  );
}
