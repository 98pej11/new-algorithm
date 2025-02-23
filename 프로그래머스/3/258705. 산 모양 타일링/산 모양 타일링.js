function solution(n, tops) {
    const N = tops.length;
    const dpA = new Array(N).fill(0);
    const dpB = new Array(N).fill(0);
    
    // 삼각형의 경우
    if(tops[0]===1) {
        dpA[0] = 3;
        dpB[0] = 1;
    }
    // 사다리꼴의 경우        
    else {
        dpA[0] = 2;
        dpB[0] = 1;
    }
    
    for(let i=1;i<N;i++) {
        // 삼각형의 경우
        if(tops[i]===1) {
            dpA[i] = dpA[i-1]*3 + dpB[i-1]*2;
            dpB[i] = dpA[i-1] + dpB[i-1];
        }
        // 사다리꼴의 경우
        else {
            dpA[i] = dpA[i-1]* 2 + dpB[i-1];
            dpB[i] = dpA[i-1] + dpB[i-1];
        }
        
        dpA[i] %= 10007;
        dpB[i] %= 10007;
    }
    
    return (dpA[N-1] + dpB[N-1]) % 10007;
}