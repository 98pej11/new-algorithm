import java.util.*;

class Solution {
    public int solution(int[] numbers) {
        Integer[] arr = new Integer[numbers.length];
        
        for(int i=0; i<numbers.length; i++) arr[i]=numbers[i];
        Arrays.sort(arr, (a,b)->b-a);

        return Math.max(arr[0]*arr[1], arr[arr.length-1]*arr[arr.length - 2]);
    }
}