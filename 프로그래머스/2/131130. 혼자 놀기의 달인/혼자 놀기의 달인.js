function solution(cards) {
    let visited = new Array(cards.length).fill(false);
    let result = [];

    while(visited.filter(v => v === true).length < cards.length){
        let arr = [];

        for(let i = 0; i < cards.length; i++){
            if(!visited[i]){
                arr.push(i);
                visited[i] = true;
                break;
            }
        }

        while(cards[arr[arr.length - 1]] - 1 !== arr[0]){
            visited[cards[arr[arr.length - 1]] - 1] = true;
            arr.push(cards[arr[arr.length - 1]] - 1);
        }
        result.push(arr);
    }
    
    result.sort((a,b) => b.length - a.length);
    return result.length > 1 ? result[0].length * result[1].length : 0;
} 
