package com.golem.lab.weblab3opi4.beans;

import com.golem.lab.weblab3opi4.data.Dot;
import com.golem.lab.weblab3opi4.hiber.DotManager;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Named;

import javax.management.*;
import java.lang.management.ManagementFactory;
import java.text.Collator;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.max;
import static java.util.Collections.min;

@ManagedBean
@ApplicationScoped
@Named
public class ResultBean extends NotificationBroadcasterSupport  implements ResultMXBean{

    public void init(@Observes @Initialized(ApplicationScoped.class) Object unused) {
        try{
            String domain = this.getClass().getPackageName();
            String type = this.getClass().getSimpleName();
            ObjectName objectName = new ObjectName(String.format("%s:type=%s,name=%s", domain, type, type));
            ManagementFactory.getPlatformMBeanServer().registerMBean(this, objectName);
            System.out.println("reged " + type);
        } catch (InstanceAlreadyExistsException | MBeanRegistrationException | NotCompliantMBeanException |
                 MalformedObjectNameException ex) {
            ex.printStackTrace();
        }
    }

    private DotManager manager = new DotManager();
    private Dot newDot = new Dot();
    private int failedAttempts = 0;
    private int sequenceNumber = 1;

    private List<Dot> dots = manager.getDots();

    public List<Dot> getDots() {
        return this.dots;
    }

    public void setNewDot(Dot newDot) {
        this.newDot = newDot;
    }

    public Dot getNewDot() {
        return newDot;
    }

    public void addDot () {

        newDot.setHit(checkHit(newDot.getX(), newDot.getY(), newDot.getR()));
        newDot.setTime(new Date());
        manager.addDot(newDot);

        if (!newDot.getHit()) {
            failedAttempts++;
        }
        else {
            failedAttempts = 0;
        }

        if (failedAttempts == 4) {
            Notification notification = new Notification(
                    "Four failed attempts",
                    getClass().getSimpleName(),
                    sequenceNumber++,
                    "User has made four failed attempts in a row!"
            );
            sendNotification(notification);
        }
        newDot = new Dot();
        this.dots = manager.getDots();
    }

    private boolean checkHit (double x, double y, double r) {
        return x >= 0
                    ? y >= 0
                        ? -x + r > y
                        : false
                    : y >= 0
                        ? x*x + y*y <= r*r
                        : x >= -r/2 && y >= -r;
    }

    public void clear () {
        manager.clearDots();
    }

    public String getJsArray() {
        List<Dot> dots = this.dots;
        if (dots == null) {
            return "[]";
        }
        StringBuilder dr = new StringBuilder("[");
        for (Dot dot : dots) {
            dr.append("{")
                    .append("x:").append(dot.getX())
                    .append(",y:").append(dot.getY())
                    .append(",r:").append(dot.getR())
                    .append(",hit:").append(dot.getHit())
                    .append("},");
        }
        dr.append("]");
        return dr.toString();
    }

    @Override
    public MBeanNotificationInfo[] getNotificationInfo() {
        String[] types = new String[] { AttributeChangeNotification.ATTRIBUTE_CHANGE };
        String name = AttributeChangeNotification.class.getName();
        String description = "User has made 4 failed attempts in a row!";
        MBeanNotificationInfo info = new MBeanNotificationInfo(types, name, description);
        return new MBeanNotificationInfo[] { info };
    }

    public int countDots() {
        return this.dots.size();
    }

    public int countSuccessDots() {
        return this.dots.stream().filter(Dot::getHit).toList().size();
    }



    public double midTime() {
        List<Dot> dots = this.dots;
        List<Long> delts = new ArrayList<>();
        if (!dots.isEmpty()) {
            for (Dot dot : dots) {
                delts.add(dot.getTime().toInstant().getEpochSecond());
            }
            Long mx = max(delts);
            Long mn = min(delts);
            return (double) (mx - mn) / delts.size();
        }
        return 0;
    }

}
