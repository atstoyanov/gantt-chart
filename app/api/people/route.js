import people from './people.json';

export async function GET() {
  return Response.json(people);
}
