"use client";

import { Button, useMantineColorScheme } from "@mantine/core";
import Link from "next/link";
import React from "react";

export function LinkButton({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  const { colorScheme } = useMantineColorScheme();

  const buttonColor = colorScheme === "dark" ? "white" : "dark";

  return (
    <Button color={buttonColor} component={Link} href={href} leftSection={icon} variant="transparent">
      {text}
    </Button>
  );
}
