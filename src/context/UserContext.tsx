import React, { createContext, useEffect, useState } from "react";
import { BrandType, DataType, ProductType } from "@/types/types";

interface UserContextType {
  data: DataType[];
  products: ProductType[];
  brands: BrandType[];
  addToCard: (prod: ProductType) => void;
  useSortProductsByNewestDate: (products: ProductType[]) => void;
  useSortProductsByOldestDate: (products: ProductType[]) => void;
}

export const UserContext = createContext<UserContextType>({
  data: [],
  products: [],
  brands: [],
  addToCard: () => {},
  useSortProductsByNewestDate: () => {},
  useSortProductsByOldestDate: () => {},
});

interface Props {
  children: React.ReactNode;
}

const UserContextConstructor: React.FC<Props> = ({ children }) => {
  
    const [data, setData] = useState<DataType[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [addedToCard, setAddedToCard] = useState<ProductType>();
    const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
      fetch("http://localhost:5001/")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }, []);

    useEffect(() => {
      fetch("http://localhost:5001/products")
        .then((res) => res.json())
        .then((products) => {
          setProducts(products);
        });
    }, []);

    useEffect(() => {
      fetch("http://localhost:5001/brands")
        .then((res) => res.json())
        .then((brands) => {
          setBrands(brands);
        });
    }, []);

    const addToCard = (prod: ProductType) => {
      const updatedProducts = products.map((p) => {
        if (p.id === prod.id) {
          return {
            ...p,
            selected: !p.selected,
            amount: p.selected ? 0 : 1,
          };
        }
        return p;
      });
      setProducts(updatedProducts);
      setAddedToCard(prod);
    };

    const useSortProductsByNewestDate = (products: ProductType[]) => {
      const sortProducts = (products: ProductType[]) => {
        return products.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      };
      const sortedProducts = sortProducts(products);
      setSortedProducts(sortedProducts);
      setIsSorted(true);
      return sortedProducts;
    };

    const useSortProductsByOldestDate = (products: ProductType[]) => {
      const sortProducts = (products: ProductType[]) => {
        return products.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
      };
      const sortedProducts = sortProducts(products);
      setSortedProducts(sortedProducts);
      setIsSorted(true);
      return sortedProducts;
    };

  return (
      <UserContext.Provider value={{ 
          data,
          products,
          brands,
          addToCard,
          useSortProductsByNewestDate,
          useSortProductsByOldestDate,
        }}>
        {children}
      </UserContext.Provider>
  );
};

export default UserContextConstructor;