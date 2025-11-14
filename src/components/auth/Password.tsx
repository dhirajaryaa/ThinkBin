"use client";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

function Password() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex relative w-full items-center">
      <Input id="password" type={showPassword ? "text" : "password"} required />
      <button
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 cursor-pointer"
        type="button"
      >
        {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export default Password;
