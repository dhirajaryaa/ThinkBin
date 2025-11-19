"use client";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function Password({ register, errors }: any) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative space-y-3 w-full items-center">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        {...register("password", { required: "Password is required" })}
        aria-invalid={errors.password ? "true" : "false"}
        placeholder="xyz@123"
      />

      <button
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-3 cursor-pointer"
        type="button"
      >
        {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
      </button>
      {errors.password && (
        <p className="text-destructive text-xs">{errors.password.message}</p>
      )}
    </div>
  );
}

export default Password;
