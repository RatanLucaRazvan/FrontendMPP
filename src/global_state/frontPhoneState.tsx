import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { FrontPhone } from "../model/FrontPhone";
import useStore from "./phoneState";


interface FrontPhoneState {
  frontPhones: FrontPhone[];
  getFrontPhones: () => FrontPhone[];
  setFrontPhones: (phones: FrontPhone[]) => void;
  addFrontPhone: (phone: FrontPhone) => void;
  updateFrontPhone: (id: string, updatedPhone: FrontPhone) => void;
  removeFrontPhone: (id: string) => void;
  removeFrontPhoneByProcessor: (processorId: string) => void;
}

const useFrontStore = create<FrontPhoneState>()(
  persist(
    (set, get) => ({
      frontPhones: [],
      getFrontPhones: () => get().frontPhones,
      setFrontPhones: (frontPhones) => set({ frontPhones }),
      addFrontPhone: (phone) => set({ frontPhones: [...get().frontPhones, phone] }),
      updateFrontPhone: (id, updatedPhone) =>
        set({
          frontPhones: get().frontPhones.map((phone) => {
            if (phone.id != id) return phone;
            return updatedPhone;
          }),
        }),
      removeFrontPhone: (id) =>
        set({ frontPhones: get().frontPhones.filter((phone) => phone.id !== id) }),
      removeFrontPhoneByProcessor: (processorId) => set({frontPhones: get().frontPhones.filter((phone) => phone.processorId !== processorId)})
        // set({frontPhones: get().frontPhones.filter((phone) => phone.processorId !== processorId)})
    }),
    {
      name: "front_phones",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFrontStore;
