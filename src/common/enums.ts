export const RESTAURANT_FIELDS = {
  name: "name",
  address: "address",
  description: "description",
  priceRange: "price_range",
  lat: "lat",
  long: "long",
  createdAt: "createdAt",
} as const;

export type RestaurantOrderBy =
  (typeof RESTAURANT_FIELDS)[keyof typeof RESTAURANT_FIELDS];

export const ORDER_FIELDS = {
  ASC: "ASC",
  DESC: "DESC",
} as const;

export type Order = (typeof ORDER_FIELDS)[keyof typeof ORDER_FIELDS];

export const ROLE_VALUES = {
  user: "user",
  admin: "admin",
  superadmin: "superadmin",
} as const;

export type Role = (typeof ROLE_VALUES)[keyof typeof ROLE_VALUES];
