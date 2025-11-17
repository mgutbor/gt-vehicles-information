import { MakeDetailEffects } from '@app/features/make-detail/state';
import { MakesEffects } from '@app/features/makes/state';

/**
 * Array de todos los effects de la aplicación
 */
export const appEffects = [MakesEffects, MakeDetailEffects];
