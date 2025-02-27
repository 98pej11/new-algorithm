import java.util.*;
import java.io.*;

class Solution {
    public long solution(int n, int[] times) {
        long answer = 0;
        long min = Arrays.stream(times).min().getAsInt();
        long max = (long)Arrays.stream(times).max().getAsInt()*n;

        while(min <= max) {
            long mid = (min + max) / 2;
            
            long sum = 0;
            for(int t: times) {
                sum += mid / t;
            }
            
            if(sum >= n) {
                max = mid-1;
                answer = mid;
            }
            else min = mid+1;
        }
        
        return answer;
    }
}