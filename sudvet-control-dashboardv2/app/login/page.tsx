"use client";

import React, { Suspense } from "react";
import { Button, Input, Checkbox, Link, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import { AcmeIcon } from "./acme";

function LoginContent() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();
  const search = useSearchParams();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const redirect = search.get("redirect") || "/dashboard";
    router.push(redirect);
  };

  return (
    <div
      className="rounded-small bg-content1 flex min-h-192 w-full items-center justify-end overflow-hidden p-2 sm:p-4 lg:p-8"
      style={{
        backgroundImage:
          "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Brand Logo */}
      <div className="absolute top-10 left-10">
        <div className="flex items-center">
          <AcmeIcon className="text-white" size={40} />
          <p className="font-medium text-white">ACME</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-[434px] flex-col gap-4 px-8 pt-6 pb-10">
        <p className="pb-2 text-xl font-medium">Log In</p>
        {error && (
          <p className="text-small text-danger" role="alert">
            {error}
          </p>
        )}
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit" isLoading={loading}>
            Log In
          </Button>
        </Form>
        {/* Social providers removed */}
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
