import Card from "@/components/ui/card";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";

export default function TeacherAttendanceMap({ attendance, handleTabChange }) {
  const locations = [
    {
      id: 1,
      name: "Empire State Building",
      lng: -73.9857,
      lat: 40.7484,
    },
    {
      id: 2,
      name: "Central Park",
      lng: -73.9654,
      lat: 40.7829,
    },
    { id: 3, name: "Times Square", lng: -73.9855, lat: 40.758 },
  ];
  return (
    <Card className="rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Attendance Map
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Teacher location and allowed radius for this session.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handleTabChange("students")}
          className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex justify-center items-center rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Go to students
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/70 dark:border-slate-800">
        {attendance?.location?.coordinates?.length >= 2 ? (
          <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96">
            <Map center={[-73.98, 40.76]} zoom={12}>
              {locations.map((location) => (
                <MapMarker
                  key={location.id}
                  longitude={location.lng}
                  latitude={location.lat}
                >
                  <MarkerContent>
                    <div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
                  </MarkerContent>
                  <MarkerTooltip>{location.name}</MarkerTooltip>
                  <MarkerPopup>
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">
                        {location.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                      </p>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}
            </Map>
          </div>
        ) : (
          <div className="flex h-40 sm:h-56 items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
            No map location is available for this attendance session yet.
          </div>
        )}
      </div>
    </Card>
  );
}
