export interface Expense {
    id: string;
    description: string;
    amount: number;
    categoryId: string;
    date: Date;
    householdId: string;
}