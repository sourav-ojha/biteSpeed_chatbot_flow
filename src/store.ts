import { Node } from "reactflow";
import { create } from "zustand";

type Store = {
  selectedNode: Node | null;
  setSelectedNode: (selectedNode: Node) => void;
};

export const useStore = create<Store>((set) => ({
  selectedNode: null,
  setSelectedNode: (selectedNode: Node) => set({ selectedNode: selectedNode }),
}));
