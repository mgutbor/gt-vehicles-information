import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheRepository } from '../../domain/ports/outbound';

/**
 * Interfaz para items almacenados en caché
 */
interface CacheItem<T> {
  value: T;
  expiresAt: number | null;
}

/**
 * Implementación de repositorio de caché en memoria
 * Siguiendo el principio de Inversión de Dependencias (SOLID)
 */
@Injectable({
  providedIn: 'root',
})
export class InMemoryCacheRepository implements CacheRepository {
  private readonly cache = new Map<string, CacheItem<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos por defecto

  set<T>(key: string, value: T, ttl?: number): void {
    const expiresAt = ttl ? Date.now() + ttl : Date.now() + this.DEFAULT_TTL;

    this.cache.set(key, {
      value,
      expiresAt,
    });
  }

  get<T>(key: string): Observable<T | null> {
    const item = this.cache.get(key);

    if (!item) {
      return of(null);
    }

    // Verificar si ha expirado
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return of(null);
    }

    return of(item.value as T);
  }

  has(key: string): boolean {
    const item = this.cache.get(key);

    if (!item) {
      return false;
    }

    // Verificar si ha expirado
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  clearExpired(): void {
    const now = Date.now();

    this.cache.forEach((item, key) => {
      if (item.expiresAt && now > item.expiresAt) {
        this.cache.delete(key);
      }
    });
  }
}
