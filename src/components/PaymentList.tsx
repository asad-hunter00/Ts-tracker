import { useState } from "react";
import PaymentItem from "./PaymentItem";
import { categories } from "../constants";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
};

type PaymentListProps = {
  payments: Transaction[];
  onDelete: (id: number) => void;
};

function PaymentList({ payments, onDelete }: PaymentListProps) {
  const [category, setCategory] = useState("All");

  let shownPayments = payments;

  if (category !== "All") {
    shownPayments = payments.filter((payment) => payment.category === category);
  }

  return (
    <div className="transactions">
      <div className="section-title transaction-heading">
        <div>
          <h3>Tranzaksiyalar</h3>
          <p>Barcha kirim va chiqimlar</p>
        </div>

        <span className="count">{shownPayments.length} ta</span>
      </div>

      <label htmlFor="category-filter" className="category-filter">
        Kategoriya bo‘yicha filter
      </label>

      <select
        id="category-filter"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">Barcha kategoriyalar</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="transaction-list">
        {shownPayments.length === 0 ? (
          <p className="empty">Natija topilmadi</p>
        ) : (
          shownPayments.map((payment) => (
            <PaymentItem
              key={payment.id}
              payment={payment}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PaymentList;
