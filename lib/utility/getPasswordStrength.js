export default function getPasswordStrength(value) {
  if (!value) return 0;

  let strength = 0;
  if (value.length >= 8) strength += 1;
  if (value.length >= 12) strength += 1;
  if (/[a-z]/.test(value)) strength += 1;
  if (/[A-Z]/.test(value)) strength += 1;
  if (/[0-9]/.test(value)) strength += 1;
  if (/[!@#$%^&*]/.test(value)) strength += 1;

  return Math.min(strength, 4);
}
