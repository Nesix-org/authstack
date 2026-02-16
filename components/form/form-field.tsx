import { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {motion} from 'motion/react'


type FormFieldProps = {
  label: string
  id: string
  placeholder: string
  type: string
  link?: boolean
  hasPassword?: boolean
  showPassword?: boolean
  onClick?: () => void
} & InputHTMLAttributes<HTMLInputElement>

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {opacity: 1, y: 0,},
}

export function FormField ({
  label,
  id,
  type,
  placeholder, 
  link,
  onClick,
  hasPassword,
  showPassword,
  ...props 
}:FormFieldProps) {
  return (
    <motion.div variants={container} className="space-y-2">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="font-space text-sm uppercase tracking-wider"
        >
          {label}
        </Label>
        {link && (
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Forgot password?
          </Link>
        )}
      </div>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          {...props}
          required
        />
        {hasPassword && (
          <button
            type="button"
            onClick={onClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}