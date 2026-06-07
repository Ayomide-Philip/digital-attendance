import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StudentProfileInformationCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    department: "",
    level: "",
    school: "",
    matricNo: "",
  });

  useEffect(() => {
    async function fetchUserProfile() {
      setIsLoading(true);
      try {
        const request = await fetch(`/api/student/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request?.ok || response?.error) {
          return toast.error(response?.error || "Unable to fetch student data");
        }
        const user = response.user;
        setFormData({
          displayName: user?.displayName || "",
          email: user?.email || "",
          department: user?.department || "",
          level: user?.level || "",
          school: user?.school || "",
          matricNo: user?.matricNo || "",
        });
      } catch (err) {
        return toast.error("Unable to fetch user data. Try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserProfile();
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSaveProfile() {
    setIsSaving(true);
    const { displayName, department, level, school, matricNo } = formData;

    if (
      !displayName.trim() &&
      !department.trim() &&
      !level.trim() &&
      !school.trim()
    ) {
      setIsSaving(false);
      return toast.error(
        "Please fill in at least one field to update your profile.",
      );
    }

    if (
      displayName?.trim() &&
      (displayName.trim().length < 2 || displayName.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error(
        "Display name must be between 2 and 100 characters long.",
      );
    }

    if (
      department?.trim() &&
      (department.trim().length < 5 || department.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error(
        "Department must be between 5 and 100 characters long.",
      );
    }

    if (
      level?.trim() &&
      !["100", "200", "300", "400", "500"].includes(level.trim())
    ) {
      setIsSaving(false);
      return toast.error("Level must be one of: 100, 200, 300, 400, or 500.");
    }

    if (
      school?.trim() &&
      (school.trim().length < 5 || school.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error("School must be between 5 and 100 characters long.");
    }

    try {
      const request = await fetch(`/api/student/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          displayName: displayName.trim() || undefined,
          department: department.trim() || undefined,
          level: level.trim() || undefined,
          school: school.trim() || undefined,
          matricNo: matricNo?.trim() || undefined,
        }),
      });
      const response = await request.json();
      if (!request?.ok || response?.error) {
        return toast.error(response?.error || "Unable to update profile");
      }
      toast.success(response?.message || "Profile updated successfully");
      window.location.reload();
    } catch (err) {
      return toast.error("Unable to update profile. Try again later.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
            Profile Information
          </h2>
          <p className="mt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Update your personal and academic details
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
              <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
          <div className="pt-2 md:pt-4">
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100">
          Profile Information
        </h2>
        <p className="mt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400">
          Update your personal and academic details
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Display Name
          </label>
          <input
            type="text"
            name="displayName"
            value={formData?.displayName}
            onChange={handleInputChange}
            placeholder="Enter display name"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData?.email}
            disabled
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-100/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Email cannot be changed
          </p>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Matric Number
          </label>
          <input
            type="text"
            name="matricNo"
            value={formData?.matricNo}
            onChange={handleInputChange}
            placeholder={
              formData?.matricNo?.trim() ? "" : "Enter matric number"
            }
            className={`mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 px-3 md:px-4 py-2 font-mono text-xs md:text-sm transition-colors focus:outline-none ${
              formData?.matricNo?.trim()
                ? "bg-slate-100/50 text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                : "bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            }`}
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formData?.matricNo?.trim()
              ? "Matric number cannot be changed"
              : "Once set, matric number cannot be changed"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData?.department}
              onChange={handleInputChange}
              placeholder="Enter department"
              className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
              Academic Level
            </label>
            <select
              name="level"
              value={formData?.level}
              onChange={handleInputChange}
              className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:focus:bg-slate-900"
            >
              <option value="">Select academic level</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            School
          </label>
          <input
            type="text"
            name="school"
            value={formData?.school}
            onChange={handleInputChange}
            placeholder={
              formData?.school?.trim() ? "" : "Enter school or faculty name"
            }
            className={`mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 px-3 md:px-4 py-2 text-xs md:text-sm transition-colors focus:outline-none ${
              formData?.school?.trim()
                ? "bg-slate-100/50 text-slate-500 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                : "bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            }`}
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {formData?.school?.trim()
              ? "School cannot be changed"
              : "Once set, school cannot be changed"}
          </p>
        </div>

        <div className="pt-2 md:pt-4">
          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
