function solution(info, n, m) {
    let answer = 0;
    const len = info. length;
    info.sort(([a, b], [c, d]) => c/d - a/b);
    
    let cntA = 0;
    let cntB = 0;
    
    for (let i=0;i<len;i++) {
        const [curA, curB] = info[i];
        if (cntB + curB < m) {
            cntB += curB;
        } else {
            cntA += curA;
        }
    }
    if (cntA >= n) answer = -1;
    else answer = cntA;
    
    return answer;
}