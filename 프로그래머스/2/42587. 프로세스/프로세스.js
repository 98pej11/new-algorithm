function solution(priorities, location) {
    var answer = [];
    
    const queue = new Queue();
    const stack = [...priorities];
    
    stack.sort();

    for(let i=0;i<priorities.length;i++) {
        queue.enqueue(String.fromCharCode(65 + i));
    }
    
    while(queue.size() > 0){
        let idx = queue.storage[queue.front].charCodeAt(0) - 65;
        
         if(priorities[idx] < stack[stack.length-1]) {
            let item = queue.dequeue();
            queue.enqueue(item);
        }
        else {
            stack.pop();
            answer.push(queue.dequeue());
        };
    }
   
    for(let i=0;i<answer.length;i++) {
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