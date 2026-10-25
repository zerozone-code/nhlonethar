export interface Admin {
  _id: string;
  email: string;
  role: "admin";
}

export interface DashboardStats {
  totalStories: number;
  categories: { category: string; count: number }[];
}
