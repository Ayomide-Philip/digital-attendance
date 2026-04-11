# 📘 Digital Attendance System Documentation

## 1. 📌 Overview

The **Digital Attendance System** is a location-based web application designed to streamline and secure attendance tracking in educational environments.

It allows teachers (admins) to create attendance sessions and ensures that only students within a specified physical radius can mark attendance using real-time geolocation.

The system leverages browser-based location services and distance calculation algorithms to prevent fraudulent attendance submissions.

---

## 2. 🎯 Objectives

- Eliminate manual attendance taking
- Prevent proxy attendance (students marking for others)
- Provide real-time attendance tracking
- Ensure location-based validation of users
- Simplify attendance management for teachers

---

## 3. 👥 User Roles

### 🧑‍🏫 Admin (Teacher)

- Create attendance sessions
- Define session title (default: current date)
- Set allowed distance radius
- View attendance records
- Monitor student participation

### 🎓 Student

- View active attendance sessions
- Join attendance session
- Submit attendance (only if within allowed radius)
- Receive feedback (success/failure)

---

## 4. ⚙️ Core Features

### 4.1 Attendance Session Creation

- Admin can:
  - Use auto-generated title (e.g., `April 11, 2026 Attendance`)
  - Or input custom title

- Session includes:
  - Title
  - Date
  - Location coordinates (latitude & longitude)
  - Allowed radius (e.g., 50m, 100m)

---

### 4.2 Location Verification System

The system uses:

- `navigator.geolocation.getCurrentPosition()`
  → To get user's real-time location

- Haversine Formula
  → To calculate distance between:
  - Teacher's location (session origin)
  - Student's location (current position)

---

### 📐 Distance Calculation

d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\phi_2-\phi_1}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\lambda_2-\lambda_1}{2}\right)}\right)

Where:

- ( d ) = distance between two points
- ( r ) = Earth’s radius (~6371 km)
- ( \phi ) = latitude (in radians)
- ( \lambda ) = longitude (in radians)

---

### 4.3 Attendance Validation Logic

- If:

  ```
  distance ≤ allowed_radius
  ```

  → Attendance is **approved**

- Else:
  → Attendance is **rejected**

---

### 4.4 Student Attendance Flow

1. Student logs into system
2. Views active attendance session
3. Clicks “Mark Attendance”
4. System:
   - Requests location permission
   - Calculates distance

5. Displays result:
   - ✅ Success (within range)
   - ❌ Failed (outside allowed range)

---

### 4.5 Admin Dashboard

Features include:

- Create attendance session
- Set radius (meters)
- View attendance list
- Track:
  - Student name
  - Time of submission
  - Distance from origin

- Export attendance data (optional feature)

---

## 5. 🧠 System Architecture (High-Level)

### Frontend

- Built with: React / Next.js
- Uses:
  - Geolocation API
  - UI dashboard for admin & students

### Backend

- Handles:
  - Session creation
  - Location storage (lat/lng)
  - Attendance validation
  - Database operations

### Database

Stores:

- Users (students/admins)
- Attendance sessions
- Attendance records

---

## 6. 🔐 Security Considerations

- Prevent multiple submissions per student
- Validate user identity (authentication required)
- Handle fake GPS attempts (basic mitigation):
  - Check sudden large location jumps
  - Optional: device/IP logging

---

## 7. ⚠️ Limitations

- Requires internet connection
- Depends on device GPS accuracy
- Users can spoof location with advanced tools (edge case)

---

## 8. 🚀 Future Enhancements

- QR code backup attendance method
- Face recognition integration
- Offline attendance sync
- Real-time map view of students
- Push notifications for session start

---

## 9. 📱 User Experience Notes

- Keep UI simple and fast (students shouldn’t struggle)
- Provide clear error messages:
  - “Enable location services”
  - “You are too far from the class location”

- Mobile-first design is critical

---

## 10. 🧪 Example Use Case

1. Teacher opens dashboard
2. Clicks “Create Attendance”
3. System auto-fills title:
   → _April 11, 2026 Attendance_
4. Teacher sets radius: `100 meters`
5. Students nearby mark attendance
6. System verifies location and records valid entries
