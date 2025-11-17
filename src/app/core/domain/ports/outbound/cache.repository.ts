import { Observable } from 'rxjs';

/**
 * Port para gestión de caché
 * Permite diferentes implementaciones (LocalStorage, SessionStorage, Memory, IndexedDB)
 * Siguiendo el principio Open/Closed (SOLID)
 */
export abstract class CacheRepository {
  /**
   * Almacena un valor en caché
   * @param key Clave única
   * @param value Valor a almacenar
   * @param ttl Tiempo de vida en milisegundos (opcional)
   */
  abstract set<T>(key: string, value: T, ttl?: number): void;

  /**
   * Obtiene un valor de la caché
   * @param key Clave del valor
   * @returns Observable con el valor o null si no existe o expiró
   */
  abstract get<T>(key: string): Observable<T | null>;

  /**
   * Verifica si existe un valor en caché y no ha expirado
   * @param key Clave del valor
   * @returns true si existe y es válido
   */
  abstract has(key: string): boolean;

  /**
   * Elimina un valor de la caché
   * @param key Clave del valor
   */
  abstract remove(key: string): void;

  /**
   * Limpia toda la caché
   */
  abstract clear(): void;

  /**
   * Limpia valores expirados
   */
  abstract clearExpired(): void;
}
