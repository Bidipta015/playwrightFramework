export function log(message: string) {
  // lightweight logger for tests
  // use console.debug so Playwright captures it in traces
  console.debug(`[test] ${message}`);
}
