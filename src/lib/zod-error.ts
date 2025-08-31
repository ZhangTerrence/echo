export type FlattenedErrors = {
  fieldErrors: {
    [field: string]: string[];
  };
  formErrors: string[];
};
