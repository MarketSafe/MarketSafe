package school.sptech;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Pix {

//    Exemplo de dados:
//    "AnoMes": 202310, "PAG_REGIAO": "NORDESTE", "REC_REGIAO": "NORDESTE","QUANTIDADE": 6062

    @JsonProperty("AnoMes")
    private Integer anoMes;

    @JsonProperty("PAG_REGIAO")
    private String PagRegiao;

    @JsonProperty("REC_REGIAO")
    private String RecRegiao;

    @JsonProperty("QUANTIDADE")
    private Integer quantidade;

    // Getters e setters

    public Integer getAnoMes() {
        return anoMes;
    }

    public void setAnoMes(Integer anoMes) {
        this.anoMes = anoMes;
    }

    public String getPagRegiao() {
        return PagRegiao;
    }

    public void setPagRegiao(String pagRegiao) {
        PagRegiao = pagRegiao;
    }

    public String getRecRegiao() {
        return RecRegiao;
    }

    public void setRecRegiao(String recRegiao) {
        RecRegiao = recRegiao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
