import Summary from "../components/Sum.tsx";
import PaymentForm from "../components/PaymentForm";
import PaymentList from "../components/PaymentList";

function Home() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p>Moliyangizni nazorat qiling</p>
      </header>

      <Summary income={500000} expense={300000} balance={200000} />

      <section className="content">
        <PaymentForm onAdd={() => {}} />

        <PaymentList payments={[]} onDelete={() => {}} />
      </section>
    </div>
  );
}

export default Home;
