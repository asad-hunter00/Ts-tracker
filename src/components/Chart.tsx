import { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
};

type Props = {
  payments: Transaction[];
};

const categories = [
  "Food",
  "Shopping",
  "Transport",
  "Salary",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Other",
];

function Chart({ payments }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const labels = [...categories];
    const income: Record<string, number> = {};
    const expense: Record<string, number> = {};

    labels.forEach((category) => {
      income[category] = 0;
      expense[category] = 0;
    });

    payments.forEach((payment) => {
      const category = payment.category.trim();

      if (!labels.includes(category)) {
        labels.push(category);
        income[category] = 0;
        expense[category] = 0;
      }

      if (payment.type === "income") {
        income[category] += payment.amount;
      } else {
        expense[category] += payment.amount;
      }
    });

    const incomeAmounts = labels.map((category) => income[category]);
    const expenseAmounts = labels.map((category) => expense[category]);

    const totalIncome = incomeAmounts.reduce((sum, amount) => sum + amount, 0);
    const totalExpense = expenseAmounts.reduce(
      (sum, amount) => sum + amount,
      0,
    );

    const chart = new ChartJS(canvas, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Kirim",
            data: incomeAmounts,
            backgroundColor: "#16a34a",
          },
          {
            label: "Chiqim",
            data: expenseAmounts,
            backgroundColor: "#ef4444",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label(context) {
                const amount = Number(context.raw);
                const total =
                  context.dataset.label === "Kirim"
                    ? totalIncome
                    : totalExpense;
                const percent = total
                  ? ((amount / total) * 100).toFixed(1)
                  : "0";

                return `${context.dataset.label}: ${amount.toLocaleString()} so‘m (${percent}%)`;
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [payments]);

  return (
    <div className="chart-card">
      <h3>Kategoriyalar bo‘yicha kirim va chiqim</h3>
      <p>
        <span
          style={{
            color: "#16a34a",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
          }}
        >
          Yashil
        </span>
        — kirim,
        <span
          style={{
            color: "#ef4444",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
          }}
        >
          Qizil
        </span>
        — chiqim
      </p>

      {payments.length > 0 ? (
        <div className="chart-container">
          <canvas ref={canvasRef}></canvas>
        </div>
      ) : (
        <p>Hozircha tranzaksiya yo‘q</p>
      )}
    </div>
  );
}

export default Chart;
