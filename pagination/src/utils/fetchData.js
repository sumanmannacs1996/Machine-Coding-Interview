export const fetchData = async (url) => {
  const jsonData = await fetch(url);
  const response = await jsonData.json();
  return response;
};
