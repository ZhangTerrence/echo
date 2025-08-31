import { notifications } from "@mantine/notifications";
import { AuthError } from "@supabase/auth-js";

import { FlattenedErrors } from "@/lib/zod-error";

export function showAuthErrorMessage(authError: AuthError) {
  notifications.show({
    color: "red",
    message: authError.message,
    title: "Authentication Error",
  });
}

export function showInvalidSchemaErrors(schemaErrors: FlattenedErrors) {
  for (const formError of schemaErrors.formErrors) {
    notifications.show({
      color: "red",
      message: formError,
      title: "Form Error",
    });
  }

  for (const [field, fieldErrors] of Object.entries(schemaErrors.fieldErrors)) {
    for (const fieldError of fieldErrors) {
      notifications.show({
        color: "red",
        message: fieldError,
        title: `Field Error (${field})`,
      });
    }
  }
}
