function solution(begin, target, words) {
    const visited = Array.from({length: words.length}, () => false);
    let min = Infinity;
    
    dfs(begin, 0);
    
    function dfs(word, count) {
        if(word === target) {
            min = Math.min(min, count);
            return;
        }

        for(let i=0;i<words.length;i++) {
            if(!visited[i]){
                let same = 0;
                
                for(let j=0;j<begin.length;j++) {
                   if(word[j] === words[i][j]) same++;
                }
                if(same === begin.length - 1) {
                    visited[i] = true;
                    dfs(words[i], count+1);
                    visited[i] = false;
                }
            }
        }
    }
    return min === Infinity ? 0 : min;
}