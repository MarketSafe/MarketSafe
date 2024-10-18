package school.sptech;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Dado {

//    Exemplo de dados:
//    {"data_hora": "2024-10-11 11:26:15", "mac_address": "10f60a853495", "cpu_porcentagem": 6.6, "ram_porcentagem": 89.2}

    @JsonProperty("data_hora")
    private String data_hora;

    @JsonProperty("mac_address")
    private String mac_address;

    @JsonProperty("cpu_porcentagem")
    private Integer cpu_porcentagem;

    @JsonProperty("ram_porcentagem")
    private Integer ram_porcentagem;

    // Getters e setters


    public String getData_hora() {
        return data_hora;
    }

    public void setData_hora(String data_hora) {
        this.data_hora = data_hora;
    }

    public String getMac_address() {
        return mac_address;
    }

    public void setMac_address(String mac_address) {
        this.mac_address = mac_address;
    }

    public Integer getCpu_porcentagem() {
        return cpu_porcentagem;
    }

    public void setCpu_porcentagem(Integer cpu_porcentagem) {
        this.cpu_porcentagem = cpu_porcentagem;
    }

    public Integer getRam_porcentagem() {
        return ram_porcentagem;
    }

    public void setRam_porcentagem(Integer ram_porcentagem) {
        this.ram_porcentagem = ram_porcentagem;
    }
}
