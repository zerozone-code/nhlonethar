export interface StorySummary {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  image: {
    url: string;
  };
  createdAt: string;
}

// Detail Page အတွက် — စာသားအပြည့်ပါတယ်
export interface Story {
  _id: string;
  title: string;
  category: string;
  text: string;
  image: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}
