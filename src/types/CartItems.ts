// @/types/index.ts
export interface Product {
    id: string;
    name: string;
    deskripsi: string;
    harga: string;
    kategoriId: string;
    kategori: {
      name: string;
    };
    image: string;
    createdAt: string;
    updatedAt: string; 
  }
  
  interface Category {
    id: string;
    name: string;
  }
  
  interface CartItem {
    product: Product;
    quantity: number;
  }
  