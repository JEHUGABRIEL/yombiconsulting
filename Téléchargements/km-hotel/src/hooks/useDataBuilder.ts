import { useMemo } from 'react';

type TFunction = (key: string) => string;

/**
 * Generic hook that memoizes the result of a data builder function.
 * The builder is re-executed only when the `t` translation function changes
 * (i.e., when the user switches language).
 *
 * @param builder - A function that builds data from the i18n `t` function
 * @param t - The i18n translation function from `useTranslation()`
 * @returns The memoized result of `builder(t)`
 *
 * @example
 * ```tsx
 * const rooms = useDataBuilder(buildRoomsData, t);
 * // Equivalent to: const rooms = useMemo(() => buildRoomsData(t), [t]);
 * ```
 */
export function useDataBuilder<T>(
  builder: (t: TFunction) => T,
  t: TFunction
): T {
  return useMemo(() => builder(t), [builder, t]);
}
