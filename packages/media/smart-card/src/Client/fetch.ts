import { Observable } from 'rxjs/Observable';

export default function<T>(
  method: string,
  url: string,
  data?: any,
): Observable<T> {
  return new Observable(observer => {
    const AC = new AbortController();
    const requestConfig = {
      method,
      signal: AC.signal,
      credentials: 'include' as RequestCredentials,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    };

    try {
      fetch(url, requestConfig)
        .then(resp => resp.ok && resp.json())
        .then(res => {
          observer.next(res as T);
          observer.complete();
        })
        .catch(e => {
          observer.error(e);
        });
    } catch (e) {
      observer.error(e);
    }

    return () => AC.abort();
  });
}
