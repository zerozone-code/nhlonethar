export const formatDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("my-MM", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
