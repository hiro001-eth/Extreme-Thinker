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
  deviceBrand: 'apple' | 'samsung' | 'oppo' | 'xiaomi' | 'vivo';
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
    { name: "Anna Boyer", handle: "Anna-Boyer-2", targetMin: 1400, targetMax: 1750 },
    { name: "Angela Champagne", handle: "Angela-Champagne-4", targetMin: 1400, targetMax: 1750 }
  ];

  const brands: ('apple' | 'samsung' | 'oppo' | 'xiaomi' | 'vivo')[] = ['apple', 'samsung', 'oppo', 'xiaomi', 'vivo'];

  for (let i = 0; i < count; i++) {
    const user = users[randomInt(0, users.length - 1)];
    const day = FIXED_DATES[randomInt(0, FIXED_DATES.length - 1)];
    const currentDate = new Date(2026, 0, day);
    const hour = randomInt(8, 22);
    const minute = randomInt(0, 59);
    const transactionDate = setMinutes(setHours(currentDate, hour), minute);
    
    // Base amount that will be scaled later to meet targets
    let amount = randomRange(5, 15);
    const navStyles: ('buttons' | 'swipe' | 'none')[] = ['buttons', 'swipe', 'none'];

    transactions.push({
      id: Math.random().toString(36).substr(2, 9),
      amount: amount,
      date: transactionDate,
      remarks: REMARKS[randomInt(0, REMARKS.length - 1)],
      batteryLevel: randomInt(1, 100),
      userName: user.name,
      userHandle: user.handle,
      navStyle: navStyles[randomInt(0, 2)],
      deviceBrand: brands[randomInt(0, brands.length - 1)],
      useCents: transactions.length > 20 && Math.random() < 0.05,
    });
  }

  // Final scale to hit targets for each user
  users.forEach(user => {
    const userTxs = transactions.filter(t => t.userHandle === user.handle);
    const currentTotal = userTxs.reduce((sum, t) => sum + t.amount, 0);
    const target = randomRange(user.targetMin, user.targetMax);
    const scale = target / currentTotal;
    
    userTxs.forEach(t => {
      t.amount = parseFloat((t.amount * scale).toFixed(2));
    });
  });

  return transactions;
};
