function solution(info, edges) {
    let list = [];
    const N = info.length;
    const visited = Array(N).fill(false);

    visited[0] = true;
    DFS(1,0);
    
    return Math.max(...list);

    function DFS(sheep, wolf) {
        if(sheep <= wolf) return;
        list.push(sheep);

        for(let [parent, child] of edges) {
            if(visited[parent] && !visited[child]) {
                visited[child] = true;
                
                if(info[child] === 0) {
                    DFS(sheep+1, wolf);
                } else {
                    DFS(sheep, wolf+1);
                }
                visited[child] = false;
            }
        }
    }
}