import { baseUrl } from "../config";
import { retrieveToken } from "../config";

/* Authentication APIs */

export const registerUser = async (data) => {
  const url = baseUrl + "/api/auth/register";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const loginUser = async (data) => {
  const url = baseUrl + "/api/auth/login";

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

/* Listing APIs */

export const getHomepageProduct = async () => {
  const url = baseUrl + "/api/listings/homepage";

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

export const getExploreProducts = async () => {
  const url = baseUrl + "/api/listings/explore";

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

export const getCategoryProducts = async (data) => {
  const url = baseUrl + `/api/listings/category?category=${data.category}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

export const getProductsByUser = async (data) => {
  const url = baseUrl + `/api/listings/seller?user=${data.user}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
}

export const getSearchResults = async (data) => {
  const url = baseUrl + `/api/listings/search?query=${data.query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
}

/* Product APIs */

export const addProduct = async (data, files) => {
  const url = baseUrl + "/api/product";

  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: retrieveToken() },
    body: formData,
  });

  return await response.json();
};

export const viewProduct = async (q) => {
  const url = baseUrl + `/api/product/${q}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

export const addRating = async (data) => {
  const url = baseUrl + `/api/product/rating`;

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: retrieveToken(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getCategories = async (q) => {
  const url = baseUrl + `/api/product/categories`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

/* Bidding APIs */

export const addBid = async (data) => {
  const url = baseUrl + "/api/bidding";

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: retrieveToken(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const getUserBids = async (data) => {
  const url = baseUrl + "/api/bidding?" + new URLSearchParams({ owner: data.owner });

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
};

/* Seller APIs */

export const getSellerDetails = async (data) => {
  const url = baseUrl + `/api/seller?user=${data.user}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: retrieveToken() },
  });

  return await response.json();
}
