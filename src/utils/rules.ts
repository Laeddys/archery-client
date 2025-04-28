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

  fileSize: (
    maxSizeInMB = 2,
    message = `File must be smaller than ${maxSizeInMB}MB`
  ) => ({
    validator: (_: any, value: any) => {
      if (!value || value.length === 0) {
        return Promise.resolve(); // Optional field
      }
      const file = value[0];
      const isLt = file.size / 1024 / 1024 < maxSizeInMB;
      return isLt ? Promise.resolve() : Promise.reject(new Error(message));
    },
  }),
};
