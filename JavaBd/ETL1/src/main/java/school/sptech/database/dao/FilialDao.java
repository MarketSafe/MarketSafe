package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.FilialEntity;

public class FilialDao {
  private JdbcTemplate conexao;

  public FilialDao(JdbcTemplate conexao) {
    this.conexao = conexao;
  }

  public FilialEntity selectById(Integer id) {
    return conexao.query("select * from filial where id = " + id, new BeanPropertyRowMapper<FilialEntity>(FilialEntity.class)).get(0);
  }
}
