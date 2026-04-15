import { Check } from "lucide-react";

export default function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return Math.min(strength, 4);
  };

  const strength = getStrength();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "text-rose-600 dark:text-rose-400",
    "text-amber-600 dark:text-amber-400",
    "text-yellow-600 dark:text-yellow-400",
    "text-emerald-600 dark:text-emerald-400",
  ];
  const barColors = [
    "bg-slate-200 dark:bg-slate-800",
    "bg-rose-200 dark:bg-rose-900/30",
    "bg-amber-200 dark:bg-amber-900/30",
    "bg-yellow-200 dark:bg-yellow-900/30",
    "bg-emerald-200 dark:bg-emerald-900/30",
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Password Strength
        </label>
        {strength > 0 && (
          <span className={`text-xs font-semibold ${colors[strength]}`}>
            {labels[strength]}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= strength
                ? barColors[strength]
                : "bg-slate-200 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>
      {strength > 0 && (
        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
          {password.length >= 8 && (
            <li className="flex items-center gap-1">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              At least 8 characters
            </li>
          )}
          {/[A-Z]/.test(password) && /[a-z]/.test(password) && (
            <li className="flex items-center gap-1">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              Uppercase and lowercase letters
            </li>
          )}
          {/[0-9]/.test(password) && (
            <li className="flex items-center gap-1">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              Contains a number
            </li>
          )}
          {/[!@#$%^&*]/.test(password) && (
            <li className="flex items-center gap-1">
              <Check className="size-3 text-emerald-600 dark:text-emerald-400" />
              Contains a special character
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
