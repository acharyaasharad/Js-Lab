# p10.1 — Student Details (JSON / In-Memory Table)

A client-side web page that lets you add student records through a form and displays them in a table. Pre-seeded student data is available in `student.json` for reference.

## Features

- Add students by filling in **ID**, **Name**, **Department**, and **Marks**
- Entries are stored in an in-memory array and rendered into an HTML table
- Input validation — all four fields must be filled before a record is accepted
- Empty-state message shown when no data has been entered yet
- Sample data available in `student.json`

## Files

| File | Description |
|------|-------------|
| `index.html` | Main page — includes the form, table, and inline JavaScript logic |
| `student.json` | Sample student data (Rahul, Sahil, Hardik) |

## Usage

Open `index.html` directly in a browser — no server required.

```bash
# macOS / Linux
open index.html

# or double-click index.html in Finder
```
