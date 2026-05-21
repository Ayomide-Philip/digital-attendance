import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfileInformationCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    department: "",
    school: "",
    phone: "",
    qualifications: "",
    experience: "",
    specialization: "",
  });

  useEffect(() => {
    async function fetchUserProfile() {
      setIsLoading(true);
      try {
        const request = await fetch(`/api/teacher/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request?.ok || response?.error) {
          return toast.error(response?.error || "Unable to fetch teacher data");
        }
        const user = response.user;
        setFormData({
          displayName: user?.displayName || "",
          phone: user?.phone || "",
          department: user?.department || "",
          school: user?.school || "",
          qualifications: user?.qualifications || "",
          experience: user?.experience || "",
          specialization: user?.specialization || "",
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
    const {
      displayName,
      phone,
      department,
      school,
      qualifications,
      experience,
      specialization,
    } = formData;
    if (
      !displayName.trim() &&
      !phone.trim() &&
      !department.trim() &&
      !school.trim() &&
      !qualifications.trim() &&
      !experience.trim() &&
      !specialization.trim()
    ) {
      setIsSaving(false);
      return toast.error(
        "Please fill in at least one field to update your profile.",
      );
    }

    if (
      displayName?.trim() &&
      (displayName.trim().length < 5 || displayName.trim().length > 50)
    ) {
      setIsSaving(false);
      return toast.error(
        "Display name must be between 5 and 50 characters long.",
      );
    }
    if (
      phone?.trim() &&
      (!/^\+?[1-9]\d{1,14}$/.test(phone.trim()) ||
        phone.trim().length < 7 ||
        phone.trim().length > 15)
    ) {
      setIsSaving(false);
      return toast.error(
        "Please enter a valid phone number or international format or is not between 7 and 15 characters long.",
      );
    }

    if (
      department?.trim() &&
      (department.trim().length < 3 || department.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error(
        "Department must be between 3 and 100 characters long.",
      );
    }

    if (
      school?.trim() &&
      (school.trim().length < 3 || school.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error("School must be between 3 and 100 characters long.");
    }

    if (
      qualifications?.trim() &&
      (qualifications.trim().length < 3 || qualifications.trim().length > 200)
    ) {
      setIsSaving(false);
      return toast.error(
        "Qualifications must be between 3 and 200 characters long.",
      );
    }

    if (
      experience?.trim() &&
      (experience.trim().length < 3 || experience.trim().length > 200)
    ) {
      setIsSaving(false);
      return toast.error(
        "Experience must be between 3 and 200 characters long.",
      );
    }

    if (
      specialization?.trim() &&
      (specialization.trim().length < 3 || specialization.trim().length > 100)
    ) {
      setIsSaving(false);
      return toast.error(
        "Specialization must be between 3 and 100 characters long.",
      );
    }

    try {
      const request = await fetch(`/api/teacher/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          displayName: displayName.trim(),
          phone: phone.trim(),
          department: department.trim(),
          school: school.trim(),
          qualifications: qualifications.trim(),
          experience: experience.trim(),
          specialization: specialization.trim(),
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
            Update your personal and professional details
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
          Update your personal and professional details
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
            value={formData.displayName}
            onChange={handleInputChange}
            placeholder="Enter display name"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
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
              School
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              placeholder="Enter school"
              className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Qualifications
          </label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            placeholder="Enter qualifications"
            rows="3"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Experience
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Enter experience"
            rows="3"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900 resize-none"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
            Specialization
          </label>
          <textarea
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            placeholder="Enter specialization"
            rows="3"
            className="mt-1.5 md:mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-3 md:px-4 py-2 text-xs md:text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900 resize-none"
          />
        </div>

        <div className="pt-2 md:pt-4">
          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 md:px-6 py-2 text-xs md:text-sm text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-sky-700 dark:hover:bg-sky-600"
          >
            {isSaving ? (
              <>
                <Loader2 className="size-3 md:size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-3 md:size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
