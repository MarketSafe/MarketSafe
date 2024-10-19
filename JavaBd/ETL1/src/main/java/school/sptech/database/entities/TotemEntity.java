package school.sptech.database.entities;

public class TotemEntity {
  private Integer id;
  private String dataHora;
  private String macAddress;
  private Integer fkFilial;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getDataHora() {
    return dataHora;
  }

  public void setDataHora(String dataHora) {
    this.dataHora = dataHora;
  }

  public String getMacAddress() {
    return macAddress;
  }

  public void setMacAddress(String macAddress) {
    this.macAddress = macAddress;
  }

  public Integer getFkFilial() {
    return fkFilial;
  }

  public void setFkFilial(Integer fkFilial) {
    this.fkFilial = fkFilial;
  }

  @Override
  public String toString() {
    return "TotemEntity { Integer id: " + getId() +
            ", String dataHora: " + getDataHora() +
            ", Integer macAddress: " + getMacAddress() +
            ", Integer fkFilial: " + getFkFilial() + " }";
  }
}
