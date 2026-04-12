import { ArrowRight, Clock3, MapPin } from "lucide-react";

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const classes = [
  {
    title: "Linear Algebra",
    time: "Today, 2:00 PM",
    room: "Room 204",
    instructor: "Dr. Ahmed",
  },
  {
    title: "Web Development",
    time: "Tomorrow, 10:30 AM",
    room: "Lab 3",
    instructor: "Ms. Rivera",
  },
  {
    title: "English Literature",
    time: "Tomorrow, 1:15 PM",
    room: "Room 118",
    instructor: "Mr. Lewis",
  },
];

export default function UpcomingClasses() {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {classes.map((item) => (
        <Card
          key={item.title}
          className="rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {item.title}
          </p>
          <div className="mt-3 space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock3 className="size-4" />
              <span>{item.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{item.room}</span>
            </div>
            <p>Instructor: {item.instructor}</p>
          </div>
          <Button variant="outline" className="mt-5 h-10 rounded-xl px-4">
            View Class
            <ArrowRight className="size-4" />
          </Button>
        </Card>
      ))}
    </section>
  );
}
