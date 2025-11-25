"use client";

import { Card, CardBody, RadioProps, cn } from "@heroui/react";

export default function ThemeCustomRadio({ selected, children, ...props }: RadioProps & { selected?: boolean }) {
  return (
    <Card
      shadow="none"
      className={cn(
        "w-40 h-28 cursor-pointer border border-default-200 data-[selected=true]:border-primary",
        selected && "border-primary",
      )}
      {...props as any}
    >
      <CardBody className="items-center justify-center text-small text-default-600">
        {children}
      </CardBody>
    </Card>
  );
}
