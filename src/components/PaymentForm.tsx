import { useState, type FormEvent } from "react";

type Type = "income" | "expense";

type Props = {
  onAdd: (
    title: string,
    amount: number,
    type: Type,
    category: string,
    date: string,
  ) => void;
};

const incomeCategories = ["Salary", "Bonus", "Gift", "Investment", "Other"];

const expenseCategories = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Other",
];

function PaymentForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<Type>("income");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [dateError, setDateError] = useState(false);

  let titleClass = "form-input";
  if (titleError) {
    titleClass += " input-error";
  }

  let amountClass = "form-input";
  if (amountError) {
    amountClass += " input-error";
  }

  let dateClass = "form-input";
  if (dateError) {
    dateClass += " input-error";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const titleIsEmpty = title.trim() === "";
    const amountIsWrong = amount === "" || Number(amount) <= 0;
    const dateIsEmpty = date === "";

    setTitleError(titleIsEmpty);
    setAmountError(amountIsWrong);
    setDateError(dateIsEmpty);

    if (titleIsEmpty || amountIsWrong || dateIsEmpty) {
      return;
    }

    onAdd(title.trim(), Number(amount), type, category, date);

    setTitle("");
    setAmount("");
    setType("income");
    setCategory("Salary");
    setDate("");
    setTitleError(false);
    setAmountError(false);
    setDateError(false);
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Yangi tranzaksiya</h3>
      <p className="form-description">
        Kirim yoki chiqim ma'lumotlarini kiriting
      </p>

      <div className="form-group">
        <label htmlFor="title">Nomi</label>
        <input
          className={titleClass}
          id="title"
          type="text"
          placeholder="Masalan, Oylik maosh"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);

            if (event.target.value.trim() !== "") {
              setTitleError(false);
            }
          }}
        />
        {titleError && (
          <span className="error-message">Iltimos, nomini to‘ldiring!</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Summa (so'm)</label>
        <input
          className={amountClass}
          id="amount"
          type="number"
          min="1"
          placeholder="Masalan, 500000"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);

            if (Number(event.target.value) > 0) {
              setAmountError(false);
            }
          }}
        />
        {amountError && (
          <span className="error-message">Summani to‘g‘ri kiriting!</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="type">Tranzaksiya turi</label>
        <select
          className="form-input"
          id="type"
          value={type}
          onChange={(event) => setType(event.target.value as Type)}
        >
          <option value="income">Kirim - (Income)</option>
          <option value="expense">Chiqim - (Expense)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategoriya</label>
        <select
          className="form-input"
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <optgroup label="Kirim kategoriyalari">
            {incomeCategories.map((item) => (
              <option key={`income-${item}`} value={item}>
                {item}
              </option>
            ))}
          </optgroup>

          <optgroup label="Chiqim kategoriyalari">
            {expenseCategories.map((item) => (
              <option key={`expense-${item}`} value={item}>
                {item}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Sana</label>
        <input
          className={dateClass}
          id="date"
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);

            if (event.target.value !== "") {
              setDateError(false);
            }
          }}
        />
        {dateError && (
          <span className="error-message">Iltimos, sanani tanlang!</span>
        )}
      </div>

      <button className="submit-button" type="submit">
        + Tranzaksiya qo‘shish
      </button>
    </form>
  );
}

export default PaymentForm;
