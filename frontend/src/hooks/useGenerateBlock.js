import { api } from '../services/api'
import { useCanvasStore } from '../store/canvasStore'

export function useGenerateBlock() {
  const { setResult, setStatus } = useCanvasStore()

  const generate = async (block) => {
    if (!block.context.trim()) return

    setStatus(block.id, 'loading')

    try {
      const { data } = await api.post('/generate-block', {
        block_type: block.type,
        context: block.context,
        language: 'en-US',
      })
      setResult(block.id, data)
    } catch (err) {
      setStatus(block.id, 'error')
      console.error(err)
    }
  }

  return { generate }
}
