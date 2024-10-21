package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.EnderecoEntity;

public class EnderecoDao {
  private JdbcTemplate conexao;

  public EnderecoDao(JdbcTemplate conexao) {
    this.conexao = conexao;
  }

  public EnderecoEntity selectById(Integer id) {
    return conexao.query("select * from endereco where id = " + id, new BeanPropertyRowMapper<EnderecoEntity>(EnderecoEntity.class)).get(0);
  }
}
