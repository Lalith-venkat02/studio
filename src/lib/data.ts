import { User, GreonUnit, MaintenanceTicket, SensorDataPoint, DailyAbsorption, BillingHistory } from '@/lib/types';
import { addDays, format, subDays } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    createdAt: '2023-01-15',
    unitIds: ['unit-101', 'unit-102'],
  },
  {
    id: 'user-002',
    name: 'Bob Williams',
    email: 'bob@example.com',
    createdAt: '2023-03-20',
    unitIds: ['unit-103'],
  },
];

export const mockGreonUnits: GreonUnit[] = [
  {
    id: 'unit-101',
    name: 'Living Room Purifier',
    location: '123 Green St, Apt 4B, Meadowville',
    status: 'Active',
    installationDate: '2023-05-10',
    nextAlgaeReplacement: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
    efficiency: 98.5,
    uptime: 99.9,
    ownerId: 'user-001',
  },
  {
    id: 'unit-102',
    name: 'Bedroom Purifier',
    location: '123 Green St, Apt 4B, Meadowville',
    status: 'Maintenance',
    installationDate: '2023-05-10',
    nextAlgaeReplacement: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
    efficiency: 75.2,
    uptime: 99.9,
    ownerId: 'user-001',
  },
  {
    id: 'unit-103',
    name: 'Office Unit',
    location: '456 Oak Ave, Suite 200, Forest City',
    status: 'Active',
    installationDate: '2023-06-01',
    nextAlgaeReplacement: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
    efficiency: 99.1,
    uptime: 99.8,
    ownerId: 'user-002',
  },
  {
    id: 'unit-104',
    name: 'Lobby Purifier',
    location: '789 Pine Ln, Tech Park, Silicon Valley',
    status: 'Offline',
    installationDate: '2022-11-20',
    nextAlgaeReplacement: format(addDays(new Date(), -20), 'yyyy-MM-dd'),
    efficiency: 0,
    uptime: 92.3,
    ownerId: 'user-003', // No user for this one in mockUsers, for testing
  },
];

export const generateSensorData = (days: number): SensorDataPoint[] => {
  const data: SensorDataPoint[] = [];
  let currentDate = new Date();
  for (let i = 0; i < days * 24; i++) { // Generate hourly data for `days` days
    const timestamp = subDays(currentDate, Math.floor(i / 24)).getTime() - (i % 24) * 3600 * 1000;
    const co2 = 400 + Math.random() * 150 - (i % 24) * 5; // Simulate daily fluctuation
    const o2 = 20.9 + Math.random() * 0.2 - (co2 - 400) / 1000;
    data.push({ timestamp, co2: parseFloat(co2.toFixed(2)), o2: parseFloat(o2.toFixed(2)) });
  }
  return data.reverse();
};

export const generateDailyAbsorption = (days: number): DailyAbsorption[] => {
    const data: DailyAbsorption[] = [];
    for (let i = 0; i < days; i++) {
        const date = format(subDays(new Date(), i), 'MMM dd');
        const absorbedGrams = 15 + Math.random() * 10;
        data.push({ date, absorbedGrams: parseFloat(absorbedGrams.toFixed(2))});
    }
    return data.reverse();
};

export const getTotalCO2Absorbed = (installationDate: string): number => {
    const daysSinceInstallation = (new Date().getTime() - new Date(installationDate).getTime()) / (1000 * 3600 * 24);
    // Average 20g per day
    return parseFloat((daysSinceInstallation * 20).toFixed(2));
}

export const mockMaintenanceTickets: MaintenanceTicket[] = [
    {
        id: 'ticket-201',
        unitId: 'unit-102',
        userId: 'user-001',
        requestDate: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
        status: 'In Progress',
        description: 'Unit is making a gurgling sound and efficiency has dropped.',
        technician: 'John Doe',
    },
    {
        id: 'ticket-202',
        unitId: 'unit-101',
        userId: 'user-001',
        requestDate: format(subDays(new Date(), 35), 'yyyy-MM-dd'),
        status: 'Resolved',
        description: 'Green light is flickering.',
        technician: 'Jane Smith',
        resolutionDate: format(subDays(new Date(), 33), 'yyyy-MM-dd'),
    },
];

export const mockBillingHistory: BillingHistory[] = [
    { id: 'inv-003', date: format(subDays(new Date(), 30), 'yyyy-MM-dd'), amount: 49.99, status: 'Paid', invoiceUrl: '#' },
    { id: 'inv-002', date: format(subDays(new Date(), 60), 'yyyy-MM-dd'), amount: 49.99, status: 'Paid', invoiceUrl: '#' },
    { id: 'inv-001', date: format(subDays(new Date(), 90), 'yyyy-MM-dd'), amount: 49.99, status: 'Paid', invoiceUrl: '#' },
];
