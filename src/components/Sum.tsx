type SummaryProps = {
  income: number;
  expense: number;
  balance: number;
};

function Summary({ income, expense, balance }: SummaryProps) {
  return (
    <section className="summary">
      <div className="card income-card">
        <div className="card-top">
          <div className="card-icon income-bg">
            <i className="fa-solid fa-arrow-trend-up"></i>
          </div>
          <span>Jami kirim</span>
        </div>

        <h2>
          {income.toLocaleString()} <small>so'm</small>
        </h2>
        <p>Umumiy daromadingiz</p>
      </div>

      <div className="card expense-card">
        <div className="card-top">
          <div className="card-icon expense-bg">
            <i className="fa-solid fa-arrow-trend-down"></i>
          </div>
          <span>Jami chiqim</span>
        </div>

        <h2>
          {expense.toLocaleString()} <small>so'm</small>
        </h2>
        <p>Umumiy xarajatlaringiz</p>
      </div>

      <div className="card balance-card">
        <div className="card-top">
          <div className="card-icon balance-bg">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <span>Jami balans</span>
        </div>

        <h2 className={balance < 0 ? "negative" : ""}>
          {balance.toLocaleString()} <small>so'm</small>
        </h2>
        <p>Kirim va chiqim farqi</p>
      </div>
    </section>
  );
}

export default Summary;
