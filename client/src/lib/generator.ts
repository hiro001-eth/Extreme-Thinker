import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
  batteryLevel: number;
  userName: string;
  userHandle: string;
  navStyle: 'buttons' | 'swipe' | 'none';
  useCents?: boolean;
}

const REMARKS = [
  "food", "food", "food", "food", "food",
  "food", "food", "food", "food", "food",
  "food", "food", "food", "food", "food",
  "gas", "pizza", "shop", "-", "lunch", "market", "groceries", "taxi", "coffee", "snacks"
];

const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const FIXED_DATES = [1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export const generateTransactions = (count: number = 350): Transaction[] => {
  const transactions: Transaction[] = [];
  
  const users = [
    { name: "Anna Boyer", handle: "Anna-Boyer-2", targetMin: 1400, targetMax: 1750, count: Math.floor(count / 2) },
    { name: "Angela Champagne", handle: "Angela-Champagne-4", targetMin: 1400, targetMax: 1750, count: count - Math.floor(count / 2) }
  ];

  users.forEach(user => {
    let userTotal = 0;
    const userTransactions: Transaction[] = [];
    
    // Distribute transactions evenly across the fixed dates
    const txPerDay = Math.floor(user.count / FIXED_DATES.length);
    const remainder = user.count % FIXED_DATES.length;

    FIXED_DATES.forEach((day, index) => {
      const dailyCount = txPerDay + (index < remainder ? 1 : 0);
      
      for (let i = 0; i < dailyCount; i++) {
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
          userHandle: user.handle,
          navStyle: navStyles[randomInt(0, 2)],
          useCents: transactions.length + userTransactions.length > 20 && Math.random() < 0.05,
        });
        userTotal += amount;
      }
    });

    const currentTarget = randomRange(user.targetMin, user.targetMax);
    const scaleFactor = currentTarget / userTotal;
    
    userTransactions.forEach(t => {
      t.amount = parseFloat((t.amount * scaleFactor).toFixed(2));
      transactions.push(t);
    });
  });

  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
};
