package school.sptech;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.S3Event;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import school.sptech.bucket.data.MonitoramentoData;
import school.sptech.bucket.data.CrawlerData;
import school.sptech.bucket.mappers.CrawlerMapper;
import school.sptech.bucket.mappers.MonitoramentoMapper;
import school.sptech.bucket.writers.CrawlerCsvWriter;
import school.sptech.bucket.writers.MonitoramentoCsvWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;

public class Main implements RequestHandler<S3Event, String> {

  // Criação do cliente S3 para acessar os buckets:
  private final AmazonS3 s3Client = AmazonS3ClientBuilder.defaultClient();

  // Bucket de destino para o CSV gerado:
  private static final String DESTINATION_BUCKET = "trusted-mkts2";

  @Override
  public String handleRequest(S3Event s3Event, Context context) {
    try {
      // Extraímos o nome do bucket de origem e a chave do arquivo JSON:
      String sourceBucket = s3Event.getRecords().get(0).getS3().getBucket().getName();
      String sourceKey = s3Event.getRecords().get(0).getS3().getObject().getKey();

      // Leitura do arquivo JSON do bucket de origem:
      InputStream s3RawInputStream = s3Client.getObject(sourceBucket, sourceKey).getObjectContent();

      // Declarando a variável com ps dados de saída
      ByteArrayOutputStream csvOutputStream;

      String trustedName = "";

      if (sourceKey.contains("crawler")) {
        // dados do crawler:
        // Conversão do JSON para uma lista de objetos usando o Mapper:
        CrawlerMapper mapper = new CrawlerMapper();
        List<CrawlerData> data = mapper.map(s3RawInputStream);

        // Geração do arquivo CSV a partir da lista de objetos usando o CsvWriter:
        CrawlerCsvWriter csvWriter = new CrawlerCsvWriter();
        csvOutputStream = csvWriter.writeCsv(data);

        trustedName = "crawler.csv";
      } else {
        // dados do monitoramento:

        // instanciando o mapper:
        MonitoramentoMapper mapper = new MonitoramentoMapper();

        // Conversão do JSON para uma lista de objetos usando o Mapper:
        List<MonitoramentoData> data = mapper.mapJson(s3RawInputStream);

        // nome do arquivo no trusted:
        trustedName = "monitoramento/empresa" + data.get(0).getFilial().toString() + ".csv";


        // pega os dados do arquivo no bucket trusted caso exista e altera a lista de objetos:
        try {
          // inicia a variável dos dados do arquivo no bucket trusted:
          InputStream s3TrustedInputStream = s3Client.getObject(DESTINATION_BUCKET, trustedName).getObjectContent();

          // adiciona os registros antigos do bucket à lista de registros da captura atual:
          data.addAll(mapper.mapCsv(s3TrustedInputStream));
        } catch (Exception e) {
          System.out.println("(Aviso) Exception ao ler arquivo do bucket trusted: " + e.getMessage());
        }

        // Geração do arquivo CSV a partir da lista de objetos usando o CsvWriter:
        MonitoramentoCsvWriter csvWriter = new MonitoramentoCsvWriter();
        csvOutputStream = csvWriter.writeCsv(data);

      }

      // Converte o ByteArrayOutputStream para InputStream para enviar ao bucket de destino:
      InputStream csvInputStream = new ByteArrayInputStream(csvOutputStream.toByteArray());

      // Envio do CSV para o bucket de destino:
      s3Client.putObject(DESTINATION_BUCKET, trustedName, csvInputStream, null);

      return "Sucesso no processamento";
    } catch (Exception e) {
      // Tratamento de erros e log do contexto em caso de exceção:
      context.getLogger().log("Erro: " + e.getMessage());
      return "Erro no processamento";
    }
  }
}
