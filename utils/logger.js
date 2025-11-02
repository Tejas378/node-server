import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "error.log");
export const logErrorToFile = (error, context = "General") => {
  const timestamp = new Date().toISOString();

  const message = `
[${timestamp}] [${context}]
${error instanceof Error ? error.stack : error}
--------------------------------------------------
`;

  fs.appendFile(logFile, message, (err) => {
    if (err) {
      console.error("Failed to write error log:", err);
    }
  });
};
