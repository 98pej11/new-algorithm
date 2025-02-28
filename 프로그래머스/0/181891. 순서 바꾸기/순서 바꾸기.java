import java.util.*;

class Solution {
    public int[] solution(int[] num_list, int n) {
        int[] answer = {};
        
        int[] newArr1 = new int[n]; // 앞
        int[] newArr2 = new int[num_list.length-n]; // 뒤
        
        newArr1 = Arrays.copyOfRange(num_list, 0, n);
        newArr2 = Arrays.copyOfRange(num_list, n, num_list.length);
        
        System.out.println(Arrays.toString(newArr1));
        System.out.println(Arrays.toString(newArr2));
        
        for(int i=0;i<newArr2.length;i++) {
            num_list[i] = newArr2[i];
        }
        for(int i=0;i<newArr1.length;i++) {
            num_list[newArr2.length+i] = newArr1[i];
        }
        
        return num_list;
    }
}