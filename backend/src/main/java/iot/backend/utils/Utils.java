package iot.backend.utils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Utils {
    public static List<Integer> formateDateString(String date){
        int start = 0;
        List<Integer> result = new ArrayList<>();
        for (int i = 0 ; i < date.length(); i++){
            if (date.charAt(i) == '-') {
                result.add(Integer.parseInt((date.substring(start, i))));
                start = i + 1;
            }   
        }
        result.add(Integer.parseInt((date.substring(start))));
        return result;
    }

    public static LocalDate defaultPeriod(){
       return LocalDate.now().minusDays(30); 
    }
}
