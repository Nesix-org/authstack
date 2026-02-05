'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";

export function LoginForm () {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signin logic with Auth.js
    console.log("Sign in submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField 
        label="email"
        id='email'
        type='email'
        placeholder="omoshola@gmail.com"
        value={formData.email}
        onChange={handleChange}
      />

      <div className="space-y-2">
        <FormField 
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="*************"
          link
          hasPassword
          value={formData.password}
          onChange={handleChange}
          showPassword={showPassword}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Sign In
      </Button>
    </form>
  )
}