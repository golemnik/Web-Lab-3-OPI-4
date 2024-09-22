package com.golem.lab.weblab3opi4.hiber;

import com.golem.lab.weblab3opi4.data.Dot;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import java.util.List;

public class DotManager {
    public DotManager () {
    }

    public List<Dot> getDots () {
        try (Session session = HiberFactory.getSessionFactory().openSession()) {
            Query<Dot> query = session.createQuery("from Dot", Dot.class);
            return query.getResultList();
        }
        catch (Exception e) {
            return null;
        }
    }

    public void addDot (Dot dot) {
        try (Session session = HiberFactory.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(dot);
            transaction.commit();
        }
    }

    public void clearDots () {
        try (Session session = HiberFactory.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            for(Dot dot : getDots()) {
                session.remove(dot);
            }
            transaction.commit();
        }
    }
}
