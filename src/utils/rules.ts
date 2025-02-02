export const rules = {
  required: (message: string = "Required field!") => ({
    required: true,
    message,
  }),

  min: (min = 8, message = "Password must be at least 8 characters") => ({
    min,
    message,
  }),

  max: (
    max = 32,
    message = "Password must not be longer than 32 characters"
  ) => ({
    max,
    message,
  }),
};
