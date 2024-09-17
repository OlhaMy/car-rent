const LoadMore = ({ handleLoadMore, isVisible }) => {
  return isVisible && <button onClick={handleLoadMore}>Load more</button>;
};

export default LoadMore;
