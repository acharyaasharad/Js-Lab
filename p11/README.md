# p11 — Employee Details (Node.js REST Backend + jQuery AJAX)

A full-stack web application for managing employee records — functionally identical to **p10.2**, but the frontend is rewritten to use **jQuery** (`$.ajax`) instead of the native Fetch API.

## Features

- Add employees with **ID**, **Name**, **Department**, and **Salary**
- `POST /save` — appends the new employee to `employees.json` on the server via `$.ajax`
- **Load Employees** button — fetches and renders stored records using `$.ajax GET`
- jQuery DOM manipulation (`$.each`, `.empty()`, `.append()`, `.text()`) throughout

## Files

| File | Description |
|------|-------------|
| `index.html` | Main UI — loads jQuery via CDN, includes form and employee table |
| `script.js` | Frontend logic using jQuery AJAX (`addEmployeeFromForm`, `loadEmployeesFromJson`) |
| `server.js` | Node.js HTTP server (port **3002**) — serves static files and handles `POST /save` |
| `employees.json` | Persistent employee data store (auto-created / updated by the server) |

## Usage

```bash
# Start the server
node server.js

# Open in browser
open http://localhost:3002
```

> **Note:** Requires Node.js. The server runs on port **3002**. jQuery is loaded from CDN — an internet connection is needed.
