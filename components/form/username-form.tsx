'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { useTransitionRouter } from "next-view-transitions";
import {easeOut, motion} from 'motion/react'

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: easeOut,
    },
  },
};

export function UsernameForm () {
  const router = useTransitionRouter()
  const [userName, setUserName] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = userName.trim().toLowerCase();
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/username", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName.toLowerCase() }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : "Failed to update username";
        throw new Error(message);
      }
      console.log("Username updated successfully:", data.user);
      router.push("/dashboard");

      // // TODO: Implement signin logic with Auth.js
      // console.log("Sign in submitted:", userName);

      // // stimulate api call
      // await new Promise((resolve) => setTimeout(resolve, 5000))

      // router.push('/dashboard')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);

    if(e.target.value.length < 4) {
      return 
    }

    // console.log(e.target.value)
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (userName.trim() === '') {
      console.log("Username cannot be empty");
    }
    // console.log(e.target.value)
  }

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormField
        label="Username"
        id="username"
        type="text"
        placeholder="authstack_1"
        value={userName}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "Saving..." : "Continue"}
      </Button>
    </motion.form>
  );
}