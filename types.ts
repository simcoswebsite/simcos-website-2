import { ItemVariationLocationOverrides } from "square";

export interface Product {
  id: string;
  category?: string;
  name: string;
  isDeleted?: boolean;
  itemData?: Object
  price: string;
  modifiers?: Array<Object>;
  sizeOptions?: Array<Object>
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};