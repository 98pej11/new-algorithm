import java.util.*;

class Solution {
    public int[] solution(int[] arr) {
        int N = arr.length;
        
        while(!is2k(N)) {
            N++;
        }

        return Arrays.copyOfRange(arr, 0, N);
    }
    
    public boolean is2k(int n){
        if(n == 1) return true;
        while(n%2==0){
            n/=2;
            if(n==1) return true;
        }
        return false;
    }
}