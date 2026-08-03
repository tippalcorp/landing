import type { APIRoute } from "astro";

const content = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "TU_TEAM_ID.com.tippalcorp.app",
        paths: ["/send", "/send/*", "/receive", "/receive/*"],
      },
    ],
  },
};

export const GET: APIRoute = () =>
  new Response(JSON.stringify(content, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
