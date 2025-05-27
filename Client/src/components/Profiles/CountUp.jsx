import { useEffect, useState } from "react"

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16) // 60fps aprox
    const step = () => {
      start += increment
      if (start < end) {
        setCount(Math.floor(start))
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration])

  return <span className="stat-number">{count}</span>
}
export default CountUp;
