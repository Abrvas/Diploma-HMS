export interface MedicalItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  expiryDate?: string;
  supplier?: string;
  location?: string;
}

export interface InventoryTransaction {
  id: string;
  itemId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  performedBy: string;
  notes?: string;
}