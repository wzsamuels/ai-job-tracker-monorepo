import { z } from 'zod';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function apiFetchZod<T>(
  path: string,
  schema: z.ZodSchema<T>,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const json = await res.json();
  return schema.parse(json); // ✅ throws if not valid
}
