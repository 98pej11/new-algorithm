function solution(word) {
    let answer = 0;
    let count = 0;
    let text = "AEIOU";
    let visited = Array.from({length: word.length}, ()=>false);
    
    dfs('', text, 0);
    
  
    function dfs(fixed, list) {
        if(fixed === word) {
            answer = count;
            return;
        }

        for(let i=0;i<list.length;i++) {
            if(!visited[i] && fixed.length < 5) {
                count++;
                dfs(fixed + list[i], list);
            }
        }
    }
    
    return answer;
}