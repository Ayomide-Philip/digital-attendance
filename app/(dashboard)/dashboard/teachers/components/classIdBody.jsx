"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  PencilLine,
  Plus,
  RotateCcw,
  Save,
  School,
  ShieldAlert,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import AttendanceTable from "@/app/(dashboard)/dashboard/teachers/components/AttendanceTable";
import StudentList from "@/app/(dashboard)/dashboard/teachers/components/StudentList";
import TakeAttendanceModal from "@/app/(dashboard)/dashboard/teachers/components/TakeAttendanceModal";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Tabs from "./tabs";

const tabs = ["Overview", "Students", "Attendance", "Settings"];

const staticClass = {
  id: "class-101",
  name: "Web Engineering 301",
  school: "Obafemi Awolowo University",
  studentsCount: 5,
  attendanceRate: 92,
};

const staticStudents = [
  {
    id: "std-001",
    name: "Amina Yusuf",
    matricId: "DA/23/001",
    email: "amina.yusuf@oauife.edu.ng",
    department: "CSC",
    classIds: ["class-101"],
    overallAttendance: 96,
  },
  {
    id: "std-002",
    name: "David Okonkwo",
    matricId: "DA/23/014",
    email: "david.okonkwo@oauife.edu.ng",
    department: "MTH",
    classIds: ["class-101"],
    overallAttendance: 88,
  },
  {
    id: "std-003",
    name: "Grace Eze",
    matricId: "DA/23/027",
    email: "grace.eze@oauife.edu.ng",
    department: "EEE",
    classIds: ["class-101"],
    overallAttendance: 81,
  },
  {
    id: "std-004",
    name: "Ibrahim Bello",
    matricId: "DA/23/045",
    email: "ibrahim.bello@oauife.edu.ng",
    department: "CSC",
    classIds: ["class-101"],
    overallAttendance: 74,
  },
  {
    id: "std-005",
    name: "Nora Adesina",
    matricId: "DA/23/052",
    email: "nora.adesina@oauife.edu.ng",
    department: "PHY",
    classIds: ["class-101"],
    overallAttendance: 91,
  },
];

const staticAttendanceHistory = [
  {
    id: "att-001",
    date: "2026-04-15",
    title: "Week 10 Lecture",
    present: 29,
    absent: 3,
    status: "Completed",
  },
  {
    id: "att-002",
    date: "2026-04-10",
    title: "Week 9 Practical",
    present: 27,
    absent: 4,
    status: "Completed",
  },
  {
    id: "att-003",
    date: "2026-04-04",
    title: "Week 8 Lecture",
    present: 30,
    absent: 2,
    status: "Completed",
  },
];

const staticSettings = {
  rules: {
    emailSuffix: "",
    departmentCode: [],
    _id: "69e4b5ecebcf1bfe5ae8ef08",
  },
  school: "obafemi awolowo university",
  createdAt: "2026-04-19T11:01:00.618Z",
  updatedAt: "2026-04-21T07:44:14.156Z",
};

const previewCandidates = [
  {
    name: "Amina Yusuf",
    email: "amina.yusuf@oauife.edu.ng",
    department: "CSC",
  },
  {
    name: "David Okonkwo",
    email: "david.okonkwo@oauife.edu.ng",
    department: "MTH",
  },
  {
    name: "Nora Adesina",
    email: "nora.adesina@oauife.edu.ng",
    department: "EEE",
  },
  {
    name: "Faith Oladipo",
    email: "faith.oladipo@example.com",
    department: "ENG",
  },
];

const defaultTemplateRules = {
  emailSuffix: "@oauife.edu.ng",
  departmentCodes: ["CSC", "MTH", "EEE"],
};

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
  hour12: false,
});

function formatDateTime(value) {
  return `${dateTimeFormatter.format(new Date(value))} UTC`;
}

function normalizeDepartmentCode(value) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function isValidEmailSuffix(value) {
  return /^@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(value.trim());
}

function dedupeCodes(codes) {
  return Array.from(
    new Set(codes.map((code) => normalizeDepartmentCode(code)).filter(Boolean)),
  );
}

function SettingsCard({ title, description, children, className = "" }) {
  return (
    <Card
      className={`rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800 ${className}`}
    >
      <div className="flex flex-col gap-1 border-b border-slate-200/70 pb-4 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="pt-4">{children}</div>
    </Card>
  );
}

export default function ClassIdBody({ students, classId = staticClass.id }) {
  const initialStudents = students?.length ? students : staticStudents;

  const [activeTab, setActiveTab] = useState("Overview");
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [classStudents, setClassStudents] = useState(initialStudents);
  const [rules, setRules] = useState(() => ({
    emailSuffix: staticSettings.rules.emailSuffix,
    departmentCodes: staticSettings.rules.departmentCode,
  }));
  const [departmentInput, setDepartmentInput] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    emailSuffix: "",
    departmentCode: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(staticSettings.updatedAt);

  const classItem = {
    ...staticClass,
    id: classId,
    studentsCount: classStudents.length,
  };

  const historyRows = useMemo(() => staticAttendanceHistory, []);

  const previewMatches = useMemo(() => {
    const suffix = rules.emailSuffix.trim().toLowerCase();
    const allowedDepartments = rules.departmentCodes;

    return previewCandidates.filter((candidate) => {
      const suffixOk =
        !suffix || candidate.email.toLowerCase().endsWith(suffix);
      const departmentOk =
        !allowedDepartments.length ||
        allowedDepartments.includes(candidate.department);

      return suffixOk && departmentOk;
    });
  }, [rules.emailSuffix, rules.departmentCodes]);

  const clearError = (name) => {
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleRemoveStudent = (studentId) => {
    setClassStudents((current) =>
      current.filter((student) => (student.id || student._id) !== studentId),
    );
  };

  const handleAddDepartmentCode = () => {
    const nextCode = normalizeDepartmentCode(departmentInput);

    if (!nextCode) {
      setFieldErrors((current) => ({
        ...current,
        departmentCode: "Enter a department code before adding it.",
      }));
      return;
    }

    if (!/^[A-Z0-9]{2,10}$/.test(nextCode)) {
      setFieldErrors((current) => ({
        ...current,
        departmentCode: "Use 2-10 letters or numbers for a valid code.",
      }));
      return;
    }

    if (rules.departmentCodes.includes(nextCode)) {
      setFieldErrors((current) => ({
        ...current,
        departmentCode: "This department code already exists.",
      }));
      return;
    }

    setRules((current) => ({
      ...current,
      departmentCodes: [...current.departmentCodes, nextCode],
    }));
    setDepartmentInput("");
    clearError("departmentCode");
  };

  const handleDepartmentKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddDepartmentCode();
    }
  };

  const handleSaveRules = (event) => {
    event.preventDefault();

    const nextEmailSuffix = rules.emailSuffix.trim();
    const nextDepartmentCodes = dedupeCodes(rules.departmentCodes);

    if (!nextEmailSuffix) {
      setFieldErrors((current) => ({
        ...current,
        emailSuffix: "Allowed email domain is required.",
      }));
      toast.error("Enter an allowed email domain before saving.");
      return;
    }

    if (!isValidEmailSuffix(nextEmailSuffix)) {
      setFieldErrors((current) => ({
        ...current,
        emailSuffix: "Use a valid suffix like @oauife.edu.ng.",
      }));
      toast.error("The email suffix is not valid.");
      return;
    }

    setIsSaving(true);
    setRules({
      emailSuffix: nextEmailSuffix,
      departmentCodes: nextDepartmentCodes,
    });
    setLastUpdated(new Date().toISOString());
    toast.success("Class settings saved locally.");
    setIsSaving(false);
  };

  const runDangerAction = () => {
    if (!confirmAction) return;

    setIsSaving(true);

    const nextRules =
      confirmAction === "reset"
        ? {
            emailSuffix: defaultTemplateRules.emailSuffix,
            departmentCodes: defaultTemplateRules.departmentCodes,
          }
        : {
            emailSuffix: "",
            departmentCodes: [],
          };

    setRules(nextRules);
    setDepartmentInput("");
    setFieldErrors({ emailSuffix: "", departmentCode: "" });
    setLastUpdated(new Date().toISOString());

    toast.success(
      confirmAction === "reset"
        ? "Class settings reset locally."
        : "Class access rules cleared locally.",
    );

    setConfirmAction(null);
    setIsSaving(false);
  };

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {activeTab === "Overview" ? (
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Attendance Rate",
                value: `${classItem.attendanceRate}%`,
                icon: CheckCircle2,
              },
              {
                label: "Students Enrolled",
                value: classItem.studentsCount,
                icon: Sparkles,
              },
              {
                label: "School",
                value: staticSettings.school,
                icon: School,
              },
              {
                label: "Last Updated",
                value: formatDateTime(lastUpdated),
                icon: CalendarClock,
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </p>
                  </div>
                  <div className="rounded-xl bg-sky-500/15 p-2 text-sky-700 dark:text-sky-300">
                    <item.icon className="size-5" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <Card className="rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                    Class Snapshot
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {classItem.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Manage the live class workspace without leaving the
                    dashboard.
                  </p>
                </div>
                <PencilLine className="size-5 text-slate-400" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    School
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {staticSettings.school}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Class ID
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {classId}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border border-slate-200/70 bg-linear-to-b from-sky-50/80 to-white p-5 shadow-sm dark:border-slate-800 dark:from-sky-950/20 dark:to-slate-950">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                Audit
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
                  <span>Created</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {formatDateTime(staticSettings.createdAt)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200/70 p-3 dark:border-slate-800">
                  <span>Last Updated</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {formatDateTime(lastUpdated)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : null}

      {activeTab === "Students" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              className="h-10 rounded-xl px-4"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="size-4" />
              Add Student
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl px-4"
              onClick={() => setShowImportModal(true)}
            >
              <Upload className="size-4" />
              Import Students
            </Button>
          </div>

          <StudentList
            students={classStudents}
            mode="class"
            onRemoveStudent={handleRemoveStudent}
          />
        </div>
      ) : null}

      {activeTab === "Attendance" ? (
        <div className="space-y-4">
          <Button
            className="h-10 rounded-xl px-4"
            onClick={() => setShowAttendanceModal(true)}
          >
            Take Attendance
          </Button>
          <AttendanceTable
            title="Attendance History"
            description="Recent attendance sessions for this class."
            rows={historyRows}
            getRowHref={(row) =>
              `/dashboard/teachers/classes/${classId}/attendance/${row.id}`
            }
          />
        </div>
      ) : null}

      {activeTab === "Settings" ? (
        <div className="space-y-5">
          <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
            <SettingsCard
              title="Class Rules"
              description="Control who can join this class and which departments are permitted."
              className="bg-white/80 dark:bg-slate-950/70"
            >
              <form className="space-y-5" onSubmit={handleSaveRules}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Allowed Email Domain
                  </label>
                  <input
                    value={rules.emailSuffix}
                    onChange={(event) => {
                      setRules((current) => ({
                        ...current,
                        emailSuffix: event.target.value,
                      }));
                      clearError("emailSuffix");
                    }}
                    onBlur={(event) => {
                      const nextValue = event.target.value.trim();

                      if (!nextValue) {
                        setFieldErrors((current) => ({
                          ...current,
                          emailSuffix: "Allowed email domain is required.",
                        }));
                        return;
                      }

                      if (!isValidEmailSuffix(nextValue)) {
                        setFieldErrors((current) => ({
                          ...current,
                          emailSuffix:
                            "Use a valid suffix like @oauife.edu.ng.",
                        }));
                      }
                    }}
                    className={`h-11 w-full rounded-xl border bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:bg-slate-900 dark:text-slate-100 ${
                      fieldErrors.emailSuffix
                        ? "border-rose-300 dark:border-rose-900/80"
                        : "border-slate-200 dark:border-slate-700"
                    }`}
                    placeholder="@oauife.edu.ng"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Only students with this email suffix can join.
                  </p>
                  {fieldErrors.emailSuffix ? (
                    <p className="text-xs font-medium text-rose-600 dark:text-rose-300">
                      {fieldErrors.emailSuffix}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Department Codes
                    </label>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Add and remove codes as tags
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={departmentInput}
                      onChange={(event) => {
                        setDepartmentInput(event.target.value);
                        clearError("departmentCode");
                      }}
                      onKeyDown={handleDepartmentKeyDown}
                      className={`h-11 flex-1 rounded-xl border bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:bg-slate-900 dark:text-slate-100 ${
                        fieldErrors.departmentCode
                          ? "border-rose-300 dark:border-rose-900/80"
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                      placeholder="CSC"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 rounded-xl px-4"
                      onClick={handleAddDepartmentCode}
                    >
                      <Plus className="size-4" />
                      Add Code
                    </Button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Examples: CSC, MTH, EEE.
                  </p>

                  {fieldErrors.departmentCode ? (
                    <p className="text-xs font-medium text-rose-600 dark:text-rose-300">
                      {fieldErrors.departmentCode}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-2 pt-1">
                    {rules.departmentCodes.length ? (
                      rules.departmentCodes.map((code) => (
                        <span
                          key={code}
                          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
                        >
                          {code}
                          <button
                            type="button"
                            onClick={() => {
                              setRules((current) => ({
                                ...current,
                                departmentCodes: current.departmentCodes.filter(
                                  (item) => item !== code,
                                ),
                              }));
                            }}
                            className="rounded-full p-0.5 transition hover:bg-sky-200 dark:hover:bg-sky-900/60"
                            aria-label={`Remove ${code}`}
                          >
                            <X className="size-3.5" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        No department codes added yet.
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      Save changes
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Updates are sent through a PUT request placeholder.
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="h-10 rounded-xl px-4"
                    disabled={isSaving}
                  >
                    <Save className="size-4" />
                    {isSaving ? "Saving..." : "Save Settings"}
                  </Button>
                </div>
              </form>
            </SettingsCard>

            <div className="space-y-5">
              <SettingsCard
                title="Preview Who Can Join"
                description="This preview updates as you change the rules."
                className="bg-linear-to-b from-sky-50/80 to-white dark:from-sky-950/20 dark:to-slate-950"
              >
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/80">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Eligible students
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      {previewMatches.length}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Matching the current email and department rules.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {previewMatches.length ? (
                      previewMatches.map((student) => (
                        <div
                          key={`${student.name}-${student.email}`}
                          className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950/80"
                        >
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">
                              {student.name}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400">
                              {student.email}
                            </p>
                          </div>
                          <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                            {student.department}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        Finish the rules above to preview eligible students.
                      </div>
                    )}
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard
                title="School Info"
                description="Read-only information pulled from the class record."
              >
                <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    School
                  </label>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    <School className="size-4 text-sky-600 dark:text-sky-300" />
                    {staticSettings.school}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    This field is read-only.
                  </p>
                </div>
              </SettingsCard>

              <SettingsCard
                title="Danger Zone"
                description="Use these actions carefully."
              >
                <div className="space-y-3 rounded-xl border border-rose-200/70 bg-rose-50/70 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="mt-0.5 size-5 text-rose-600 dark:text-rose-300" />
                    <div className="min-w-0">
                      <p className="font-semibold text-rose-800 dark:text-rose-200">
                        Reset or delete access rules
                      </p>
                      <p className="mt-1 text-sm text-rose-700/90 dark:text-rose-200/90">
                        Reset restores template rules. Delete clears all access
                        restrictions.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-900/60 dark:text-rose-200 dark:hover:bg-rose-950/40"
                      onClick={() => setConfirmAction("reset")}
                    >
                      <RotateCcw className="size-4" />
                      Reset Class Settings
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="h-10 rounded-xl px-4"
                      onClick={() => setConfirmAction("delete")}
                    >
                      <AlertTriangle className="size-4" />
                      Delete Class Access Rules
                    </Button>
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard
                title="Help"
                description="Quick support information."
              >
                <a
                  href="mailto:admin@oauife.edu.ng"
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 underline-offset-4 transition hover:underline dark:text-sky-300"
                >
                  Contact Admin
                  <ChevronRight className="size-4" />
                </a>
              </SettingsCard>
            </div>
          </div>
        </div>
      ) : null}

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Add Student
            </h3>
            <div className="mt-4 space-y-3">
              <input
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                placeholder="Student name"
              />
              <input
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                placeholder="Matric / ID"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddModal(false)}>Save</Button>
            </div>
          </Card>
        </div>
      ) : null}

      {showImportModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md rounded-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Import Students
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              UI-only dropzone for spreadsheet uploads.
            </p>
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
              Drag and drop an Excel file here
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowImportModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowImportModal(false)}>Import</Button>
            </div>
          </Card>
        </div>
      ) : null}

      {showAttendanceModal ? null : null}

      <TakeAttendanceModal
        key={`${classId}-${showAttendanceModal ? "open" : "closed"}`}
        open={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
        className={classItem.name}
        students={classStudents}
      />

      {confirmAction ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg rounded-3xl border border-slate-200/70 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-rose-500/15 p-2 text-rose-700 dark:text-rose-300">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-300">
                  Confirm Action
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {confirmAction === "reset"
                    ? "Reset Class Settings"
                    : "Delete Class Access Rules"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {confirmAction === "reset"
                    ? "This will restore the class to the template rules for the current dashboard session."
                    : "This will remove the current access rules and allow the class to be reconfigured from scratch."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-4"
                onClick={() => setConfirmAction(null)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="h-11 rounded-xl px-4"
                onClick={runDangerAction}
                disabled={isSaving}
              >
                {isSaving ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}
