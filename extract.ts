type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"

type T1 = Extract<string | number | (() => void), Function>;  // () => void
