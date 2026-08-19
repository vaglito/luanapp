"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `true` only after the component has hydrated on the client.
 *
 * Uses `useSyncExternalStore` (server snapshot `false`, client snapshot `true`)
 * instead of the common `useState(false)` + `useEffect(() => setState(true), [])`
 * pattern, so no `setState` call happens inside an effect body.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
