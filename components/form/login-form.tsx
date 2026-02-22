'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { useTransitionRouter } from "next-view-transitions";
import {easeOut, motion} from 'motion/react'
import { signIn } from "next-auth/react";

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
      // console.log("Sign in submitted:", formData);

      const {email, password} = formData

      if (!email && !password) {
        console.error('email and password id required')
        return
      }

      await signIn('credentials', {email, password, callbackUrl: '/explore', redirect: true})


      // stimulate api call
      // await new Promise((resolve) => setTimeout(resolve, 5000))

      // router.push('/dashboard')
      
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
    <motion.form variants={container} initial='hidden' animate='visible' onSubmit={handleSubmit} className="space-y-6">
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
    </motion.form>
  )
}