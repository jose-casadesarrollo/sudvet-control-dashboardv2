"use client";

import React from "react";
import { Button, Input, Link, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [info, setInfo] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) return setError(error.message);

    if (data.session) {
      router.push("/dashboard");
    } else {
      setInfo("Check your email to confirm your account.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="rounded-large bg-content1 shadow-small w-full max-w-[434px] p-8">
        <p className="pb-2 text-xl font-medium">Sign Up</p>
        {error && <p className="text-small text-danger mb-2">{error}</p>}
        {info && <p className="text-small text-success mb-2">{info}</p>}
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={onSubmit}>
          <Input isRequired name="email" type="email" label="Email Address" variant="bordered" />
          <Input isRequired name="password" type="password" label="Password" variant="bordered" />
          <Button type="submit" color="primary" className="w-full" isLoading={loading}>
            Create Account
          </Button>
        </Form>
        <p className="text-small text-center mt-3">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
