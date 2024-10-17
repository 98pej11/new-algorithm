function solution(progresses, speeds) {
    var answer = [];
    const queue = new Queue();
    
    for(let i=0;i<progresses.length;i++) {
        let cur = (100-progresses[i]) / speeds[i];;
        queue.enqueue(Math.ceil(cur)); 
    }
    
    console.log(queue);
    // [7,3,9,1,10]
    // [10,2,3]
    
    
    let cnt = 0;
    
    while(queue.size() > 0) {
        cnt++;
        let item = queue.peek();
        queue.dequeue();
        
        while(item >= queue.peek() && queue.size() > 0) {
            queue.dequeue();
            cnt++;
        }
        
        answer.push(cnt);
        cnt = 0;
    }
    
    return answer;
}

// queue class
class Queue {
  constructor() {
    this.storage = new Object();
    this.front = 0;
    this.rear = 0;
  }

  size() {
    return this.rear - this.front;
  }

  peek() {
      return this.storage[this.front];
  }
    
  enqueue(element) {
    this.storage[this.rear] = element;
    this.rear++;
  }

  dequeue() {
    let removed = this.storage[this.front];
    delete this.storage[this.front];
    this.front++;

    if (this.front === this.rear) {
      this.front = 0;
      this.rear = 0;
    }

    return removed;
  }
}