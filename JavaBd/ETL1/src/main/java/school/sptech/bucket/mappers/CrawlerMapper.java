package school.sptech.bucket.mappers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import school.sptech.bucket.data.CrawlerData;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class CrawlerMapper {
    public List<CrawlerData> map(InputStream inputStream) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(inputStream, new TypeReference<List<CrawlerData>>() {});
    }
}
