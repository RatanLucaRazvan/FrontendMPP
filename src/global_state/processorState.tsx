import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Processor } from "../model/Processor";

interface ProcessorState {
  processors: Processor[];
  setProcessors: (processor: Processor[]) => void;
  addMoreProcessors: (processors: Processor[]) => void;
  addProcessor: (processor: Processor) => void;
  updateProcessor: (id: string, updatedProcessor: Processor) => void;
  removeProcessor: (id: string) => void;
}

const useProcessorStore = create<ProcessorState>()(
  persist(
    (set, get) => ({
      processors: [],
      setProcessors: (processors) => set({ processors }),
      addMoreProcessors: (processors: Processor[]) => set({processors: [...get().processors, ...processors]}),
      addProcessor: (processor) => set({ processors: [...get().processors, processor] }),
      updateProcessor: (id, updatedProcessor) =>
        set({
          processors: get().processors.map((processor) => {
            if (processor.id != id) return processor;
            return updatedProcessor;
          }),
        }),
      removeProcessor: (id) =>
        set({ processors: get().processors.filter((processor) => processor.id !== id) }),
    }),
    {
      name: "processors",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProcessorStore;
