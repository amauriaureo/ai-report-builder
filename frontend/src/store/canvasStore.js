import { create } from 'zustand'
import { nanoid } from 'nanoid'

export const useCanvasStore = create((set) => ({
  blocks: [],

  addBlock: (type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        {
          id: nanoid(),
          type,
          context: '',
          status: 'idle',
          result: null,
        },
      ],
    })),

  updateContext: (id, context) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, context } : b)),
    })),

  setResult: (id, result) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, result, status: 'done' } : b
      ),
    })),

  setStatus: (id, status) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, status } : b)),
    })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    })),

  reorderBlocks: (newOrder) => set({ blocks: newOrder }),
}))
