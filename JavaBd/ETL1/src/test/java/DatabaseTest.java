import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.bucket.data.MonitoramentoData;
import school.sptech.database.Conexao;
import school.sptech.database.dao.EnderecoDao;
import school.sptech.database.dao.FilialDao;
import school.sptech.database.dao.TotemDao;
import school.sptech.database.entities.EnderecoEntity;
import school.sptech.database.entities.FilialEntity;
import school.sptech.database.entities.TotemEntity;

public class DatabaseTest {
  public static void main(String[] args) {
    // conexão com o banco de dados:
    final JdbcTemplate conexao = new Conexao().getTemplate();
    // DAOs:
    final TotemDao totemDao = new TotemDao(conexao);
    final FilialDao filialDao = new FilialDao(conexao);
    final EnderecoDao enderecoDaoDao = new EnderecoDao(conexao);

    TotemEntity totemDb = totemDao.selectByMacAddress("f4b5202e6e36");
    // imprime o totem selecionado:
    System.out.println(totemDb);

    FilialEntity filialDb = filialDao.selectById(totemDb.getFkFilial());
    // imprime a filial selecionada:
    System.out.println(filialDb);

    EnderecoEntity enderecoDb = enderecoDaoDao.selectById(filialDb.getFkEndereco());
    // imprime o endereço selecionado:
    System.out.println(enderecoDb);
  }
}
