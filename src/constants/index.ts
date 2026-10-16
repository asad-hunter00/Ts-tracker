export const categories = [
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

export const incomeCategories = [
  "Salary",
  "Bonus",
  "Gift",
  "Investment",
  "Other",
];

export const expenseCategories = [
  "Food",
  "Shopping",
  "Transport",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Other",
];

export const payments = [
  {
    id: 1,
    title: "Kiyim sotib olish",
    amount: 300000,
    type: "expense" as const,
    category: "Shopping",
  },
  {
    id: 2,
    title: "Ish haqi",
    amount: 500000,
    type: "income" as const,
    category: "Salary",
  },
];
