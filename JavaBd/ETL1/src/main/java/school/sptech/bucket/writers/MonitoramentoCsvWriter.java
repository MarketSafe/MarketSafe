package school.sptech.bucket.writers;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.bucket.data.MonitoramentoData;
import school.sptech.database.Conexao;
import school.sptech.database.dao.EnderecoDao;
import school.sptech.database.dao.FilialDao;
import school.sptech.database.dao.TotemDao;
import school.sptech.database.entities.EnderecoEntity;
import school.sptech.database.entities.FilialEntity;
import school.sptech.database.entities.TotemEntity;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class MonitoramentoCsvWriter {
  public ByteArrayOutputStream writeCsv(List<MonitoramentoData> dados) throws IOException {
    // Criar um CSV em memória utilizando ByteArrayOutputStream:
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
    CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.Builder.create().setHeader("data", "hora", "macAddress", "cpuPorcentagem", "ramPorcentagem", "filial", "bairro").setDelimiter(",").setQuoteMode(QuoteMode.ALL).build());

    // Processar e escrever cada objeto no CSV:
    for (MonitoramentoData monitoramentoData : dados) {
      csvPrinter.printRecord(
              monitoramentoData.getData(),
              monitoramentoData.getHora(),
              monitoramentoData.getMacAddress(),
              monitoramentoData.getCpuPorcentagem(),
              monitoramentoData.getRamPorcentagem(),
              monitoramentoData.getFkFilial(),
              monitoramentoData.getBairro()
      );
    }

    // Fechar o CSV para garantir que todos os dados sejam escritos:
    csvPrinter.flush();
    writer.close();

    // Retornar o ByteArrayOutputStream que contém o CSV gerado:
    return outputStream;
  }
}
