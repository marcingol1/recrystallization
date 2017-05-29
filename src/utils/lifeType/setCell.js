
export function setCell(data, germ) {
  return {
    ...data,
    value: germ.value,
    color: germ.color
  }
}