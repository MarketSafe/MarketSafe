package school.sptech;

public class Monitoramento {

    private Double processador;
    private Double memoria;

    public Double getCpu() {
        return processador;
    }

    public void setCpu(Double processador) {
        this.processador = processador;
    }

    public Double getMemoria() {
        return memoria;
    }

    public void setMemoria(Double memoria) {
        this.memoria = memoria;
    }
}
