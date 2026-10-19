# p10.2 — Employee Details (Node.js REST Backend + Fetch API)

A full-stack web application for managing employee records. A lightweight Node.js HTTP server persists employee data to `employees.json` on disk, while the frontend uses the native **Fetch API** to communicate with it.

## Features

- Add employees with **ID**, **Name**, **Department**, and **Salary**
- `POST /save` — appends the new employee to `employees.json` on the server
- **Load Employees** button — fetches and renders all stored records from `employees.json`
- JSON status messages displayed below the form after each action

## Files

| File | Description |
|------|-------------|
| `index.html` | Main UI — form, JSON output panel, and employee table |
| `script.js` | Frontend logic using the Fetch API (`addEmployeeFromForm`, `loadEmployeesFromJson`) |
| `server.js` | Node.js HTTP server (port **3001**) — serves static files and handles `POST /save` |
| `employees.json` | Persistent employee data store (auto-created / updated by the server) |

## Usage

```bash
# Start the server
node server.js

# Open in browser
open http://localhost:3001
```

> **Note:** Requires Node.js. The server runs on port **3001**.
