export interface TableRow {
  name: string;
  email: string;
  country: string;
  region: string;
  zip: string;
  isUser: 'Yes' | 'No'; // Assuming isUser can be 'Yes' or 'No'
}
