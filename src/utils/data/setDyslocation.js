import getData from './getData'

export default ({ germ, neighbours, size, iteration }) => {
  const data = getData()

  const getDeltaRo = (iteration) => {
    const t1 = data[iteration]
    const t2 = data[iteration + 1]
    return (t2.ro - t1.ro) / size //dRo
  }
  const isOnBorder = neighbours.some(e => e.color !== germ.color)
  return isOnBorder ? getDeltaRo(iteration) * 0.8 : getDeltaRo(iteration) * 0.2
}