function solution(n) {
    let arr = [];

    DFS("", 0, 0); 
    
    function DFS(str, open, close) {
        if (str.length === 2 * n) {
            arr.push(str);
            return;
        }

        if (open < n) {
            DFS(str + "(", open + 1, close);
        }
        if (close < open) {
            DFS(str + ")", open, close + 1);
        }
    }
    
    
    return arr.length;
}

