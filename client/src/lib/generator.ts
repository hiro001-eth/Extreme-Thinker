import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
}

const REMARKS = [
  "pizza", "lunch", "book", "bill", "coffee", "burger", "snacks", "market", 
  "groceries", "uber", "taxi", "movie", "gift", "clothes", "dinner", 
  "breakfast", "pharmacy", "rent", "wifi", "gaming", "target", "thrift", 
  "shoes", "fitness", "gas", "subway", "coffee run", "pizza night", 
  "lunch date", "book haul", "rent due", "wifi bill", "gym fee", 
  "gas station", "gift shop", "movie ticket"
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
    // For 300 transactions, total will be roughly $3000
    const amount = randomRange(5, 15);
    
    transactions.push({
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(amount.toFixed(2)),
      date: transactionDate,
      remarks: REMARKS[randomInt(0, REMARKS.length - 1)],
    });
    
    grandTotal += amount;
  }
  
  console.log(`Generated ${transactions.length} transactions. Total: $${grandTotal.toFixed(2)}`);
  
  return transactions;
};
