package com.golem.lab.weblab3opi4.beans;

import com.golem.lab.weblab3opi4.data.Dot;
import com.golem.lab.weblab3opi4.hiber.DotManager;
import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.util.List;

@ManagedBean
@ApplicationScoped
@Named
public class ResultBean {
    private DotManager manager = new DotManager();
    private Dot newDot = new Dot();

    public List<Dot> getDots() {
        return manager.getDots();
    }

    public void setNewDot(Dot newDot) {
        this.newDot = newDot;
    }

    public Dot getNewDot() {
        return newDot;
    }

    public void addDot () {
        newDot.setHit(checkHit(newDot.getX(), newDot.getY(), newDot.getR()));
        manager.addDot(newDot);
        newDot = new Dot();
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
        List<Dot> dots = manager.getDots();
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
}
