import java.util.*;

class Solution {
    public int solution(int[] numbers) {
        Integer[] arr = new Integer[numbers.length];
        for(int i=0; i<numbers.length; i++) arr[i]=numbers[i];
        Arrays.sort(arr, (a,b)->b-a);
        System.out.println(Arrays.toString(arr));
        
        // int num1 = 0;
        // int num2 = 0;
        
        // if(arr[0] >= 0 && arr[1] >= 0) num1 = arr[0]*arr[1];
        // if(arr[arr.length-1] <= 0 && arr[arr.length - 2] <= 0) num2 = arr[arr.length-1]*arr[arr.length - 2];
        return Math.max(arr[0]*arr[1], arr[arr.length-1]*arr[arr.length - 2]);
    }
}