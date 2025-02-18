function solution(N, costs) {
    var answer = 0;

    const parent = Array.from({length: N+1}, (_,i) =>i);
    
    function find(x) {
        if (parent[x] === x) return x;
        return parent[x] = find(parent[x]);
    }

    function union(a, b) {
        const rootA = find(a);
        const rootB = find(b);
        if (rootA !== rootB) parent[rootB] = rootA;
    }
    
    costs.sort((a,b) => a[2] - b[2]);
    for(let [u, v, cost] of costs) {
        if (find(u) !== find(v)) {  // 사이클 방지
            union(u, v);
            answer += cost;
        }
    }
    return answer;
}