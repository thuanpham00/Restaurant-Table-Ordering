"use client";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

export default function InputPassword({
  field,
  label
}: {
  field: ControllerRenderProps<{
    oldPassword: string;
    password: string;
    confirmPassword: string;
  }>;
  label: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid gap-3">
      <Label htmlFor="oldPassword">{label}</Label>
      <div className="relative">
        <Input id="oldPassword" type={showPassword ? "text" : "password"} className="w-full" {...field} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <FormMessage />
    </div>
  );
}
