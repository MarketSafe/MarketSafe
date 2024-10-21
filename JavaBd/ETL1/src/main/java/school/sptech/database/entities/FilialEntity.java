package school.sptech.database.entities;

public class FilialEntity {
  private Integer id;
  private String dataHora;
  private Integer fkEmpresa;
  private Integer fkEndereco;

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

  public Integer getFkEmpresa() {
    return fkEmpresa;
  }

  public void setFkEmpresa(Integer fkEmpresa) {
    this.fkEmpresa = fkEmpresa;
  }

  public Integer getFkEndereco() {
    return fkEndereco;
  }

  public void setFkEndereco(Integer fkEndereco) {
    this.fkEndereco = fkEndereco;
  }

  @Override
  public String toString() {
    return "FilialEntity { Integer id: " + getId() +
            ", String dataHora: \"" + getDataHora() +
            "\", Integer fkEmpresa: " + getFkEmpresa() +
            ", Integer fkEndereco: " + getFkEndereco() + " }";
  }
}
