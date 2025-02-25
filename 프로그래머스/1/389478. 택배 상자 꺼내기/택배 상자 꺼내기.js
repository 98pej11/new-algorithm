function solution(n, w, num) {
    let N = parseInt(n/w) + 1; // 4
    let arr = Array.from({length: N}, () => Array(w).fill(-1));
    let start = 1;
    let [r,c] = [0,0];
    
    for(let i=0;i<N;i++) {
        if(i % 2 === 0) {
            for(let j=0;j<w;j++) {
                arr[i][j] = start;
                if(start === num) {
                    [r,c] = [i,j];
                }
                start++;
            }
        }
        else {
            for(let j=0;j<w;j++) {
                arr[i][w-j-1] = start;
                if(start === num) {
                    [r,c] = [i,w-j-1];
                }
                start++;
            }
        }
        
    }
    // console.log(r,c);
    
    let answer = 1;
    
    for(let i=r+1;i<N;i++) {
        if(arr[i][c] <= n && arr[i][c] > 0) answer++;
    }

    return answer;
}