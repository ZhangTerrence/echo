export const constructFormData = (data: object) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value.toString());
  }

  return formData;
};

export const constructObject = (data: FormData) => {
  return Object.fromEntries(data.entries());
};
