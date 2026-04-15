import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  error,
  showToggle = true,
  showPassword,
  onToggleShow,
  placeholder = "Enter your password",
  ...rest
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={label}
        className="text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`rounded-xl pr-10 ${error ? "border-rose-500 dark:border-rose-500" : ""}`}
          {...rest}
        />
        {showToggle && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={onToggleShow}
          >
            {showPassword ? (
              <EyeOff className="size-4 text-slate-500" />
            ) : (
              <Eye className="size-4 text-slate-500" />
            )}
          </Button>
        )}
      </div>
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
}
