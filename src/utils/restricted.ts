export const getRestrictedSubcategories = (): string[] => {
  return process.env.NEXT_PUBLIC_RESTRICTED_SUBCATEGORIES?.split(",") || [];
};

export const isRestrictedSubcategory = (subcategory: string): boolean => {
  const restricted = getRestrictedSubcategories();
  return restricted.includes(subcategory);
};
