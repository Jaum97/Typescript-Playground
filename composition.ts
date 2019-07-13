function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
    return x => g(f(x));
}
