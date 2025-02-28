import java.util.*;

class Solution {
    public int[] solution(int[] arr) {
        int N = arr.length;
        
        while(!is2k(N)) {
            N++;
        }

        int[] answer = new int[N];
        for(int i=0;i<arr.length;i++){
            answer[i] = arr[i];
        }
        for(int i=arr.length;i<N;i++){
            answer[i] = 0;
        }
        return answer;
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