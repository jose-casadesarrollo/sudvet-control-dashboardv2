"use client";

import * as React from "react";
import { Card, CardBody, cn } from "@heroui/react";

type Props = {
  selected?: boolean;
  children?: React.ReactNode;
} & Omit<React.ComponentProps<typeof Card>, "children">;

export default function ThemeCustomRadio({ selected, children, ...props }: Props) {
  return (
    <Card
      shadow="none"
      className={cn(
        "w-40 h-28 cursor-pointer border border-default-200 data-[selected=true]:border-primary",
        selected && "border-primary",
      )}
      {...props}
    >
      <CardBody className="items-center justify-center text-small text-default-600">
        {children}
      </CardBody>
    </Card>
  );
}
