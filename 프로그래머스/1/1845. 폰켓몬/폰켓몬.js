function solution(nums) {
    let set = new Set();
    
    for(let num of nums) {
        set.add(num);
    }
    
    if(nums.length / 2 >= set.size) return set.size;
    else return nums.length / 2;
}