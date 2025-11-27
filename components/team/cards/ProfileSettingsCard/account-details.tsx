"use client";

import type {CardProps} from "@heroui/react";
import type {Users} from "../../data";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  Autocomplete,
  AutocompleteItem,
  Form,
} from "@heroui/react";
import {Icon} from "@iconify/react";

import countries from "./countries";

export default function Component(props: CardProps & {user: Users}) {
  const {user, ...cardProps} = props;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  };

  const email = user.memberInfo.email;
  const fullName = user.memberInfo.name;
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");
  const username = email?.split("@")[0] || fullName.toLowerCase().replace(/\s+/g, ".");
  const countryCode = countries.find((c) => c.name === user.country.name)?.code;

  return (
    <Card className="w-full p-2" {...cardProps}>
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <p className="text-large">Account Details</p>
        <div className="flex gap-4 py-4">
          <Badge
            showOutline
            classNames={{
              badge: "w-5 h-5",
            }}
            color="primary"
            content={
              <Button
                isIconOnly
                className="text-primary-foreground p-0"
                radius="full"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:pen-2-linear" />
              </Button>
            }
            placement="bottom-right"
            shape="circle"
          >
            <Avatar className="h-14 w-14" src={user.memberInfo.avatar} />
          </Badge>
          <div className="flex flex-col items-start justify-center">
            <p className="font-medium">{fullName}</p>
            <span className="text-small text-default-500">{user.role}</span>
          </div>
        </div>
        <p className="text-small text-default-400">
          The photo will be used for your profile, and will be visible to other users of the
          platform.
        </p>
      </CardHeader>
      <CardBody>
        <Form validationBehavior="native" onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {/* Username */}
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              placeholder="Enter username"
              defaultValue={username}
            />
            {/* Email */}
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              placeholder="Enter email"
              defaultValue={email}
              type="email"
            />
            {/* First Name */}
            <Input
              isRequired
              label="First Name"
              labelPlacement="outside"
              placeholder="Enter first name"
              defaultValue={firstName}
            />
            {/* Last Name */}
            <Input
              isRequired
              label="Last Name"
              labelPlacement="outside"
              placeholder="Enter last name"
              defaultValue={lastName}
            />
            {/* Phone Number */}
            <Input
              isRequired
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Enter phone number"
            />
            {/* Country */}
            <Autocomplete
              isRequired
              defaultItems={countries}
              label="Country"
              labelPlacement="outside"
              placeholder="Select country"
              showScrollIndicators={false}
              defaultSelectedKey={countryCode}
            >
              {(item) => (
                <AutocompleteItem
                  key={item.code}
                  startContent={
                    <Avatar
                      alt="Country Flag"
                      className="h-6 w-6"
                      src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                    />
                  }
                >
                  {item.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            {/* State */}
            <Input isRequired label="State" labelPlacement="outside" placeholder="Enter state" />
            {/* Address */}
            <Input
              isRequired
              label="Address"
              labelPlacement="outside"
              placeholder="Enter address"
            />
            {/* Zip Code */}
            <Input
              isRequired
              label="Zip Code"
              labelPlacement="outside"
              placeholder="Enter zip code"
            />
          </div>

          <div className="mt-6 flex w-full justify-end gap-2">
            <Button radius="full" variant="bordered">
              Cancel
            </Button>
            <Button color="primary" radius="full" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
