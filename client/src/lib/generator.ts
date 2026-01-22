import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
  batteryLevel: number;
}

const REMARKS = [
  // Primary categories (weighted more heavily)
  "food", "shopping", "uber", "travel", "bill",
  "food", "shopping", "uber", "travel", "bill",
  "food", "shopping", "uber", "travel", "bill",
  "food", "shopping", "uber", "travel", "bill",
  "food", "shopping", "uber", "travel", "bill",
  // Secondary categories
  "pizza", "lunch", "book", "coffee", "burger", "snacks", "market", 
  "groceries", "taxi", "movie", "gift", "clothes", "dinner", 
  "breakfast", "pharmacy", "rent", "wifi", "gaming", "target", "thrift", 
  "shoes", "fitness", "gas", "subway"
];

// Helper to get random number between min and max (inclusive)
const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateTransactions = (count: number = 300): Transaction[] => {
  const transactions: Transaction[] = [];
  const totalTransactions = count;
  
  let grandTotal = 0;

  for (let i = 0; i < totalTransactions; i++) {
    // Random day between Jan 1 and Jan 19
    const day = randomInt(1, 19);
    const currentDate = new Date(2026, 0, day);
    
    // Random time between 8:00 (8am) and 22:00 (10pm)
    const hour = randomInt(8, 22);
    const minute = randomInt(0, 59);
    const transactionDate = setMinutes(setHours(currentDate, hour), minute);
    
    // Transaction amount 5 - 15 (Average $10)
    // 1 in 10 should have decimals, others whole numbers
    let amount: number;
    if (Math.random() < 0.1) {
      amount = parseFloat(randomRange(5, 15).toFixed(2));
    } else {
      amount = randomInt(5, 15);
    }
    
    transactions.push({
      id: Math.random().toString(36).substr(2, 9),
      amount: amount,
      date: transactionDate,
      remarks: REMARKS[randomInt(0, REMARKS.length - 1)],
      batteryLevel: randomInt(1, 100),
    });
    
    grandTotal += amount;
  }
  
  console.log(`Generated ${transactions.length} transactions. Total: $${grandTotal.toFixed(2)}`);
  
  return transactions;
};
