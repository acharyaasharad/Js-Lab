# p11.1 — Restaurant Orders (jQuery `$.getJSON` + Node.js Static Server)

A read-only dashboard that loads restaurant order data from `orders.json` using jQuery's **`$.getJSON()`** and displays it in a table with a running summary of total orders and total sales.

## Features

- **View Orders** button — fetches `orders.json` via `$.getJSON()` and renders all records
- Displays: Order ID, Customer Name, Food Item, Quantity, Total Amount, and Order Status
- Summary panel shows **total number of orders** and **total sales amount**
- Duplicate rows are prevented if the button is clicked multiple times
- Friendly error message if `orders.json` cannot be loaded

## Files

| File | Description |
|------|-------------|
| `index.html` | Main UI — loads jQuery via CDN, table, and summary panel |
| `script.js` | Frontend logic using `$.getJSON()` and `$.each()` |
| `server.js` | Node.js static file server (port **3003**) to serve the page and JSON |
| `orders.json` | Restaurant order data |

## Usage

```bash
# Start the server (required — browser security blocks local $.getJSON without a server)
node server.js

# Open in browser
open http://localhost:3003
```

> **Note:** Requires Node.js. The server runs on port **3003**. jQuery is loaded from CDN — an internet connection is needed.
