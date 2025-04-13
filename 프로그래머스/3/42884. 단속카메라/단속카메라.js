function solution(routes) {
    routes.sort((a,b) => a[0] - b[0]);
    
    let camera = 1;
    let cur = routes[0][1];
    
    for(let i=1;i<routes.length;i++) {
        if(routes[i][0] <= cur) {
            if(routes[i][1] >= cur) continue;
            else cur = routes[i][1];
        }
        else {
            cur = routes[i][1];
            camera++;
        }
    }
    
    return camera;
}