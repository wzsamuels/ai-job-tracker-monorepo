'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';

type Options<T> = {
  path: string;
  schema?: z.ZodSchema<T>;
  fetchOptions?: RequestInit;
  auto?: boolean; // if false, don't fetch automatically
};

export function useApi<T = any>({ path, schema, fetchOptions, auto = true }: Options<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(auto);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(getApiUrl(path), {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        ...fetchOptions,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const parsed = schema ? schema.parse(json) : json;

      setData(parsed);
      return parsed;
    } catch (err: any) {
      setError(err.message || 'Request failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auto) fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}

function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:3001';
  return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
}
