export const topProducts = {
  from: 0,
  size: 1000,
  query: {
    match_all: {}
  }
};

export const filterByBrand = searchTxt => {
  return {
    query: {
      match: {
        brand: { query: searchTxt }
      }
    }
  };
};

export const filterByName = searchTxt => {
  return {
    query: {
      match: {
        name: { query: searchTxt }
      }
    }
  };
};

export const sortedByPrice = {
  from: 0,
  size: 1000,
  sort: [{ price: { order: "asc" } }],
  query: {
    match_all: {}
  }
};
