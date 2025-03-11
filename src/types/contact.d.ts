export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  projectDescription: string;
  status: "pending" | "responded" | "rejected";
}

export interface ContactPost {
  name?: string;
  phoneNumber?: string;
  projectDescription?: string;
  status?: "pending" | "responded" | "rejected";
}
