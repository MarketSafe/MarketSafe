package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.TotemEntity;

public class TotemDao {
  private JdbcTemplate conexao;

  public TotemDao(JdbcTemplate conexao) {
    this.conexao = conexao;
  }

  public TotemEntity selectByMacAddress(String macAddress) {
    return conexao.query("select * from totem where mac_address = '" + macAddress + "'", new BeanPropertyRowMapper<TotemEntity>(TotemEntity.class)).get(0);
  }
}
