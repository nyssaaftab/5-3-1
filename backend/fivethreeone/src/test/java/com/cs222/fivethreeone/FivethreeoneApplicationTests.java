package com.cs222.fivethreeone;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.ApplicationContext;

@SpringBootTest
class FivethreeoneApplicationTests {
    private ApplicationContext applicationContext;
	@Test
	void contextLoads() {
	}

	@Test
    void testRestTemplateBean() {
        // Retrieve the RestTemplate bean from the application context
        RestTemplate restTemplate = applicationContext.getBean(RestTemplate.class);
        
        // Assert that the bean is not null and is an instance of RestTemplate
        assertThat(restTemplate).isNotNull();
        assertThat(restTemplate).isInstanceOf(RestTemplate.class);
    }

}
