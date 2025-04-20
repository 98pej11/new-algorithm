function solution(genres, plays) {
    var answer = [];
    
    let map = new Map();
    let playCnt = new Map();
    
    for(let i=0;i<genres.length;i++) {
        if(!map.has(genres[i])) {
            map.set(genres[i], []);
            playCnt.set(genres[i], 0);
        }
        map.get(genres[i]).push([i,plays[i]]);
        
        let cnt = playCnt.get(genres[i]) + plays[i];
        playCnt.set(genres[i], cnt);
    }
    
    playCnt = [...playCnt].sort((a, b) => b[1] - a[1]);
    
    
    for(let [k,v] of map) {
        let genre = k;
        let play = v;
        
        play.sort((a,b) => b[1]-a[1]);
    }
    
    for(let [genre, cnt] of playCnt) {
        let arr = map.get(genre);
        
        if(arr[0]) answer.push(arr[0][0]);
        if(arr[1]) answer.push(arr[1][0]);
    }
    
    return answer;
}