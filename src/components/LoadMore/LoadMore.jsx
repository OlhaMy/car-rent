const LoadMore = ({ handleLoadMore, isVisible }) => {
  if (!isVisible) return null;
  return <button onClick={handleLoadMore}>Load more</button>;
};

export default LoadMore;
