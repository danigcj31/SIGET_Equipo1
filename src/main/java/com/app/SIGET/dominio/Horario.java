package com.app.SIGET.dominio;

import java.time.LocalTime;

import org.json.JSONArray;
import org.json.JSONObject;

public class Horario {

	private int[][] matrizHorario;
	private static final int DIAS = 7;
	private static final int HUECOS = 48;

	// As� se crea una actividad ahora
	// actividad r = new actividad("Daily", DayOfWeek.MONDAY, LocalTime.of(9, 00),
	// LocalTime.of(9, 30));

	public Horario() {

		this.matrizHorario = new int[DIAS][HUECOS];

		for (int x = 0; x < this.matrizHorario.length; x++) {
			for (int y = 0; y < this.matrizHorario[x].length; y++) {
				this.matrizHorario[x][y] = 0;
			}
		}
	}

	public static Horario String2Horario(String hor) {
		
		JSONArray jsa = new JSONArray(hor);
		JSONArray aux;
		JSONObject jso;

		Horario horario = new Horario();
		
		for(int x = 0; x < jsa.length(); x++) {
			aux = (JSONArray) jsa.get(x);
			for(int y = 0; y < aux.length(); y++) {
				jso = (JSONObject) aux.get(y);
				horario.matrizHorario[x][y] = (int) jso.get(String.valueOf(y));
			}
		}

		return horario;
	}

	public JSONArray toJSON() {

		JSONArray jsa = new JSONArray();
		JSONArray aux;
		JSONObject jso;

		for (int x = 0; x < DIAS; x++) {
			aux = new JSONArray();
			for (int y = 0; y < HUECOS; y++) {
				jso = new JSONObject();
				jso.put(String.valueOf(y), this.matrizHorario[x][y]);
				aux.put(y, jso);
			}
			jsa.put(x, aux);
		}

		return null;
	}

	public String toString() {
		return this.toJSON().toString();
	}

	public void insertarActividad(Actividad actividad) {

		for (int i = Horario.calcularIndice(actividad.getHoraI()); i < Horario
				.calcularIndice(actividad.getHoraI()); i++) {
			this.matrizHorario[actividad.getDia().getValue()][i] = actividad.getId();
		}
	}

	private static int calcularIndice(LocalTime time) {
		return (time.getHour() - 1) * 2 + (time.getMinute() / 30);
	}

	public boolean estaOcupado(Actividad actividad) {
		for (int i = Horario.calcularIndice(actividad.getHoraI()); i < Horario
				.calcularIndice(actividad.getHoraI()); i++) {
			if (this.matrizHorario[actividad.getDia().getValue()][i] != 0) {
				return true;
			}
		}
		return false;
	}
}