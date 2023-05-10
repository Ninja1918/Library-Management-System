export function getBooksParams(params) {
  let toReturn = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined) toReturn[key] = value;
  });
  return toReturn;
}
