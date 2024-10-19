package school.sptech.bucket.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CrawlerData {
//    Exemplo de dados:
//    { "AnoMes": 202310, "PAG_REGIAO": "NORDESTE", "REC_REGIAO": "NORDESTE","QUANTIDADE": 6062 }

  @JsonProperty("AnoMes")
  private Integer anoMes;
  @JsonProperty("PAG_REGIAO")
  private String pagRegiao;
  @JsonProperty("REC_REGIAO")
  private String recRegiao;
  @JsonProperty("QUANTIDADE")
  private Integer quantidade;

  // Getters e setters:
  public Integer getAnoMes() {
    return anoMes;
  }

  public void setAnoMes(Integer anoMes) {
    this.anoMes = anoMes;
  }

  public String getPagRegiao() {
    return pagRegiao;
  }

  public void setPagRegiao(String pagRegiao) {
    this.pagRegiao = pagRegiao;
  }

  public String getRecRegiao() {
    return recRegiao;
  }

  public void setRecRegiao(String recRegiao) {
    this.recRegiao = recRegiao;
  }

  public Integer getQuantidade() {
    return quantidade;
  }

  public void setQuantidade(Integer quantidade) {
    this.quantidade = quantidade;
  }
}
