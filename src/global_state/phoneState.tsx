import { create } from "zustand";
import { Phone } from "../model/Phone";
import { createJSONStorage, persist } from "zustand/middleware";

interface PhoneState {
  phones: Phone[];
  setPhones: (phones: Phone[]) => void;
  addMorePhones: (phones: Phone[]) => void;
  addPhone: (phone: Phone) => void;
  updatePhone: (id: string, updatedPhone: Phone) => void;
  removePhone: (id: string) => void;
  removePhoneByProcessor: (processorId: string) => void;
}

const useStore = create<PhoneState>()(
  persist(
    (set, get) => ({
      phones: [],
      setPhones: (phones) => set({ phones }),
      addMorePhones: (phones: Phone[]) => set({phones: [...get().phones, ...phones]}),
      addPhone: (phone) => set({ phones: [...get().phones, phone] }),
      updatePhone: (id, updatedPhone) =>
        set({
          phones: get().phones.map((phone) => {
            if (phone.id != id) return phone;
            return updatedPhone;
          }),
        }),
      removePhone: (id) =>
        set({ phones: get().phones.filter((phone) => phone.id !== id) }),
      removePhoneByProcessor: (processorId) => set({phones: get().phones.filter((phone) => phone.processorId !== processorId)})
    }),
    {
      name: "phones",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
