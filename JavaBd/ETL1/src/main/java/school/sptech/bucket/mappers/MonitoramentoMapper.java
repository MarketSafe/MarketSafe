package school.sptech.bucket.mappers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.bucket.data.MonitoramentoData;
import school.sptech.database.Conexao;
import school.sptech.database.dao.EnderecoDao;
import school.sptech.database.dao.FilialDao;
import school.sptech.database.dao.TotemDao;
import school.sptech.database.entities.EnderecoEntity;
import school.sptech.database.entities.FilialEntity;
import school.sptech.database.entities.TotemEntity;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MonitoramentoMapper {
    public List<MonitoramentoData> mapJson(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<MonitoramentoData> registros =  mapper.readValue(inputStream, new TypeReference<List<MonitoramentoData>>() {
        });

        // conexão com o banco de dados:
        final JdbcTemplate conexao = new Conexao().getTemplate();
        // DAOs:
        final TotemDao totemDao = new TotemDao(conexao);
        final FilialDao filialDao = new FilialDao(conexao);
        final EnderecoDao enderecoDaoDao = new EnderecoDao(conexao);

        for (MonitoramentoData monitoramentoData : registros) {
            TotemEntity totemDb = totemDao.selectByMacAddress(monitoramentoData.getMacAddress());
            FilialEntity filialDb = filialDao.selectById(totemDb.getFkFilial());
            EnderecoEntity enderecoDb = enderecoDaoDao.selectById(filialDb.getFkEndereco());

            monitoramentoData.setFkFilial(totemDb.getFkFilial());
            monitoramentoData.setFkEmpresa(filialDb.getFkEmpresa());
            monitoramentoData.setBairro(enderecoDb.getBairro());
        }

        return registros;
    }
    public List<MonitoramentoData> mapCsv(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(inputStream, new TypeReference<List<MonitoramentoData>>() {
        });
    }
}
