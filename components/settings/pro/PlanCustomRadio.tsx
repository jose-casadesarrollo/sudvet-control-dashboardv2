"use client";

import { Card, CardBody, Chip, cn } from "@heroui/react";

type Props = {
  label: string;
  price: string;
  popular?: boolean;
  selected?: boolean;
} & React.ComponentProps<typeof Card>;

export default function PlanCustomRadio({ label, price, popular, selected, className, ...props }: Props) {
  return (
    <Card
      shadow="none"
      className={cn(
        "w-56 cursor-pointer border border-default-200 hover:border-primary",
        selected && "border-primary",
        className,
      )}
      {...props}
    >
      <CardBody className="gap-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{label}</p>
          {popular && (
            <Chip size="sm" color="primary" variant="flat">
              Popular
            </Chip>
          )}
        </div>
        <p className="text-default-500 text-small">{price}</p>
      </CardBody>
    </Card>
  );
}
