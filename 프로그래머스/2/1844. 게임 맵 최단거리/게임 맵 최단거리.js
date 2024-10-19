function solution(maps) {
    var answer = 0;
    let N = maps.length;
    let M = maps[0].length;
    
    let dr = [0,0,1,-1];
    let dc = [1,-1,0,0];
    
    // BFS(0,0);
    
    function BFS() {
        const q = new Queue();
        q.enqueue([0,0,1]);
        
        while(q.size() > 0) {
            let item = q.dequeue();
            
            if(item[0] === N-1 && item[1] === M-1) return item[2];
            for(let i=0;i<4;i++) {
                let nr = item[0] + dr[i];
                let nc = item[1] + dc[i];
                
                if(nr >= 0 && nr < N && nc >= 0 && nc < M && maps[nr][nc] === 1) {
                    q.enqueue([nr,nc,item[2] + 1]);
                    maps[nr][nc] = 0;
                }
            }
        }
        return -1;
    }
    
    
    return BFS();
}

class Queue {
    constructor() {
        this.storage = {};
        this.front = 0;
        this.rear = 0;
    }
    
    size() {
        return this.rear - this.front;
    }
    
    enqueue(item) {
        this.storage[this.rear] = item;
        this.rear++;
    }
    
    dequeue() {
        let item = this.storage[this.front];
        delete this.storage[this.front];
        this.front++;
        return item;
    }
}







// function solution(maps) {
//     var answer = 0;
//     let N = maps.length;
//     let M = maps[0].length;

//     let dr = [0,0,1,-1];
//     let dc = [1,-1,0,0];
    
//     function BFS() {
//         const queue = [[0,0,1]];
//         maps[0][0] = 0;
        
//         while(queue.length > 0) {
//             const item = queue.shift();
            
//             if (item[0] === N-1 && item[1] === M-1) {
//                 return item[2];
//             }

//             for(let i=0;i<4;i++) {
//                 const nr = item[0] + dr[i];
//                 const nc = item[1] + dc[i];
//                 const cnt = item[2] + 1;
                
//                 if(nr >= 0 && nr < N && nc >= 0 && nc < M && maps[nr][nc] !== 0) {
//                     queue.push([nr,nc,cnt]);
//                     maps[nr][nc] = 0;
//                 }
//             }
//         }
//         return -1;
//     }
    
//     return BFS();
// }