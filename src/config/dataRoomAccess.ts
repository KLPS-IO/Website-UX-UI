export const DATA_ROOM_FOUNDER_EMAIL = "emmamendez07@gmail.com";

export const DATA_ROOM_INVITE_CODE = "KLPS-ACCESS-2026";

export const DATA_ROOM_AUTHORIZED_EMAILS = [
  DATA_ROOM_FOUNDER_EMAIL,
];

export const normalizeAccessEmail = (email: string) => email.trim().toLowerCase();

export const isFounderEmail = (email: string) =>
  normalizeAccessEmail(email) === DATA_ROOM_FOUNDER_EMAIL;
