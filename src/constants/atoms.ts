import { atom } from "jotai"
import { atomWithStorage, createJSONStorage } from "jotai/utils"
import { ChainId } from "../sdk"

/*
    Storage Atoms
*/
export const networkAtom = atomWithStorage<ChainId>("network", ChainId.CHIADO)
