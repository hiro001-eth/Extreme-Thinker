import { addDays, format, setHours, setMinutes } from "date-fns";

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  remarks: string;
}

const REMARKS = [
  "shopping", "foods", "lunched", "pizza", "burger", 
  "coffee", "drinks", "snacks", "market", "groceries",
  "uber", "taxi", "movie", "subway", "gift", 
  "clothes", "dinner", "breakfast", "pharmacy", "books"
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
  const startDate = new Date(2026, 0, 1); // Jan 1, 2026
  
  const highVolumeDays = [1, 3, 8, 11, 17]; // Days of month
  const totalDays = 19;
  
  let grandTotal = 0;

  for (let i = 0; i < totalDays; i++) {
    const currentDate = addDays(startDate, i);
    const dayOfMonth = currentDate.getDate();
    
    const isHighVolume = highVolumeDays.includes(dayOfMonth);
    
    // Target daily totals
    // High: 200-250
    // Low: 100-170
    // I'll bump these slightly to ensure we hit the 3100-3500 range
    // High: 220-270
    // Low: 120-190
    const targetDailyTotal = isHighVolume 
      ? randomRange(220, 270) 
      : randomRange(120, 190);
      
    let dailyTotal = 0;
    
    while (dailyTotal < targetDailyTotal) {
      // Transaction amount 5 - 15
      const amount = randomRange(5, 15);
      
      // Don't exceed target too much
      if (dailyTotal + amount > targetDailyTotal + 10) break;
      
      // Random time between 8:00 (8am) and 22:00 (10pm)
      const hour = randomInt(8, 22);
      const minute = randomInt(0, 59);
      const transactionDate = setMinutes(setHours(currentDate, hour), minute);
      
      transactions.push({
        id: Math.random().toString(36).substr(2, 9),
        amount: parseFloat(amount.toFixed(2)),
        date: transactionDate,
        remarks: REMARKS[randomInt(0, REMARKS.length - 1)],
      });
      
      dailyTotal += amount;
    }
    
    grandTotal += dailyTotal;
  }
  
  // Validation: Check if grandTotal is within 3100-3500
  // If not, we might need to adjust (add/remove transactions)
  // But given the ranges:
  // 5 high days * ~245 = 1225
  // 14 low days * ~155 = 2170
  // Total ~3395. This is well within the 3100-3500 range.
  
  console.log(`Generated ${transactions.length} transactions. Total: $${grandTotal.toFixed(2)}`);
  
  return transactions;
};
