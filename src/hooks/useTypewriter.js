import { useEffect, useState } from 'react'

/**
 * Cycles through `words` with a typing/deleting effect.
 * When `disabled` (reduced motion) it simply swaps words without animating letters.
 */
export default function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 35, pause = 1600, disabled = false } = {},
) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (disabled) {
      const t = setTimeout(() => setIndex((n) => (n + 1) % words.length), 2600)
      return () => clearTimeout(t)
    }
    const word = words[index]
    let t
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((n) => (n + 1) % words.length)
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed,
      )
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, disabled, words, typeSpeed, deleteSpeed, pause])

  return disabled ? words[index] : text
}
