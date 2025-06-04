import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";

// Puedes crear un hook custom para evitar repetir el tipo
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
