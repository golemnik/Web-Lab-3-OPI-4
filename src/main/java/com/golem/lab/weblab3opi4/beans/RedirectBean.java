package com.golem.lab.weblab3opi4.beans;

import jakarta.annotation.ManagedBean;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.Initialized;
import jakarta.enterprise.event.Observes;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import javax.management.*;
import java.io.IOException;
import java.lang.management.ManagementFactory;

@ManagedBean
@Named
public class RedirectBean implements RedirectMXBean {

    public void init(@Observes @Initialized(ApplicationScoped.class) Object unused) {
        try {
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


    public static void redirectEndless() throws IOException {
        FacesContext.getCurrentInstance()
                .getExternalContext()
                .redirect("http://localhost:8080/Endless-1.0-SNAPSHOT/");
    }
}
