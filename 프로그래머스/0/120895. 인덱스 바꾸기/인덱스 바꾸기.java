import java.util.*;

class Solution {
    public String solution(String my_string, int num1, int num2) {
        String answer = "";
        char[] arr = my_string.toCharArray();
        
        char ch1 = arr[num1];
        char ch2 = arr[num2];
        
        arr[num1] = ch2;
        arr[num2] = ch1;
    
        return new String(arr);
    }
}