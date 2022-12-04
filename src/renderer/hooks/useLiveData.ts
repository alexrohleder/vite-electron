import { useCallback, useSyncExternalStore } from "react";
import { subscribe } from "../lib/socket";
import type { EventsType } from "../../main/server/lib/events";

const store = new Map();

function useLiveData<K extends keyof EventsType>(key: K) {
  return useSyncExternalStore<EventsType[K]>(
    useCallback(
      (onStoreChange) =>
        subscribe(key, (data) => {
          store.set(key, data);
          console.log(key, data);
          onStoreChange();
        }),
      [key]
    ),
    useCallback(() => store.get(key), [key])
  );
}

export default useLiveData;
