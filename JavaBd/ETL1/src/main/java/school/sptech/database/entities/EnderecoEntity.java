package school.sptech.database.entities;

public class EnderecoEntity {
  private Integer id;
  private String cep;
  private String bairro;
  private String rua;
  private Integer numero;
  private String complemento;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getCep() {
    return cep;
  }

  public void setCep(String cep) {
    this.cep = cep;
  }

  public String getBairro() {
    return bairro;
  }

  public void setBairro(String bairro) {
    this.bairro = bairro;
  }

  public String getRua() {
    return rua;
  }

  public void setRua(String rua) {
    this.rua = rua;
  }

  public Integer getNumero() {
    return numero;
  }

  public void setNumero(Integer numero) {
    this.numero = numero;
  }

  public String getComplemento() {
    return complemento;
  }

  public void setComplemento(String complemento) {
    this.complemento = complemento;
  }

  @Override
  public String toString() {
    return "EnderecoEntity { Integer id: " + getId() +
            ", String cep: \"" + getCep() +
            "\", String bairro: \"" + getBairro() +
            "\", String rua: \"" + getRua() +
            "\", Integer numero: " + getNumero() +
            ", String complemento: \"" + getComplemento() + "\" }";
  }
}
