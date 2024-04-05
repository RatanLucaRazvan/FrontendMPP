import { create } from "zustand";
import { Phone } from "../model";
import { createJSONStorage, persist } from "zustand/middleware";

interface PhoneState {
  phones: Phone[];
  setPhones: (phones: Phone[]) => void;
  addPhone: (phone: Phone) => void;
  updatePhone: (id: number, updatedPhone: Phone) => void;
  removePhone: (id: number) => void;
}

const useStore = create<PhoneState>()(
  persist(
    (set, get) => ({
      phones: [],
      setPhones: (phones) => set({ phones }),
      addPhone: (phone) => set({ phones: [...get().phones, phone]}),
      updatePhone: (id, updatedPhone) => set({phones: get().phones.map((phone) =>
        {
          if(phone.id != id)
            return phone;
          return updatedPhone;
        })}),
      removePhone: (id) => set({phones: get().phones.filter((phone) => phone.id !== id)})
    }),
    {
      name: "phones",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;