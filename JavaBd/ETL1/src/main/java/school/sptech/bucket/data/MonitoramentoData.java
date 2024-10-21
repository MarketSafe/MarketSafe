package school.sptech.bucket.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MonitoramentoData {
//    Exemplo de dado:
//    { "data_hora": "2024-10-11 11:26:15", "mac_address": "10f60a853495", "cpu_porcentagem": 6.6, "ram_porcentagem": 89.2 }

  @JsonProperty("dataHora")
  private String dataHora;
  @JsonProperty("data")
  private String data;
  @JsonProperty("hora")
  private String hora;
  @JsonProperty("macAddress")
  private String macAddress;
  @JsonProperty("cpuPorcentagem")
  private Integer cpuPorcentagem;
  @JsonProperty("ramPorcentagem")
  private Integer ramPorcentagem;
  private Integer filial;
  private Integer fkEmpresa;
  private String bairro;

  // Getters e setters:
  public String getDataHora() {
    return dataHora;
  }

  public void setDataHora(String dataHora) {
    this.dataHora = dataHora;
  }

  public String getData() {
    return data;
  }

  public void setData(String data) {
    this.data = data;
  }

  public String getHora() {
    return hora;
  }

  public void setHora(String hora) {
    this.hora = hora;
  }

  public String getMacAddress() {
    return macAddress;
  }

  public void setMacAddress(String macAddress) {
    this.macAddress = macAddress;
  }

  public Integer getCpuPorcentagem() {
    return cpuPorcentagem;
  }

  public void setCpuPorcentagem(Integer cpuPorcentagem) {
    this.cpuPorcentagem = cpuPorcentagem;
  }

  public Integer getRamPorcentagem() {
    return ramPorcentagem;
  }

  public void setRamPorcentagem(Integer ramPorcentagem) {
    this.ramPorcentagem = ramPorcentagem;
  }

  public Integer getFilial() {
    return filial;
  }

  public Integer getFkEmpresa() {
    return fkEmpresa;
  }

  public void setFkEmpresa(Integer fkEmpresa) {
    this.fkEmpresa = fkEmpresa;
  }

  public void setFilial(Integer filial) {
    this.filial = filial;
  }

  public String getBairro() {
    return bairro;
  }

  public void setBairro(String bairro) {
    this.bairro = bairro;
  }

  public String getDataFromDataHora() {
    if (data == null) {
      return dataHora.substring(0, dataHora.indexOf(' '));
    } else {
      return getData();
    }
  }

  public String getHoraFromDataHora() {
    if (hora == null) {
      return dataHora.substring(dataHora.indexOf(' ') + 1);
    } else {
      return getHora();
    }
  }
}
