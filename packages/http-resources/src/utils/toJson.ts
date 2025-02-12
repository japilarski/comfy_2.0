export const toJson = (object: unknown) => JSON.stringify(
  object,
  (k: string, v: unknown) => (v === 'undefined' ? null : v),
);
