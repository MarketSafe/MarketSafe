package school.sptech.bucket.writers;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;
import school.sptech.bucket.data.CrawlerData;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CrawlerCsvWriter {
  public ByteArrayOutputStream writeCsv(List<CrawlerData> dados) throws IOException {
    // Criar um CSV em memória utilizando ByteArrayOutputStream:
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
    CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.Builder.create().setHeader("anoMes", "pagRegiao", "recRegiao", "quantidade").setDelimiter(",").setQuoteMode(QuoteMode.ALL).build());

    // Processar e escrever cada objeto no CSV:
    for (CrawlerData crawlerData : dados) {
      csvPrinter.printRecord(
              crawlerData.getAnoMes(),
              crawlerData.getPagRegiao(),
              crawlerData.getRecRegiao(),
              crawlerData.getQuantidade()
      );
    }

    // Fechar o CSV para garantir que todos os dados sejam escritos:
    csvPrinter.flush();
    writer.close();

    // Retornar o ByteArrayOutputStream que contém o CSV gerado:
    return outputStream;
  }
}
