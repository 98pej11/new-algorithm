function solution(people, limit) {
    var answer = 0;
    
    people.sort((a,b)=>a-b);
    
    const q = new Queue();
    
    for(let i=0;i<people.length;i++) {
        q.enqueue(people[i]);
    }
    
    while(q.size() > 0) {
        let sum = q.pop();
        
        if(sum + q.storage[q.front] <= limit) {
            sum += q.dequeue();
        }

        answer++;
    }
    
    return answer;
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
    pop() {
        let item = this.storage[this.rear-1];
        delete this.storage[this.rear-1];
        this.rear--;
        
        return item;
    }
}