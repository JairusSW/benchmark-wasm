// Adapted from https://github.com/romdotdog/as-tral/src/as-tral.ts
export function formatTime(ms: f64): string {
    if (ms < 10e-6) {
        return short<f64>(ms * 1e9).toString() + "ps";
    } else if (ms < 10e-3) {
        return short<f64>(ms * 1e6).toString() + "ns";
    } else if (ms < 10) {
        return short<f64>(ms * 1e3).toString() + "us";
    } else if (ms < 10e3) {
        return short<f64>(ms).toString() + "ms";
    } else {
        return short<f64>(ms * 1e-3).toString() + "s";
    }
}

function short<T extends number>(n: T): T {
    if (isInteger<T>()) {
        if (n < 10) {
            return (~~(n * 10000) / 10000) as T;
        } else if (n < 100) {
            return (~~(n * 1000) / 1000) as T;
        } else if (n < 1000) {
            return (~~(n * 100) / 100) as T;
        } else if (n < 10000) {
            return (~~(n * 10) / 10) as T;
        } else {
            return (~~n) as T;
        }
    } else {
        if (n < 10) {
            return (Math.round(n * 10000.0) / 10000.0) as T;
        } else if (n < 100) {
            return (Math.round(n * 1000.0) / 1000.0) as T;
        } else if (n < 1000) {
            return (Math.round(n * 100.0) / 100.0) as T;
        } else if (n < 10000) {
            return (Math.round(n * 10.0) / 10.0) as T;
        } else {
            return Math.round(n) as T;
        }
    }
}

export function formatIterations(iterations: i64): string {
    console.log("iterations: " + iterations.toString())
    let result = iterations.toString();
    const arr: string[] = [];
    // 12345
    const len = result.length;
    return arr.join(",");
}

export function numToRuntime(runtime: i32): string {
    if (runtime == 0) return "stub";
    if (runtime == 1) return "minimal";
    if (runtime == 2) return "incremental";
    return "";
}

export function freeMemory(): void {
    if (ASC_RUNTIME == Runtimes.Incremental || ASC_RUNTIME == Runtimes.Minimal) {
        // @ts-ignore
        __collect();
    } else if (ASC_RUNTIME == Runtimes.Stub) {
        // @ts-ignore
        __reset();
    }
}

export enum Runtimes {
    Stub,
    Minimal,
    Incremental
}