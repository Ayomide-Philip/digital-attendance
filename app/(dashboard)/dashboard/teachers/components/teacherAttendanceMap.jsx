import Card from "@/components/ui/card";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapControls,
  MapRadius,
} from "@/components/ui/map";

export default function TeacherAttendanceMap({ attendance, handleTabChange }) {
  const centerCoords = attendance?.location?.coordinates;
  const studentsLocation = attendance?.students
    ?.map((s) => {
      if (s?.location?.coordinates?.length === 2) {
        return {
          id: s?.studentId?._id,
          name: s?.studentId?.name,
          lng: s.location.coordinates[0],
          lat: s.location.coordinates[1],
          status: s?.status,
          matricNo: s?.studentId?.matricNo,
          department: s?.studentId?.department,
        };
      }
    })
    .filter(Boolean);
  const statusColor = {
    present: "bg-green-500",
    absent: "bg-red-500",
    flagged: "bg-amber-500",
  };

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
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Radius:{" "}
            {attendance?.allowedRadius
              ? `${attendance.allowedRadius} m`
              : "(not set)"}
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
          <div className="w-full h-56 sm:h-72 md:h-100 lg:h-110">
            <Map center={centerCoords} zoom={18}>
              <MapControls
                position="top-right"
                showZoom
                showCompass
                showFullscreen
              />
              <MapRadius
                coordinates={centerCoords}
                radiusMeters={attendance?.allowedRadius}
                fillColor="#2563eb"
                fillOpacity={0.14}
                strokeColor="#2563eb"
                strokeOpacity={0.7}
                strokeWidth={2}
              />
              {attendance?.allowedRadius > 0 &&
                (() => {
                  const [lng, lat] = centerCoords;
                  const deltaLat = (attendance.allowedRadius / 111320) * 0;
                  const deltaLng =
                    attendance.allowedRadius /
                      (111320 * Math.cos((lat * Math.PI) / 180)) || 0;
                  const edgeLng = lng + deltaLng;
                  const edgeLat = lat + deltaLat;

                  return (
                    <MapMarker longitude={edgeLng} latitude={edgeLat}>
                      <MarkerContent>
                        <div className="h-3 w-3 rounded-full bg-white border-2 border-sky-600 shadow-lg" />
                      </MarkerContent>
                      <MarkerPopup>
                        <div className="text-xs">
                          Radius test point — {attendance.allowedRadius} m
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  );
                })()}
              <MapMarker longitude={centerCoords[0]} latitude={centerCoords[1]}>
                <MarkerContent>
                  <div className="size-5 cursor-pointer rounded-full border-2 border-white bg-blue-500 shadow-lg transition-transform hover:scale-110" />
                </MarkerContent>
                <MarkerTooltip>Teacher Location</MarkerTooltip>
                <MarkerPopup>
                  <div className="space-y-1">
                    <p className="text-foreground font-medium">
                      {`Registered Location`}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {centerCoords[1].toFixed(4)}, {centerCoords[0].toFixed(4)}
                    </p>
                  </div>
                </MarkerPopup>
              </MapMarker>
              {studentsLocation?.length > 0
                ? studentsLocation?.map((location) => (
                    <MapMarker
                      key={location?.id}
                      longitude={location?.lng}
                      latitude={location?.lat}
                    >
                      <MarkerContent>
                        <div
                          className={`size-5 cursor-pointer rounded-full border-2 border-white ${statusColor[location?.status] || "bg-gray-500"} shadow-lg transition-transform hover:scale-110`}
                        />
                      </MarkerContent>
                      <MarkerTooltip>{location?.name}</MarkerTooltip>
                      <MarkerPopup>
                        <div className="max-w-xs bg-white text-slate-900 dark:bg-slate-900">
                          <div className="flex items-center gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate dark:text-white">
                                {location?.name || "Unknown Student"}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {location?.department || "—"}
                              </p>
                            </div>

                            <span className="ml-auto capitalize inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                              {location?.status || "unknown"}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                            <div>
                              <span className="text-slate-600 dark:text-slate-200 font-medium">
                                Matric:
                              </span>
                              <span className="ml-2">
                                {location?.matricNo || "—"}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span className="text-slate-600 dark:text-slate-200 font-medium">
                                Coords:
                              </span>
                              <span className="ml-2 font-mono">
                                {location?.lat?.toFixed(4) || "—"},{" "}
                                {location?.lng?.toFixed(4) || "—"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </MarkerPopup>
                    </MapMarker>
                  ))
                : null}
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
