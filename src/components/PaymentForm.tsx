import { Controller, useForm } from "react-hook-form";
import { expenseCategories, incomeCategories } from "../constants";

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

type FormValues = {
  title: string;
  amount: string;
  type: Type;
  category: string;
  date: string;
};

function PaymentForm({ onAdd }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      amount: "",
      type: "income",
      category: "Salary",
      date: "",
    },
  });

  const selectedType = watch("type");

  let currentCategories: string[] = [];

  if (selectedType === "income") {
    currentCategories = incomeCategories;
  } else {
    currentCategories = expenseCategories;
  }

  function getInputClass(hasError: boolean) {
    let className = "form-input";

    if (hasError) {
      className += " input-error";
    }

    return className;
  }

  function onSubmit(values: FormValues) {
    onAdd(
      values.title.trim(),
      Number(values.amount),
      values.type,
      values.category,
      values.date,
    );

    reset();
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="form-title">Yangi tranzaksiya</h3>
      <p className="form-description">
        Kirim yoki chiqim ma'lumotlarini kiriting
      </p>

      <div className="form-group">
        <label htmlFor="title">Nomi</label>

        <Controller
          name="title"
          control={control}
          rules={{
            validate: (value) =>
              value.trim() !== "" || "Iltimos, nomini to‘ldiring!",
          }}
          render={({ field }) => (
            <input
              {...field}
              className={getInputClass(Boolean(errors.title))}
              id="title"
              type="text"
              placeholder="Masalan, Oylik maosh"
            />
          )}
        />

        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Summa (so'm)</label>

        <Controller
          name="amount"
          control={control}
          rules={{
            validate: (value) =>
              Number(value) > 0 || "Summani to‘g‘ri kiriting!",
          }}
          render={({ field }) => (
            <input
              {...field}
              className={getInputClass(Boolean(errors.amount))}
              id="amount"
              type="number"
              min="1"
              placeholder="Masalan, 500000"
            />
          )}
        />

        {errors.amount && (
          <span className="error-message">{errors.amount.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="type">Tranzaksiya turi</label>

        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="form-input"
              id="type"
              onChange={(event) => {
                const newType = event.target.value as Type;

                field.onChange(newType);

                if (newType === "income") {
                  setValue("category", "Salary");
                } else {
                  setValue("category", expenseCategories[0]);
                }
              }}
            >
              <option value="income">Kirim - (Income)</option>
              <option value="expense">Chiqim - (Expense)</option>
            </select>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategoriya</label>

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select {...field} className="form-input" id="category">
              {currentCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Sana</label>

        <Controller
          name="date"
          control={control}
          rules={{
            required: "Iltimos, sanani tanlang!",
          }}
          render={({ field }) => (
            <input
              {...field}
              className={getInputClass(Boolean(errors.date))}
              id="date"
              type="date"
            />
          )}
        />

        {errors.date && (
          <span className="error-message">{errors.date.message}</span>
        )}
      </div>

      <button className="submit-button" type="submit">
        + Tranzaksiya qo‘shish
      </button>
    </form>
  );
}

export default PaymentForm;
