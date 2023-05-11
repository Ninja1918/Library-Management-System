export const BOOK_ITEM_DIMENTIONS = {
  height: '400px',
  width: '300px',
};

export const BOOK_GRID_OPTIONS = {
  templateColumns: [
    'repeat(1, 1fr)',
    'repeat(1, 1fr)',
    'repeat(2, 1fr)',
    'repeat(3, 1fr)',
    'repeat(3, 1fr)',
    'repeat(4, 1fr)',
  ],
  gap: 6,
};

export function getBooksParams(params) {
  let toReturn = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) toReturn[key] = value;
  });
  return toReturn;
}
