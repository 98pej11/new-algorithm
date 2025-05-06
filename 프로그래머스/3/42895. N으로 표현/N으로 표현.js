function solution(N, number) {
    let setList = [];

    for (let i = 1; i <= 8; i++) {  
        let set = new Set();
        set.add(parseInt(N.toString().repeat(i)));

        // i=4, j=0,1,2
        for (let j = 0; j < i - 1; j++) {
            let set1 = Array.from(setList[j]);
            let set2 = Array.from(setList[i - j - 2]);

            for (let op1 of set1) {
                for (let op2 of set2) {
                    set.add(op1 + op2);
                    set.add(op1 * op2);
                    set.add(op1 - op2);
                    if (op2 !== 0) {
                        set.add(op1 / op2);
                    }
                }
            }
        }

        // 만든 집합에 number있으면 return
        if (set.has(number)) return i;

        setList.push(set);
    }

    return -1;
}