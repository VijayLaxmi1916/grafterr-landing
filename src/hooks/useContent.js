import { useCallback, useEffect, useRef, useState } from 'react';

export default function useContent(fetcher) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const result = await fetcher();
      if (!mountedRef.current) return;
      setData(result);
      setStatus('success');
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err);
      setStatus('error');
    }
  }, [fetcher]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { data, status, error, retry: load };
}
