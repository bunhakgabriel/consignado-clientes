import { create } from "zustand";

type UseDialog = {
  showDialog: boolean;
  setShowDialog: (value: boolean) => void;
};

export const DialogLoginStore = create<UseDialog>((set) => ({
  showDialog: false,
  setShowDialog: (value: boolean) => set(() => ({ showDialog: value }))
}));
