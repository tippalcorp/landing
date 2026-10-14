import type { APIRoute } from "astro";

export const prerender = true;

const body = JSON.stringify({
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ["8AAC2QGCAD.com.tippalcorp.tippal"],
        components: [
          { "/": "/send", comment: "Tip share universal link" },
          { "/": "/receive", comment: "Direct receive by recipient" },
        ],
      },
    ],
  },
});

export const GET: APIRoute = () =>
  new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });