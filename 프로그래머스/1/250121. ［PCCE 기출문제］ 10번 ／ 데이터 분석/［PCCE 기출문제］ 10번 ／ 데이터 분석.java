import java.util.*;

class Solution {
    public int[][] solution(int[][] data, String ext, int val_ext, String sort_by) {
        List<int[]> list = new ArrayList<>();
        
        int idx = -1;
        int sortIdx = -1;
        
        if(ext.equals("code")) idx = 0;
        else if(ext.equals("date")) idx = 1;
        else if(ext.equals("maximum")) idx = 2;
        else if(ext.equals("remain")) idx = 3;
        
        if(sort_by.equals("code")) sortIdx = 0;
        else if(sort_by.equals("date")) sortIdx = 1;
        else if(sort_by.equals("maximum")) sortIdx = 2;
        else if(sort_by.equals("remain")) sortIdx = 3;
        
        int aa = sortIdx;
        
        for(int i=0;i<data.length;i++) {
            if(data[i][idx] < val_ext) list.add(data[i]);
        }

        list.sort((a,b) -> a[aa] - b[aa]);

        return list.toArray(int[][]::new);
    }

}