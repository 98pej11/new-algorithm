function solution(edges) {
    class Node {
        constructor(i,o) {
            this.in = i;
            this.out = o;
        }
    }
    const map = new Map();
    
    for(let i=0;i<edges.length;i++) {
        const [u,v] = [edges[i][0], edges[i][1]];
        
        if(!map.has(u)) {
            map.set(u, new Node(0,1));
        }
        else {
            map.get(u).out++;
        }
        
         if(!map.has(v)) {
            map.set(v, new Node(1,0));
        }
        else {
            map.get(v).in++;
        }
        
        
    }
    
    let answer = [0,0,0,0];
    
    for(const [k,v] of map) {
        if(v.in === 0 && v.out > 1) answer[0] = k;
        else if(v.out === 0) answer[2]++;
        else if(v.in >= 2 && v.out == 2) answer[3]++;
    }
    
    answer[1] = map.get(answer[0]).out - answer[2] - answer[3];
    return answer;
}