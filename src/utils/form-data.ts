export function constructFormData(data: object) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value.toString());
  }

  return formData;
}

export function constructObject(data: FormData) {
  return Object.fromEntries(data.entries());
}
