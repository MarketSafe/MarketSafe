package school.sptech;

import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        MonitoramentoDao monitoramentoDao = new MonitoramentoDao();  // Inicialização do DAO

        while (true){
            System.out.println("Escolha o seu cargo:");
            System.out.println("1 - Gerente");
            System.out.println("2 - Analista/Técnico");

            System.out.println("Digite sua escolha:");
            Integer cargoEsc = scanner.nextInt();

            System.out.println("Deseja ver qual métrica:");
            System.out.println("1 - CPU");
            System.out.println("2 - Memória");
            System.out.println("3 - Média Geral");

            Integer metricaOp = scanner.nextInt();

            if (metricaOp == 1){
                List <Monitoramento> cpulist = monitoramentoDao.buscarCpu();
                if (!cpulist.isEmpty()) {
                    //Monitoramento cpuDados = cpuList.get(0);
                    //System.out.println("CPU: " + cpuDados.getCpu());
                    System.out.println("CPU: " + cpulist.get(0).getCpu());
                }
            } else if (metricaOp == 2) {
                List<Monitoramento> memoriaList = monitoramentoDao.buscarMemoria();
                if (!memoriaList.isEmpty()) {
                    System.out.println("Memória: " + memoriaList.get(0).getMemoria());
                }
            } else if (metricaOp == 3) {
                List<Monitoramento> mediaList = monitoramentoDao.buscarMediaGeral();
                if (!mediaList.isEmpty()) {
                    Monitoramento media = mediaList.get(0);
                    System.out.println("Média CPU: " + media.getCpu());
                    System.out.println("Média Memória: " + media.getMemoria());
                }
            }

            scanner.nextLine();

            System.out.println("Deseja ver outra informação? (s/n)");
            String escBool = scanner.nextLine();

            if (escBool.equals("n")){
                System.out.println("Obrigado pelo seu tempo, até mais!");
                break;
            }
        }
    }
}
