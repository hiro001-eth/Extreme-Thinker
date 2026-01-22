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

const DATE_WEIGHTS: Record<number, number> = {
  1: 192, 2: 136, 3: 217, 4: 162, 11: 293, 12: 279, 13: 132, 14: 183, 15: 152, 16: 112, 17: 182, 18: 116, 19: 147
};

const getWeightedRandomDay = () => {
  const totalWeight = Object.values(DATE_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  for (const [day, weight] of Object.entries(DATE_WEIGHTS)) {
    random -= weight;
    if (random <= 0) return parseInt(day);
  }
  return 11;
};

export const generateTransactions = (count: number = 350): Transaction[] => {
  const transactions: Transaction[] = [];
  const users = [
    { name: "Anna Boyer", targetMin: 3100, targetMax: 3500, count: count }
  ];

  users.forEach(user => {
    let userTotal = 0;
    const userTransactions: Transaction[] = [];

    for (let i = 0; i < user.count; i++) {
      const day = getWeightedRandomDay();
      const currentDate = new Date(2026, 0, day);
      const hour = randomInt(8, 22);
      const minute = randomInt(0, 59);
      const transactionDate = setMinutes(setHours(currentDate, hour), minute);
      
      let amount = randomRange(5, 15);
      
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

    const currentTarget = randomRange(user.targetMin, user.targetMax);
    const scaleFactor = currentTarget / userTotal;
    
    userTransactions.forEach(t => {
      t.amount = parseFloat((t.amount * scaleFactor).toFixed(2));
      transactions.push(t);
    });
  });

  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
};
