package school.sptech.database;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

public class Conexao {
  private String ipPorta;
  private JdbcTemplate template;

  public Conexao() {
    ipPorta = "3.85.47.52:3306";
    BasicDataSource dataSource = new BasicDataSource();
    dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
    dataSource.setUrl("jdbc:mysql://" + ipPorta + "/market_safe");
    dataSource.setUsername("mktsUserSelect");
    dataSource.setPassword("sptech");

    template = new JdbcTemplate(dataSource);
  }

  public JdbcTemplate getTemplate() {
    return template;
  }
}
