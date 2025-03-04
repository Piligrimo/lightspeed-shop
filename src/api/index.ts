import { Category, List, Product } from "./types";
import store from "@/store";

const errorCodes: Record<number, string> = {
  404: "404 - Not Found",
  403: "Access Forbidden",
  500: "Server error occured, try again later",
};

const request = async (url: string, options = {}) => {
  try {
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

    if (!response.ok) {
      store.dispatch(
        "DISPLAY_ERROR",
        errorCodes[response.status] || "Something went wrong, try again later"
      );
      return;
    }

    return response.json();
  } catch (error) {
    store.dispatch("DISPLAY_ERROR", "Something went wrong, try again later");
  }
};

export const getCategories = async (): Promise<List<Category>> => {
  return await request("categories");
};

export const getCategoryById = async (id: string): Promise<Category> => {
  return await request("categories/" + id);
};

export const getProducts = async (
  categoryId: string
): Promise<List<Product>> => {
  return await request("products?category=" + categoryId);
};

export const getProductById = async (id: string): Promise<Product> => {
  return await request("products/" + id);
};

export const getSeveralProductsById = async (
  ids: string
): Promise<List<Product>> => {
  return await request("products?productId=" + ids);
};
