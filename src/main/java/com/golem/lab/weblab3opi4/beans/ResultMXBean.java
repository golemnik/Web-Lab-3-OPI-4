package com.golem.lab.weblab3opi4.beans;

import com.golem.lab.weblab3opi4.data.Dot;

import javax.management.MBeanNotificationInfo;
import java.util.List;

public interface ResultMXBean {
    List<Dot> getDots();

    void setNewDot(Dot newDot);

    Dot getNewDot();

    void addDot ();

    void clear ();

    String getJsArray();

    int countDots();

    int countSuccessDots();

    double midTime();
}
