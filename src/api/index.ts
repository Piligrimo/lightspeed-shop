import { Category, List, Product } from "./types";

const request = async (url: string, options = {}) => {
  const response = await fetch(
    "https://app.ecwid.com/api/v3/108362264/" + url,
    {
      headers: {
        "Content-Type": "application/json",
        Host: "app.ecwid.com",
        Authorization: "Bearer public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs",
      },
      ...options,
    }
  );
  return response.json();
};

export const getCategories = async (): Promise<List<Category>> => {
  return await request("categories");
};

export const getProducts = async (): Promise<List<Product>> => {
  return await request("products");
};
