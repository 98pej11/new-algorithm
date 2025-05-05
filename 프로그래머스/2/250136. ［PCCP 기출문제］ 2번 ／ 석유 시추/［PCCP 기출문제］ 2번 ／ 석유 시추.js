function solution(land) {
    let dir = [[0,1], [0,-1], [1,0], [-1,0]];
    let queue = [];
    let list = [];
    
    let N = land.length;
    let M = land[0].length;
    let result = Array(M).fill(0);
    
    for(let i=0;i<N;i++) {
        for(let j=0;j<M;j++) {
            if(land[i][j] === 1) {
                list = [];
                land[i][j] = -1;
                queue.push([i,j]);
                list.push([i,j]);
                
                let cost = BFS();
                let visited = Array(M).fill(false);
                for(let item of list) {
                    let r = item[0];
                    let c = item[1];
                    
                    if(!visited[c]) {
                        visited[c] = true;
                        result[c] += cost;
                    }
                    
                    land[r][c] = cost;
                }
            }
        }
    }
 
    let max = 0;
    
    for(let i=0;i<M;i++) {
        max = Math.max(max, result[i]);
    }
    
    return max;
    
    function BFS(){
       let cost = 1;
        
       while(queue.length) {
         let cur = queue.pop();

         for(let [dr,dc] of dir) {
           let nr = cur[0]+dr;
           let nc = cur[1]+dc;
          
           if(nr >=0 && nr < N && nc >=0 && nc < M && land[nr][nc] === 1) {
               land[nr][nc] = -1;
               cost++;
               queue.push([nr,nc]);
               list.push([nr,nc]);
           }
         }
       }
        
       return cost;
    } 
}