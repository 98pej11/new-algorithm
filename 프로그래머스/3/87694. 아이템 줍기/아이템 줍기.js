function solution(rectangle, characterX, characterY, itemX, itemY) {
    var answer = 0;
    const visited = Array.from({length: 101}, () => Array.from({length: 101}, () => 0));
    
    let recMap = rectangle.map(arr =>
      arr.map(elem => elem * 2)
    );
    characterX *= 2;
    characterY *= 2;
    itemX *= 2;
    itemY *= 2;
    
    // 안쪽부분만 1처리
    for(let i = 0;i < recMap.length;i++) {
        let item = recMap[i];
        for(let r = item[0]+1;r < item[2];r++) {
            for(let c = item[1]+1;c < item[3];c++){
                visited[r][c] = 1;
            }
        }
    }
    
    // 안쪽부분 아닐때만 2 처리
     for(let i=0;i<recMap.length;i++) {
        let item = recMap[i];
        for(let r=item[0];r<=item[2];r++) {
            if(visited[r][item[1]] !== 1) {
                visited[r][item[1]] = 2;
            }
            if(visited[r][item[3]] !== 1) {
                visited[r][item[3]] = 2;
            }
        }
        for(let c=item[1];c<=item[3];c++) {
            if(visited[item[0]][c] !== 1) {
                visited[item[0]][c] = 2;
            }
            if(visited[item[2]][c] !== 1) {
                visited[item[2]][c] = 2;
            }
        }
    }
    
    const q = new Queue();
    q.enqueue([characterX, characterY, 0]);
    
    let dr = [0,0,1,-1];
    let dc = [1,-1,0,0];
    
    while(q.size() > 0) {
        let item = q.dequeue();
        
        if(item[0] === itemX && item[1] === itemY) {
            return item[2] / 2;
        }
        
        for(let i=0;i<4;i++) {
            let nr = item[0] + dr[i];
            let nc = item[1] + dc[i];
            
            if(nr > 0 && nr <= 100 && nc > 0 && nc <= 100 && visited[nr][nc] === 2) {
                q.enqueue([nr,nc,item[2]+1]);
                visited[nr][nc] = 1;
            }
        }
    }

    return -1;
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