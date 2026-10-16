import { useState } from "react";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  transaction_date?: string;
};

type Props = {
  payment: Transaction;
  onDelete: (id: number) => void;
};

const icons: Record<string, string> = {
  Food: "fa-utensils",
  Shopping: "fa-cart-shopping",
  Transport: "fa-car",
  Salary: "fa-money-bill-wave",
  Entertainment: "fa-gamepad",
  Bills: "fa-file-invoice-dollar",
  Health: "fa-heart-pulse",
  Education: "fa-graduation-cap",
  Other: "fa-wallet",
};

function PaymentItem({ payment, onDelete }: Props) {
  const [modalOchilsin, setModalOchilsin] = useState(false);

  const kirimmi = payment.type === "income";
  const belgi = kirimmi ? "+" : "-";
  const turi = kirimmi ? "Kirim" : "Chiqim";

  const sana = payment.transaction_date
    ? payment.transaction_date.split("-").reverse().join(".")
    : "Sana yo‘q";

  return (
    <>
      <div className="transaction">
        <div className="transaction-info">
          <div className={`transaction-icon ${payment.type}`}>
            <i
              className={`fa-solid ${icons[payment.category] || "fa-wallet"}`}
            />
          </div>

          <div>
            <strong>{payment.title}</strong>
            <p>
              {turi} • {payment.category} • {sana}
            </p>
          </div>
        </div>

        <div className="transaction-actions">
          <strong className={payment.type}>
            {belgi}
            {payment.amount.toLocaleString()} so'm
          </strong>

          <button
            className="delete"
            onClick={() => setModalOchilsin(true)}
            title="O'chirish"
          >
            <i className="fa-solid fa-trash" />
          </button>
        </div>
      </div>

      {modalOchilsin && (
        <div className="modal-overlay" onClick={() => setModalOchilsin(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <i className="fa-solid fa-trash" />
            </div>

            <h3>Tranzaksiyani o‘chirish</h3>
            <p>
              <strong>{payment.title}</strong> tranzaksiyasini
              o‘chirmoqchimisiz?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setModalOchilsin(false)}
              >
                Bekor qilish
              </button>

              <button
                className="confirm-delete-button"
                onClick={() => onDelete(payment.id)}
              >
                Ha, o‘chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentItem;
