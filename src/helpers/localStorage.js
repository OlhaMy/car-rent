export const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const loadFavoritesFromLocalStorage = () => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
  return savedFavorites ? savedFavorites : [];
};
