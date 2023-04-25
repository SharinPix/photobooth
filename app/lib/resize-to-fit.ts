export function resizeToFit(
    x: number,
    y: number,
    mx: number,
    my: number
  ): [number, number] {
    if (x / y < mx / my) {
      return [(x * my) / y, my];
    } else {
      return [mx, (y * mx) / x];
    }
}
