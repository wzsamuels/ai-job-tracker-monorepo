//  src/lib/apiClient.ts

import { z } from 'zod';

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';

function joinPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

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
  const fullUrl = `${baseUrl}${joinPath(path)}`;
  console.log('📡 Fetching:', fullUrl); // 👈 Debug it

  const res = await fetch(fullUrl, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const json = await res.json();
  return schema.parse(json);
}