'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { useRouter } from "next/navigation";

export function UsernameForm () {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      // TODO: Implement signin logic with Auth.js
      console.log("Sign in submitted:", userName);
  
      // stimulate api call
      await new Promise((resolve) => setTimeout(resolve, 5000))

      router.push('/dashboard')
      
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);

    if(e.target.value.length < 4) {
      return null
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField 
        label="Username"
        id='username'
        type='text'
        placeholder="authstack_1"
        value={userName}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Button type="submit" className="w-full" size="lg">
        Continue
      </Button>
    </form>
  )
}