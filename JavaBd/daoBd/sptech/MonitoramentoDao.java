package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import java.util.List;

public class MonitoramentoDao {

    private final Conexao conexao;

    public MonitoramentoDao() {
        this.conexao = new Conexao();
    }

    public List<Monitoramento> buscarCpu() {
        String sql = "SELECT Processador FROM info";
        return conexao.getTemplate().query(sql, new BeanPropertyRowMapper<>(Monitoramento.class));
    }


    public List<Monitoramento> buscarMemoria() {
        String sql = "SELECT Memoria FROM info";
        return conexao.getTemplate().query(sql, new BeanPropertyRowMapper<>(Monitoramento.class));
    }


    public List<Monitoramento> buscarMediaGeral() {
        String sql = "SELECT AVG(Processador) as cpu, AVG(Memoria) as memoria FROM info";
        return conexao.getTemplate().query(sql, new BeanPropertyRowMapper<>(Monitoramento.class));
    }
}
