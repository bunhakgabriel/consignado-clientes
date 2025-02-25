import { create } from "zustand";

type UserStore = {
    idUsuario: string | undefined,
    setIdUsuario: (value: string) => void;
    clearIdUsuario: () => void;
}

export const UsuarioStore = create<UserStore>(set => ({
    idUsuario: undefined,
    setIdUsuario: (value: string) => set(() => ({ idUsuario: value })),
    clearIdUsuario: () => set(() => ({ idUsuario: undefined }))
}))