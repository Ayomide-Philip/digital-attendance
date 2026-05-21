import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ProfileInformationCard() {
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

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // API call will be handled by user
    console.log("Form data to save:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

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
        {/* Display Name */}
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

        {/* Phone */}
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

        {/* Department and School */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-xs md:text-sm font-medium text-slate-900 dark:text-slate-100">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
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

        {/* Qualifications */}
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

        {/* Experience */}
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
