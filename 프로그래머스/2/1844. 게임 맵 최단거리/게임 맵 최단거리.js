function solution(maps) {
    var answer = 0;
    let N = maps.length;
    let M = maps[0].length;

    let dr = [0,0,1,-1];
    let dc = [1,-1,0,0];
    
    function BFS() {
        const queue = [[0,0,1]];
        maps[0][0] = 0;
        
        while(queue.length > 0) {
            const item = queue.shift();
            
            if (item[0] === N-1 && item[1] === M-1) {
                return item[2];
            }

            for(let i=0;i<4;i++) {
                const nr = item[0] + dr[i];
                const nc = item[1] + dc[i];
                const cnt = item[2] + 1;
                
                if(nr >= 0 && nr < N && nc >= 0 && nc < M && maps[nr][nc] !== 0) {
                    queue.push([nr,nc,cnt]);
                    maps[nr][nc] = 0;
                }
            }
        }
        return -1;
    }
    
    return BFS();
}