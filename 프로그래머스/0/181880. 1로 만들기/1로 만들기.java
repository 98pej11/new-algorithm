class Solution {
    public int solution(int[] num_list) {
        int answer = 0;
        
        for(int item: num_list) {
            while(item > 1) {
                item = item / 2;
                answer++;
            }
        }
        return answer;
    }
}