"use client";

import { Card, CardBody, Chip, cn } from "@heroui/react";

export default function PlanCustomRadio({ label, price, popular }: { label: string; price: string; popular?: boolean }) {
  return (
    <Card shadow="none" className={cn("w-56 cursor-pointer border border-default-200 hover:border-primary")}
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
