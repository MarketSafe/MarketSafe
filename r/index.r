#install.packages("tm")
#install.packages("wordcloud")
#install.packages("RColorBrewer")
#install.packages("readr")

#library(tm)
#library(wordcloud)
#library(RColorBrewer)
#library(readr)

set.seed(123)
amostra <- rnorm(200, 0, 1)

amostraPositivo <- amostra[amostra >= 0]

amostraRelativo <- amostraPositivo / max(amostraPositivo)

a <- c(
  "ÁguaRasa",
  "AltodePinheiros",
  "Anhanguera",
  "Aricanduva",
  "ArturAlvim",
  "BarraFunda",
  "BelaVista",
  "Belém",
  "BomRetiro",
  "Brasilândia",
  "Butantã",
  "Cachoeirinha",
  "Cambuci",
  "CampoBelo",
  "CampoGrande",
  "CampoLimpo",
  "Cangaíba",
  "CapãoRedondo",
  "Carrão",
  "CasaVerde",
  "CidadeAdemar",
  "CidadeDutra",
  "CidadeLíder",
  "CidadeLíder",
  "CidadeTiradentes",
  "Consolação",
  "Cursino",
  "ErmelinoMatarazzo",
  "FreguesiadoÓ",
  "Grajaú",
  "Guaianases",
  "Iguatemi",
  "Ipiranga",
  "ItaimBibi",
  "ItaimPaulista",
  "Itaquera",
  "Jabaquara",
  "Jaçanã",
  "Jaguara",
  "Jaguaré",
  "Jaraguá",
  "JardimÂngela",
  "JardimHelena",
  "JardimPaulista",
  "JardimSãoLuís",
  "Lapa",
  "Liberdade",
  "Limão",
  "Mandaqui",
  "Marsilac",
  "Moema",
  "Mooca",
  "Morumbi",
  "Parelheiros",
  "Pari",
  "ParquedoCarmo",
  "Penha",
  "Perdizes",
  "Pinheiros",
  "PonteRasa",
  "RaposoTavares",
  "República",
  "RioPequeno",
  "Sacomã",
  "SantaCecília",
  "Santana",
  "SantoAmaro",
  "SãoDomingos",
  "SãoLucas",
  "SãoMateus",
  "SãoMiguelPaulista",
  "SãoRafael",
  "Sapopemba",
  "Saúde",
  "Sé",
  "Tatuapé",
  "Tremembé",
  "Tucuruvi",
  "VilaAndrade",
  "VilaCuruçá",
  "VilaFormosa",
  "VilaGuilherme",
  "VilaJacuí",
  "VilaLeopoldina",
  "VilaMaria",
  "VilaMariana",
  "VilaMatilde",
  "VilaMedeiros",
  "VilaPrudente",
  "VilaSônia"
)

index <- trunc(amostraRelativo * (length(a) - 1))

b <- a[index]

corpo = Corpus(VectorSource(b))
corpo = tm_map(corpo, removePunctuation)
corpo = tm_map(corpo, removeNumbers)

tdm <- TermDocumentMatrix(corpo)
m <- as.matrix(tdm)

par(mfrow=c(1,1))

frequencia_palavras <- sort(rowSums(m), 
                            decreasing = TRUE)

frequencia_palavras_df = data.frame(word = names(frequencia_palavras), 
                                    freq = frequencia_palavras)

head(frequencia_palavras_df, 1)

wordcloud(words = frequencia_palavras_df$word, 
          freq = frequencia_palavras_df$freq, 
          min.freq = 0, 
          max.words = 200, 
          random.order = FALSE, 
          rot.per = 0.5, 
          scale = c(2, 0), 
          colors = brewer.pal(8, "Dark2"),
)
