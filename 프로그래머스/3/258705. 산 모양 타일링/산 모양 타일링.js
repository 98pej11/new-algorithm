function solution(n, tops) {
    var answer = 0;
    
    /* 점화식처럼 각 케이스별로 생각 */
    // 변 위에 삼각형이 있는 경우 o
    // 큰 삼각형에 마름모가 들어갈수있는 케이스 생각하면 4가지가 나옴 (마름모 3 + 마름모가 없는 경우)
    // 변 위에 삼각형이 없는 경우 x
    // 큰 삼각형에 마름모가 들어갈수있는 케이스 생각하면 3가지가 나옴 (마름모 2 + 마름모가 없는 경우)
    
    // 큰 삼각형 두개가 붙어있을 경우 겹치는곳에 마름모가 들어가게 되면 옆 삼각형에 영향을 줌
    // dp 배열을 각각 선언 dp1 (안 겹치는 케이스). dp2 (겹치는 케이스)
    // 
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