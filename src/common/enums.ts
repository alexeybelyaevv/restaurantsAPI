export const RESERVATION_FIELDS = {
  start: "start",
  end: "end",
  restaurantId: "restaurantId",
  mealtime: "mealtime",
  size: "size",
  details: "details",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
} as const;

export type ReservationOrderBy = keyof typeof RESERVATION_FIELDS;

export const RESTAURANT_FIELDS = {
  name: "name",
  address: "address",
  description: "description",
  lat: "lat",
  long: "long",
  createdAt: "createdAt",
} as const;

export type RestaurantOrderBy =
  (typeof RESTAURANT_FIELDS)[keyof typeof RESTAURANT_FIELDS];

export const ORDER_FIELDS = {
  asc: "asc",
  desc: "desc",
} as const;

export type Order = (typeof ORDER_FIELDS)[keyof typeof ORDER_FIELDS];

export const ROLE_VALUES = {
  user: "user",
  admin: "admin",
  superadmin: "superadmin",
} as const;

export type Role = (typeof ROLE_VALUES)[keyof typeof ROLE_VALUES];

export enum PriceRange {
  CHEAP = "CHEAP",
  MODERATE = "MODERATE",
  EXPENSIVE = "EXPENSIVE",
  LUXURY = "LUXURY",
}
