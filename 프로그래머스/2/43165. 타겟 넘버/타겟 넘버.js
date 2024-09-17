function solution(numbers, target) {
    let answer = 0;
    let N = numbers.length;
    let signList = [];
    
    dfs('', 0);
    
    function dfs (list, count) {
        if(count === N) {
            let calcRes = calc(list);
            if(calcRes === target) answer++;
            return;
        }
        // 배열에 이렇게 추가해도되는지
        dfs(list+'+', count+1, N);
        dfs(list+'-', count+1, N);
    }
    
    function calc (list) {
        let res = 0;
        // N 다 쓸수잇는지
        for(let i=0;i<N;i++) {
            if(list[i] === '+') res += numbers[i];
            else res -= numbers[i];
        }
        
        return res;
    }
    return answer;
}