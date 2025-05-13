// 25분 + 3시 35분
function solution(storage, requests) {
    let N = storage.length;
    let M = storage[0].length;
    
    let direction = [[0,1],[0,-1], [1,0], [-1,0]];
    
    const map = Array.from({length: N+2}, () => Array.from({length: M+2}, () => -1));
    
    for(let i=1;i<=N;i++) {
        for(let j=1;j<=M;j++) {
            map[i][j] = storage[i-1][j-1];
        }
    }

    for(let req of requests) {
        if(req[1]) {
            removeAllItem(req[1]);
        }
        else {
            removeOutlineItem(req[0]);
        }
    }
    
    let result = 0;
    
    for(let i=1;i<=N;i++) {
        for(let j=1;j<=M;j++) {
            if(map[i][j] !== -1) result++;
        }
    }
    
     return result;
    
     function removeOutlineItem(ch) {
         let list = [];
         
         for(let i=1;i<=N;i++) {
            for(let j=1;j<=M;j++) {
                if(map[i][j] === ch) {
                   if(BFS(i,j)) list.push([i,j]);
                }
            }
        }

        for(let [r,c] of list) {
            map[r][c] = -1;
        }
    }
    
    function removeAllItem(ch) {
        for(let i=1;i<=N;i++) {
            for(let j=1;j<=M;j++) {
                if(map[i][j] === ch) {
                    map[i][j] = -1;
                }
            }
        }
    }
    
    function BFS(r,c) {
        let queue = [[r,c]];
        let visited = Array.from({length: N+2}, () => Array.from({length: M+2}, () => false));
        visited[r][c] = true;
        
        while(queue.length) {
            let [r,c] = queue.shift();
            
            if(r === 0 || r === N+1 || c === 0 || c === M+1) {
                return true;
            }
            
            for(let [dr,dc] of direction) {
                let nr = r+dr;
                let nc = c+dc;

                if(nr >=0 && nr <= N+1  && nc >=0 && nc <= M+1 && map[nr][nc] === -1 && !visited[nr][nc]) {
                    queue.push([nr,nc]);
                    visited[nr][nc] = true;
                }
            }
        }

        return false;
    }
}