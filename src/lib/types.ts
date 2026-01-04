export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  unitIds: string[];
};

export type GreonUnit = {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Maintenance' | 'Offline';
  installationDate: string;
  nextAlgaeReplacement: string;
  efficiency: number; // percentage
  uptime: number; // percentage
  ownerId: string;
};

export type SensorDataPoint = {
  timestamp: number;
  co2: number; // ppm
  o2: number; // %
};

export type DailyAbsorption = {
  date: string;
  absorbedGrams: number;
};

export type MaintenanceTicket = {
  id: string;
  unitId: string;
  userId: string;
  requestDate: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  description: string;
  technician?: string;
  resolutionDate?: string;
};

export type BillingHistory = {
  id: string;
  date: string;
  amount: number;
  status: 'Paid';
  invoiceUrl: string;
};
