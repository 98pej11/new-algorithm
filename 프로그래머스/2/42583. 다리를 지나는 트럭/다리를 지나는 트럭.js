function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    
    const q = new Queue();
    
    let sum = truck_weights[0]; // 무게합
    q.enqueue(truck_weights.shift());
    
    let result = 0;
    
    // 4, 10, [3,7,7,1]
    while(sum > 0) { // 7
        result++; 
        if(result >= bridge_length) {
            sum -= q.dequeue();
        }
        // console.log(truck_weights[0]);
        if(sum + truck_weights[0] <= weight) {
            sum += truck_weights[0];
            q.enqueue(truck_weights.shift());
            
        }
        else{
            q.enqueue(0);
        }
    }
    return result + 1;
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
    count() {
        let sum = 0;
        for(let i=0;i<this.storage.length;i++) {
            sum+=this.storage[i];
        }
        return sum;
    }
    enqueue(item) {
        this.storage[this.rear] = item;
        this.rear++;
    }
    dequeue() {
        let removed = this.storage[this.front];
        delete this.storage[this.front];
        this.front++;
        
        return removed;
    }
}
