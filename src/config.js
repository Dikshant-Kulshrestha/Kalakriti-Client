export const baseUrl = "https://kalakriti-server.herokuapp.com";
// export const baseUrl = "http://localhost:3001";

export const retrieveToken = () => {
  const storedUser = window.localStorage.getItem("user");
  const jwt = storedUser ? JSON.parse(storedUser) : null;

  if (jwt) return `Bearer ${jwt.token}`;
  else return null;
};
