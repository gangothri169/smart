# UrbanPulse AI — Smart City Infrastructure Monitoring Platform

> **Final-Year Engineering Software Project Demonstration**  
> **Tagline:** *Intelligent Infrastructure. Safer Cities.*  
> **Domain:** Artificial Intelligence, Internet of Things (IoT), Computer Vision, Geospatial Analytics, Civic Technology.

---

## 🏙️ Executive Overview

**UrbanPulse AI** is a centralized, automated civic operations platform designed to detect, locate, triage, prioritize, assign, and track the resolution of critical urban infrastructure issues.

The system targets the three most pressing civic infrastructure challenges:
1. **Potholes & Damaged Roads**: Deep pavement cavities, edge erosion, and surface fractures that endanger motorists and two-wheelers.
2. **Faulty & Non-Functional Streetlights**: Dark zones, luminaire flickering, exposed wiring, and circuit feeder failures compromising public night safety.
3. **Garbage Overflow & Waste Accumulation**: Overfilled municipal dumpsters, commercial spillage, and unauthorized dumping that create sanitation and health hazards.

---

## 🔄 End-to-End Operational Workflow

```
[Simulated IoT Node / Cam]
           │
           ▼
[Edge Telemetry Ingestion] (CAM-014, NODE-032, etc.)
           │
           ▼
[AI-Based Classification] (Pothole / Streetlight / Garbage)
           │
           ▼
[Geospatial GPS Coordinate Tagging]
           │
           ▼
[Severity & Public Safety Assessment]
           │
           ▼
[Dynamic Priority Scoring (0–100)] (Critical, High, Medium, Low)
           │
           ▼
[Automated Department Allocation] (Roads / Electrical / Waste)
           │
           ▼
[Operational Lifecycle Tracking] (Detected → Under Review → Assigned → In Progress → Resolved)
           │
           ▼
[Real-Time Analytics & CSV Audit Export]
```

---

## 🛠️ Technology Stack & Architecture

- **Frontend Framework:** React 18 (Vite Bundler, ES Modules)
- **Design System:** Custom Civic Operations CSS (Dark navy sidebar, teal/emerald accents, responsive grid, accessible typography)
- **Iconography:** Lucide React icons
- **Geospatial Mapping:** Leaflet with OpenStreetMap tiles + Offline-ready Schematic Interactive City Grid fallback
- **State Management:** React Context API with LocalStorage automatic persistence
- **Illustrative Telemetry Evidence:** Local vector SVG graphics depicting road cavities, luminaire faults, and container overflows (Zero external image dependency failure risk)

---

## 🚀 How to Run the Application Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup & Run Steps
1. Open your terminal in the project directory:
   ```bash
   cd c:\Users\Gangothri\Downloads\smart
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📋 Complete Faculty Demonstration Script (Step-by-Step)

| Step | Action | What to Highlight / Faculty Explanation |
| :--- | :--- | :--- |
| **1. Overview Dashboard** | Open `http://localhost:3000` | Highlight the **6 KPI cards** (Total Detected, Active, Critical, Resolved, Avg Resolution Time, Detection Rate). Point out the **Category Breakdown**, **Priority Triage**, and **Infrastructure Health Index** calculated from the municipal dataset. |
| **2. Live IoT Monitoring** | Click **Live Monitoring** in the sidebar | Point out the **IoT Gateway & Edge Status Panel** (clearly noting simulated demonstration mode). Explain the **5-step AI pipeline banner** (Data Received → Image Analysis → Classification → Severity → Incident Created). |
| **3. Trigger New Detection** | Click **"Simulate New Detection"** | Watch the pipeline animate and produce a new simulated edge event with device ID (e.g., `CAM-045`), GPS coordinates, confidence rating, and local SVG evidence. |
| **4. AI Explainability** | Click the newly generated incident or go to **Issue Management** | Open the incident modal. Point to the **AI Scoring & Explainability panel** with the **Priority Score (0–100)** and the clear rationale answer under *"Why was this issue prioritized?"*. |
| **5. Department Assignment** | Under *"Responsible Department"*, select a division | Demonstrate instant ticket routing to **Road Infrastructure**, **Electrical**, or **Waste Management**. |
| **6. Workflow Progress** | Click **"In Progress"** | The status badge updates immediately, logging a timestamped audit entry in the **Resolution History** and triggering a system notification. |
| **7. Resolve Incident** | Click **"Resolved"** | The ticket is closed. Notice how the **Active Issues** KPI decreases, **Resolved Issues** increases, and the **Infrastructure Health Index** recalculates. |
| **8. Geospatial Map** | Click **Map View** in the sidebar | Markers appear across the urban pilot corridor with distinct colors for Potholes, Lights, and Waste. Switch between **OpenStreetMap** and the **Schematic City Grid** (which functions 100% offline). Click any pin to open details. |
| **9. Department Management** | Click **Departments** in the sidebar | Review the live workload bars for each municipal wing. Verify that tickets reassigned in step 5 appear in the respective department roster. |
| **10. Analytics & Export** | Click **Analytics** in the sidebar | Review distribution charts and SLA velocity. Click **"Export CSV Dataset"** to download the complete operational ledger as a CSV spreadsheet. |
| **11. Browser Refresh Test** | Refresh browser (`F5` / `Ctrl+R`) | Verify that all changes, created incidents, and status transitions persist reliably via `localStorage`. |

---

## 🏛️ Municipal Departments Configured
1. **Road Infrastructure & Maintenance**: Pavement subsidence, craters, potholes, lane milling.
2. **Electrical & Street Lighting Division**: Dark luminaires, shorted LED drivers, hanging arms, live wiring hazards.
3. **Solid Waste Management & Sanitation**: Overflowing bins, illegal debris, market waste accumulation.

---

## 🔒 Reliability & Offline Guarantees
- **No external API keys required:** Runs without Mapbox, Google Maps, or backend keys.
- **Offline Schematic Fallback:** Map View works even if the presentation room lacks internet.
- **Embedded SVG Visuals:** Visual evidence cannot break or display missing image icons.
- **Safe State Reset:** Restore default seed data anytime in **System Settings**.
