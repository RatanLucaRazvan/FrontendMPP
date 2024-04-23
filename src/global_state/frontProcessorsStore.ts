import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Processor } from "../model/Processor";
import { FrontProcessor } from "../model/FrontProcessor";

interface FrontProcessorState {
  frontProcessors: FrontProcessor[];
  getFrontProcessors: () => FrontProcessor[];
  setFrontProcessors: (processor: FrontProcessor[]) => void;
  addFrontProcessor: (processor: FrontProcessor) => void;
  updateFrontProcessor: (id: string, updatedProcessor: FrontProcessor) => void;
  removeFrontProcessor: (id: string) => void;
}

const useFrontProcessorStore = create<FrontProcessorState>()(
  persist(
    (set, get) => ({
      frontProcessors: [],
      getFrontProcessors: () => get().frontProcessors,
      setFrontProcessors: (frontProcessors) => set({ frontProcessors }),
      addFrontProcessor: (frontProcessor) => set({ frontProcessors: [...get().frontProcessors, frontProcessor] }),
      updateFrontProcessor: (id, updatedProcessor) =>
        set({
          frontProcessors: get().frontProcessors.map((processor) => {
            if (processor.id != id) return processor;
            return updatedProcessor;
          }),
        }),
      removeFrontProcessor: (id) => set({ frontProcessors: get().frontProcessors.filter((processor) => processor.id !== id) }),
    }),
    {
      name: "front_processors",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFrontProcessorStore;
