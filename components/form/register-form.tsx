'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { useTransitionRouter } from "next-view-transitions";

export function RegisterForm () {
  // const router = useRouter()
  const router = useTransitionRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPass, setConfirmPass] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement signup logic with Auth.js and bcrypt
      console.log("Sign up submitted:", formData);

      // stimulate api call
      await new Promise((resolve) => setTimeout(resolve, 5000))

      router.push('/username')
    } catch (error) {
      return error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField 
        id="name"
        label="Name"
        placeholder="Omoshola E"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />

      <FormField 
        id="email"
        label="Email"
        type="email"
        placeholder="omoshola@gmail.com"
        value={formData.email}
        onChange={handleChange}
      />

      <FormField 
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="***********"
        hasPassword
        showPassword={showPassword}
        value={formData.password}
        onChange={handleChange}
        onClick={() => setShowPassword(!showPassword)}
      />

      <FormField 
        id="confirmPassword"
        label="Confirm Password"
        type={confirmPass ? 'text' : 'password'}
        placeholder="***********"
        hasPassword
        showPassword={confirmPass}
        value={formData.confirmPassword}
        onChange={handleChange}
        onClick={() => setConfirmPass(!confirmPass)}
      />

      <Button type="submit" className="w-full" size="lg">
        Create Account
      </Button>
    </form>
  )
}