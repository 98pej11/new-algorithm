class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) { return Math.floor((i - 1) / 2); }
  getLeftChildIndex(i) { return i * 2 + 1; }
  getRightChildIndex(i) { return i * 2 + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] > this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  deleteMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }
}


function solution(operations) {
    const heap = new MinHeap();
    
    for(let ope of operations) {
        let [M, num] = ope.split(" ");
        num = parseInt(num);
        
        if(M === 'I') {
            heap.insert(num);
        } else {
            if(heap.heap.length === 0) continue;
            if(num === -1) {
                heap.deleteMin();
            }  else {
                heap.heap.sort((a,b) => a-b);
                heap.heap.pop();
            }
        }
    }
    
    // heap.heap.sort((a,b) => a-b);
    if(heap.heap.length === 0) return [0,0];
    else return [Math.max(...heap.heap), Math.min(...heap.heap)];
}