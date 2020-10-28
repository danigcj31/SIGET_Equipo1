package com.app.SIGET.dominio;

import java.time.LocalTime;
import java.util.concurrent.atomic.AtomicInteger;

import org.json.JSONObject;

public class Actividad {
	private static final AtomicInteger count = new AtomicInteger(1);
	private int id;
	private String name;
	private DiaSemana dia;
	private LocalTime horaI;
	private LocalTime horaF;
	
	public Actividad(String name, DiaSemana dia, LocalTime horaI, LocalTime horaF) {
		this.id = count.incrementAndGet();
		this.name = name;
		this.dia = dia;
		this.horaI = horaI;
		this.horaF = horaF;
	}

	public Actividad(int id, String name, DiaSemana dia, LocalTime horaI, LocalTime horaF) {
		this.id = id;
		this.name = name;
		this.dia = dia;
		this.horaI = horaI;
		this.horaF = horaF;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public DiaSemana getDia() {
		return this.dia;
	}

	public void setFecha(DiaSemana dia) {
		this.dia = dia;
	}
	
	public LocalTime getHoraI() {
		return this.horaI;
	}

	public void setHoraI(LocalTime horaI) {
		this.horaI = horaI;
	}
	
	public LocalTime getHoraF() {
		return this.horaF;
	}

	public void setHoraF(LocalTime horaF) {
		this.horaF = horaF;
	}

	public int getId() {
		return this.id;
	}
	
	public JSONObject toJSON() {
        JSONObject jso = new JSONObject();
        jso.put("id", this.getId());
        jso.put("name", this.getName());
        jso.put("dia", this.getDia());
        jso.put("HoraI", this.getHoraI());
        jso.put("HoraF", this.getHoraF());
        return jso;
    }

}
