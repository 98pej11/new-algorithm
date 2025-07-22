function solution(sequence) {
    let max1 = -Infinity;
    let max2 = -Infinity;

    let sum1 = 0;
    let sum2 = 0;

    for (let i = 0; i < sequence.length; i++) {
        let key1 = i % 2 === 0 ? 1 : -1; // [1,-1,..]
        let key2 = i % 2 === 0 ? -1 : 1; // [-1,1,..]

        let multi1 = sequence[i] * key1;
        let multi2 = sequence[i] * key2;

        if (sum1 + multi1 > multi1) {
            sum1 += multi1;
        } else {
            sum1 = multi1;
        }

        if (sum1 > max1) {
            max1 = sum1;
        }

        if (sum2 + multi2 > multi2) {
            sum2 += multi2;
        } else {
            sum2 = multi2;
        }

        if (sum2 > max2) {
            max2 = sum2;
        }
    }

    return Math.max(max1, max2);
}
