'use client';

import { useState } from 'react';
import { z } from 'zod';

type MutationOptions<T, B = unknown> = {
  path: string;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  schema?: z.ZodSchema<T>; // optional response schema
  defaultHeaders?: HeadersInit;
};

export function useApiMutation<T = any, B = unknown>({
  path,
  method = 'POST',
  schema,
  defaultHeaders,
}: MutationOptions<T, B>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function mutate(body?: B): Promise<T | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(getApiUrl(path), {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...defaultHeaders,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || `Request failed: ${res.status}`);
      }

      const parsed = schema ? schema.parse(json) : json;
      setData(parsed);
      return parsed;
    } catch (err: any) {
      setError(err.message || 'Request failed');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { mutate, data, loading, error };
}

function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
}
