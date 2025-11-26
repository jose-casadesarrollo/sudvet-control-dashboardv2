"use client";

import * as React from "react";
import {Button, Input, Select, SelectItem, Spacer} from "@heroui/react";
import {Icon} from "@iconify/react";
import {cn} from "@heroui/react";
import PlanCustomRadio from "./pro/PlanCustomRadio";
import {getUserSettings, updateUserSettings} from "../../lib/settings";

interface BillingSettingCardProps {
  className?: string;
}

const addressOptions = [
  {
    label: "Buenos Aires",
    value: "buenos-aires",
    description: "Buenos Aires",
  },
];

const countryOptions = [
  {
    label: "Argentina",
    value: "ar",
    description: "Argentina",
  },
];

const BillingSetting = React.forwardRef<HTMLDivElement, BillingSettingCardProps>(
  ({className, ...props}, ref) => {
    const [plan, setPlan] = React.useState<"pro-monthly" | "pro-yearly">("pro-monthly");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      let mounted = true;
      getUserSettings().then((s) => {
        if (!mounted) return;
        if (s.billingPlan) setPlan(s.billingPlan as any);
      });
      return () => {
        mounted = false;
      };
    }, []);

    const onSave = async () => {
      setLoading(true);
      await updateUserSettings({ billingPlan: plan });
      setLoading(false);
    };

    return (
    <div ref={ref} className={cn("p-2", className)} {...props}>
      {/* Payment Method */}
      <div>
        <div className="rounded-large bg-default-100">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <div className="flex items-center gap-3">
              <Icon className="text-default-500 h-6 w-6" icon="solar:card-outline" />
              <div>
                <p className="text-default-600 text-sm font-medium">Payment method</p>
                <p className="text-default-400 text-xs">MasterCard credit card ending in ***3456</p>
              </div>
            </div>
            <Button
              className="bg-default-foreground text-background"
              radius="md"
              size="sm"
              variant="shadow"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
      <Spacer y={4} />
      {/* Current Plan */}
      <div>
        <p className="text-default-700 text-base font-medium">Current Plan</p>
        <p className="text-default-400 mt-1 text-sm font-normal">
          Your free trial ends in <span className="text-default-500">8 days.</span>
        </p>
        {/* Plan selector (Pro) */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div onClick={() => setPlan("pro-monthly")}
               className="[&>*]:w-full">
            <PlanCustomRadio
              label="Pro Monthly"
              price="$12 / per month"
              popular
              selected={plan === "pro-monthly"}
            />
          </div>
          <div onClick={() => setPlan("pro-yearly")} className="[&>*]:w-full">
            <PlanCustomRadio
              label="Pro Yearly"
              price="$72 / per year"
              selected={plan === "pro-yearly"}
            />
          </div>
        </div>
      </div>
      <Spacer y={4} />
      {/* Billing Address */}
      <div>
        {/*  Title */}
        <div>
          <p className="text-default-700 text-base font-medium">Billing Address</p>
          <p className="text-default-400 mt-1 text-sm font-normal">
            If you&apos;d like to add a postal address to every invoice, enter it here.
          </p>
        </div>
      </div>
      <div className="mt-2 space-y-2">
        <Input placeholder="Address Line 1" />
        <Input placeholder="Address Line 2" />
        <Input placeholder="City" />
        <div className="flex items-center gap-2">
          <Select defaultSelectedKeys={["buenos-aires"]}>
            {addressOptions.map((addressOption) => (
              <SelectItem key={addressOption.value}>{addressOption.label}</SelectItem>
            ))}
          </Select>
          <Input placeholder="Postal Code" />
        </div>
        <Select defaultSelectedKeys={["ar"]}>
          {countryOptions.map((countryOption) => (
            <SelectItem key={countryOption.value}>{countryOption.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Button className="bg-default-foreground text-background mt-5" size="sm" onPress={onSave} isDisabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </div>
    );
  },
);

BillingSetting.displayName = "BillingSetting";

export default BillingSetting;
