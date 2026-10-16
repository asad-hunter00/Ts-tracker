import { useEffect, useState } from "react";
import PaymentForm from "./components/PaymentForm";
import PaymentList from "./components/PaymentList";
import Summary from "./components/Sum";
import Chart from "./components/Chart";
import { supabase } from "./supabase";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  transaction_date: string;
};

function App() {
  const [payments, setPayments] = useState<Transaction[]>([]);

  //  Supabase transaction that retrieves data

  useEffect(() => {
    async function loadPayments() {
      const result = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (result.error) {
        console.log(result.error.message);
        return;
      }

      setPayments(result.data || []);
    }

    loadPayments();
  }, []);

  async function addPayment(
    title: string,
    amount: number,
    type: "income" | "expense",
    category: string,
    date: string,
  ) {
    const newPayment = {
      title,
      amount,
      type,
      category,
      transaction_date: date,
    };

    const result = await supabase
      .from("transactions")
      .insert(newPayment)
      .select()
      .single();

    if (result.error) {
      console.log(result.error.message);
      return;
    }

    setPayments((oldPayments) => [result.data, ...oldPayments]);
  }

  async function deletePayment(id: number) {
    const result = await supabase.from("transactions").delete().eq("id", id);

    if (result.error) {
      console.log(result.error.message);
      return;
    }

    setPayments((oldPayments) =>
      oldPayments.filter((payment) => payment.id !== id),
    );
  }

  //  Supabase transaction that retrieves data

  let income = 0;
  let expense = 0;

  payments.forEach((payment) => {
    if (payment.type === "income") {
      income += payment.amount;
    } else {
      expense += payment.amount;
    }
  });

  const balance = income - expense;

  return (
    <div className="dashboard">
      <header className="header">
        <div className="brand">
          <img src="logo.png" alt="Logo" width="150" />

          <div>
            <h1>Expense Tracker</h1>
            <p>Moliyangizni nazorat qiling</p>
          </div>
        </div>
      </header>

      <Summary income={income} expense={expense} balance={balance} />

      <section className="content">
        <PaymentForm onAdd={addPayment} />
        <PaymentList payments={payments} onDelete={deletePayment} />
        <Chart payments={payments} />
      </section>
    </div>
  );
}

export default App;
