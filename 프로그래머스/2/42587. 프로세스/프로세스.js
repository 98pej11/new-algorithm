function solution(priorities, location) {
    var answer = [];
    
    const queue = new Queue();
    const stack = [...priorities];
    
    stack.sort();
 
    // console.log(max);
    
    // 숫자가 클 수록 우선순위 높음

    for(let i=0;i<priorities.length;i++) {
        queue.enqueue(String.fromCharCode(65 + i));
    }
    
    console.log(queue);
    
    // [a,b,c,d] -> queue
    // [2,1,3,2] -> pro
    // [1,2,2,3]
    
    while(queue.size() > 0){
        let idx = queue.storage[queue.front].charCodeAt(0) - 65;
        
        console.log(idx,priorities[idx],stack[stack.length-1] );
         if(priorities[idx] < stack[stack.length-1]) {
            let item = queue.dequeue();
            queue.enqueue(item);
        }
        else {
            stack.pop(); // 최댓값 빼기
            answer.push(queue.dequeue());
        };
    }

     console.log(answer);
   
    for(let i=0;i<answer.length;i++) {
        console.log(String.fromCharCode(65+location));
        if(String.fromCharCode(65+location) === answer[i]) return i+1;
    }
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

    dequeue(item) {
        let removed = this.storage[this.front];
        delete this.storage[this.front];
        this.front++;
        
        if(this.front === this.rear) {
            this.front = 0;
            this.rear = 0;
        }
        
        return removed;
    }
}