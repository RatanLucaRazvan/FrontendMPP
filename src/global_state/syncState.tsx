import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SyncState {
    synced: boolean,
    setSynced: (newSynced: boolean) => void; 
}


const useSyncStore = create<SyncState>()(
    persist(
      (set, get) => ({
        synced: false,
        setSynced: (newSynced) => set({ synced: newSynced }),
      }),
      {
        name: "sync",
        storage: createJSONStorage(() => localStorage)
      }
    )
  );
  
  export default useSyncStore;