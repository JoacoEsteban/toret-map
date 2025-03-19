export function id(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export function time(label: string = id()) {
  var startTime = performance.now()

  return () => {
    var endTime = performance.now()
    console.log(
      `-> Time taken for ${label}: ${endTime - startTime} milliseconds.`,
    )
  }
}
