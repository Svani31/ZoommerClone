export type ProductProps = {
  id: string;
};

export type ProductState = {
  cartItem:BanckEndItem[]
};

export type itemProps = {
  amount:string;
  images:string[],
  price:string;
  id:string;
  title:string;
  item:string
}

export type BanckEndItem = {
amount: string;
brand: string
categories:string;
description:string[]; 
id: string;
images:string;
price: string  | Number;
rating: string;
title:strin;
}