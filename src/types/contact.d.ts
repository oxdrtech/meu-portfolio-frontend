export interface Contact {
  name: string;
  phoneNumber: string;
  projectDescription: string;
  status?: "pending" | "responded" | "rejected";
}
