import { build } from "vite";

process.env.VITE_BASE44_APP_ID ||= "6a3313a648abe8c04826b000";
process.env.VITE_BASE44_APP_BASE_URL ||= "https://app.base44.com/apps/6a3313a648abe8c04826b000";
process.env.VITE_BASE44_FUNCTIONS_VERSION ||= "";

await build();
