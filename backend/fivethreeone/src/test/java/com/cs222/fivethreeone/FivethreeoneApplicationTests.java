package com.cs222.fivethreeone;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FivethreeoneApplicationTests {

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
