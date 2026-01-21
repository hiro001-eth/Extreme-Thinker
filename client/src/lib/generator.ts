import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
}

const REMARKS = [
  "no cap shopping spree", "lowkey coffee run", "slayed at lunch", "burger was bussin", 
  "pizza is life fr", "iced latte vibes", "snack attack mood", "market haul", 
  "groceries for the week", "uber to the spot", "taxi chronicles", "movie night fr", 
  "subway commute", "gift for the bestie", "main character energy clothes", 
  "dinner with the gang", "breakfast of champions", "pharmacy run", "bookstore finds",
  "rent is due lol", "wifi bill pain", "target run gone wrong", "thrifted this fit",
  "ordered in again", "gym membership fee", "gas station snacks", "birthday gift",
  "new shoes who dis", "streaming sub renew", "gaming setup parts"
];

// Helper to get random number between min and max (inclusive)
const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const totalTransactions = 10; // We only need 10 for the batch
  
  let grandTotal = 0;

  for (let i = 0; i < totalTransactions; i++) {
    // Random day between Jan 1 and Jan 19
    const day = randomInt(1, 19);
    const currentDate = new Date(2026, 0, day);
    
    // Random time between 8:00 (8am) and 22:00 (10pm)
    const hour = randomInt(8, 22);
    const minute = randomInt(0, 59);
    const transactionDate = setMinutes(setHours(currentDate, hour), minute);
    
    // Transaction amount 5 - 15
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
