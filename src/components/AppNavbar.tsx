"use client";

import { Accordion, AppShell } from "@mantine/core";
import { Plus, Users } from "lucide-react";

import { LinkButton } from "@/components/LinkButton";

export function AppNavbar() {
  return (
    <AppShell.Navbar className="p-4">
      <AppShell.Section>
        <Accordion>
          <Accordion.Item key={"communities"} value="communities">
            <Accordion.Control icon={<Users />}>Communities</Accordion.Control>
            <Accordion.Panel>
              <LinkButton href="/community" icon={<Plus />} text="Create Community" />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
