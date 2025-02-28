
class Solution {
    public int[] solution(int[] num_list) {
        int N = num_list.length;
        int[] answer = new int[N];
        
        // for(int item: num_list) {
        //     answer
        // }
        
        for(int i=0;i<N;i++) {
            answer[i] = num_list[N - i -1];
        }
        
        return answer;
    }
}