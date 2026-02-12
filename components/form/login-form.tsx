'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { useTransitionRouter } from "next-view-transitions";

export function LoginForm () {
  const router = useTransitionRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {      
      // TODO: Implement signin logic with Auth.js
      console.log("Sign in submitted:", formData);


      // stimulate api call
      await new Promise((resolve) => setTimeout(resolve, 5000))

      router.push('/dashboard')
      
    } catch (error) {
      console.log(error)
    }
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