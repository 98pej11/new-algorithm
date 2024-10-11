function solution(numbers, target) {
    var answer = 0;
    
    dfs(numbers, 0);
    
    function dfs(list, idx) {
        if(idx === list.length) {
            let sum = 0;
            for(let item of list) {
                sum += item;
            }
            if(sum === target) answer++;
            return;
        }

        dfs(list, idx+1);
        list[idx] *= -1;
        dfs(list, idx+1);
    }
    
    return answer;
}