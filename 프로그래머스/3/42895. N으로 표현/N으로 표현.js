function solution(N, number) {
     if (number === 1) {
        return 1;
    }

    let setList = [];

    for (let cnt = 1; cnt <= 8; cnt++) {  // 1개부터 8개까지 확인
        let partialSet = new Set();
        partialSet.add(parseInt(N.toString().repeat(cnt)));  // 이어 붙여서 만드는 경우 넣기

        for (let i = 0; i < cnt - 1; i++) {  // (1, n-1) 부터 (n-1, 1)까지 사칙연산
            let set1 = Array.from(setList[i]);
            let set2 = Array.from(setList[cnt - i - 2]);

            for (let op1 of set1) {
                for (let op2 of set2) {
                    partialSet.add(op1 + op2);
                    partialSet.add(op1 * op2);
                    partialSet.add(op1 - op2);
                    if (op2 !== 0) {
                        partialSet.add(op1 / op2);
                    }
                }
            }
        }

        // 만든 집합에 number가 처음 나오는지 확인
        if (partialSet.has(number)) {
            return cnt;
        }

        setList.push(partialSet);
    }

    return -1;
}