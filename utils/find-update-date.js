export const findUpdateDate = (json) => {
  const nodeCount = Object.keys(json).length - 1;
  const lastUpdateCheck = Object.keys(json)[nodeCount];
  const date = json[lastUpdateCheck].lastUpdate.substring(0, 10);

  return date;
};
