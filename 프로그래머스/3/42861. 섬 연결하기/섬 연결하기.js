function solution(N, costs) {
    var answer = 0;

    const parent = Array.from({length: N+1}, (_,i) =>i);
    
    costs.sort((a,b) => a[2] - b[2]);
    
    for(let [u, v, cost] of costs) {
        if (findRoot(u) !== findRoot(v)) {  // 사이클 방지
            parent[findRoot(v)] = findRoot(u);
            answer += cost;
        }
    }
    
    function findRoot(x) {
        if (parent[x] === x) return x;
        return parent[x] = findRoot(parent[x]);
    }
    
    return answer;
}