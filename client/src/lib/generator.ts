import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
  batteryLevel: number;
  userName: string;
  navStyle: 'buttons' | 'swipe' | 'none';
}

const REMARKS = [
  "food", "gas", "pizza", "shop", "-",
  "food", "gas", "pizza", "shop", "-",
  "food", "gas", "pizza", "shop", "-",
  "food", "gas", "pizza", "shop", "-",
  "food", "gas", "pizza", "shop", "-",
  "food", "lunch", "market", "groceries", "taxi", "coffee", "snacks"
];

const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateTransactions = (count: number = 350): Transaction[] => {
  const transactions: Transaction[] = [];
  const users = [
    { name: "Anna Boyer", targetMin: 1400, targetMax: 1750, count: Math.floor(count / 2) },
    { name: "Angela Champagne", targetMin: 1400, targetMax: 1750, count: count - Math.floor(count / 2) }
  ];

  users.forEach(user => {
    let userTotal = 0;
    const userTransactions: Transaction[] = [];

    for (let i = 0; i < user.count; i++) {
      const day = randomInt(1, 19);
      const currentDate = new Date(2026, 0, day);
      const hour = randomInt(8, 22);
      const minute = randomInt(0, 59);
      const transactionDate = setMinutes(setHours(currentDate, hour), minute);
      
      let amount: number;
      if (Math.random() < 0.1) {
        amount = parseFloat(randomRange(5, 15).toFixed(2));
      } else {
        amount = randomInt(5, 15);
      }
      
      const navStyles: ('buttons' | 'swipe' | 'none')[] = ['buttons', 'swipe', 'none'];

      userTransactions.push({
        id: Math.random().toString(36).substr(2, 9),
        amount: amount,
        date: transactionDate,
        remarks: REMARKS[randomInt(0, REMARKS.length - 1)],
        batteryLevel: randomInt(1, 100),
        userName: user.name,
        navStyle: navStyles[randomInt(0, 2)],
      });
      userTotal += amount;
    }

    // Scale amounts slightly to hit the target range if needed
    const currentTarget = randomRange(user.targetMin, user.targetMax);
    const scaleFactor = currentTarget / userTotal;
    
    userTransactions.forEach(t => {
      t.amount = parseFloat((t.amount * scaleFactor).toFixed(2));
      // Ensure we keep the whole number preference roughly
      if (Math.random() > 0.1) t.amount = Math.round(t.amount);
      if (t.amount < 1) t.amount = randomInt(5, 10);
      transactions.push(t);
    });
  });

  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
};
