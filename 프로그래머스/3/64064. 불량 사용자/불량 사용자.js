function solution(user_id, banned_id) {
    let result = [];
    let set = new Set();
    
    for(let item of banned_id) {
        let ids = [];
        
        for(let id of user_id) {
            if(item.length !== id.length) continue;
            let tf = true;
            for(let i = 0; i < id.length; i++) {
                if(item[i] === '*') continue;
                if(item[i] !== id[i]) {
                    tf = false;
                    break;
                }
            }
            if(tf) ids.push(id);
        }
        result.push(ids);
    }
    
    DFS(new Set(), 0);
    
    function DFS(curSet, index) {
        if(index === banned_id.length) {
            set.add([...curSet].sort().join(','));
            return;
        }

        for(let user of result[index]) {
            if(curSet.has(user)) continue;
            curSet.add(user);
            DFS(curSet, index + 1);
            curSet.delete(user);
        }
    }

    return set.size;
}
