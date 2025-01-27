import { Hono } from 'hono';
import { discoveryRouter } from './cds/discovery';
import { hooksRouter } from './cds/hooks';
import chalk from 'chalk';

const app = new Hono();

// Logging middleware
app.use('*', async (c, next) => {
  console.log(`➡️ ${c.req.method} ${c.req.path}`);
  await next();

  // Determine color based on status code
  let color = chalk.green; // Default to green for success
  if (c.res.status >= 400 && c.res.status < 500) {
    color = chalk.yellow; // Yellow for client errors
  } else if (c.res.status >= 500) {
    color = chalk.red; // Red for server errors
  }

  console.log(`⬅️ ${c.req.method} ${c.req.path} ${c.req} - ${color(c.res.status)}`);
});


// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'Hey Jaffer', timestamp: new Date() });
});

// Mount the discovery and hooks routers
app.route('/cds-services/', discoveryRouter);
app.route('/cds-services', hooksRouter);

// Start the server
const port = 4433;

console.log(chalk.blue(`🚀 Server running at http://localhost:${port}`));
console.log(chalk.blue(`📡 CDS Discovery Endpoint: http://localhost:${port}/cds-services`));
console.log(chalk.blue(`🎣 CDS Hooks Endpoint: http://localhost:${port}/cds-services/:id`));
console.log(chalk.green(`🏥 Health Check: http://localhost:${port}/health`));


export default {
  port,
  fetch: app.fetch,
};