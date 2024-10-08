function solution(word) {
    let answer = 0;
    let cnt = -1;
    const dic = ['A','E','I','O','U'];
    
    dfs('', 0);
    
    function dfs(select) {
        cnt++;
        
        if(select === word) {
            answer = cnt;
            return;
        }
        if(select.length === 5) return;
        
        for(let i=0;i<dic.length;i++) {
             dfs(select + dic[i]);
        }
    }
    
    return answer;
}