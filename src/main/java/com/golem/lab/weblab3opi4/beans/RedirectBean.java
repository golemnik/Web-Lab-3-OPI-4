package com.golem.lab.weblab3opi4.beans;

import jakarta.annotation.ManagedBean;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import java.io.IOException;

@ManagedBean
@Named
public class RedirectBean {
    public static void redirectEndless() throws IOException {
        FacesContext.getCurrentInstance()
                .getExternalContext()
                .redirect("http://localhost:8080/Endless-1.0-SNAPSHOT/");
    }
}
