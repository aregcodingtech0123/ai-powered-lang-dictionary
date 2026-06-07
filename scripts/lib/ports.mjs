/** Local service port map — dev/prod frontend and backend can run concurrently. */
export const SERVICES = {
  "backend-dev": { port: 3001, label: "Backend dev API", group: "backend" },
  "backend-prod": { port: 3002, label: "Backend prod-local API", group: "backend" },
  "frontend-dev": { port: 3000, label: "Frontend Next.js dev", group: "frontend" },
  "frontend-prod": { port: 3005, label: "Frontend Next.js prod-local", group: "frontend" },
};

export const FRONTEND_SERVICE_IDS = ["frontend-dev", "frontend-prod"];
export const BACKEND_SERVICE_IDS = ["backend-dev", "backend-prod"];

export const DEFAULT_API_URL = "http://localhost:3001";

export function getService(id) {
  const service = SERVICES[id];
  if (!service) {
    throw new Error(`Unknown service "${id}". Valid: ${Object.keys(SERVICES).join(", ")}`);
  }
  return { id, ...service };
}

export function getServicesByGroup(group) {
  return Object.entries(SERVICES)
    .filter(([, s]) => s.group === group)
    .map(([id, s]) => ({ id, ...s }));
}
