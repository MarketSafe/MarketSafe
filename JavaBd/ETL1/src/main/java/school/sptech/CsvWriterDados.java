package school.sptech;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvWriterDados {

    public ByteArrayOutputStream writeCsv(List<Dado> dados) throws IOException {
        // Criar um CSV em memória utilizando ByteArrayOutputStream
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("data", "hora", "mac_address", "cpu_porcentagem", "ram_porcentagem"));

        // Processar e escrever cada objeto no CSV
        for (Dado dado : dados) {
            String[] partes = dado.getData_hora().split(" ");
            String data = partes[0];
            String hora = partes[1];

            csvPrinter.printRecord(
                    data,
                    hora,
                    dado.getMac_address(),
                    dado.getCpu_porcentagem(),
                    dado.getRam_porcentagem()
            );
        }

        // Fechar o CSV para garantir que todos os dados sejam escritos
        csvPrinter.flush();
        writer.close();

        // Retornar o ByteArrayOutputStream que contém o CSV gerado
        return outputStream;
    }
}