const LoadMore = ({ handleLoadMore, isVisible }) => {
  console.log("Is button visible:", isVisible); // Додайте лог для перевірки
  return (
    isVisible && (
      <button onClick={handleLoadMore} style={{ marginTop: "20px" }}>
        Load more
      </button>
    )
  );
};

export default LoadMore;
