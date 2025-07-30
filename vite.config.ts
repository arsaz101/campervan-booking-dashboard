import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { mockBookings } from "./src/mocks/bookings.ts";

// A simple Vite plugin to mock API responses
const mockApiPlugin = (): Plugin => {
  return {
    name: "mock-api-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/bookings" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(mockBookings));
          return;
        }
        // Handle PUT requests for updating a booking, e.g., /api/bookings/1
        if (req.url?.startsWith("/api/bookings/") && req.method === "PUT") {
          // In a real app, you would parse the request body and update the booking.
          // For now, we'll just simulate a successful update.
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Booking updated successfully" }));
          return;
        }
        next();
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
});
