import tasks from './tasks.json';

export async function GET() {
  return Response.json(tasks);
}
