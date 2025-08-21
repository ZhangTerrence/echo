import { notifications } from "@mantine/notifications";

export function showErrorNotifications(
  errorTitle: string,
  response: {
    errors: string[];
    properties?: { [key in string]?: { errors: string[] } };
  },
) {
  const errors = response.errors;

  if (response.properties) {
    for (const property in response.properties) {
      errors.push(...(response.properties[property]?.errors ?? []));
    }
  }

  for (const error of errors) {
    notifications.show({
      color: "red",
      message: error,
      title: errorTitle,
    });
  }
}
