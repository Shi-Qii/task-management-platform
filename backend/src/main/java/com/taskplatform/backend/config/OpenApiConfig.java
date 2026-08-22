package com.taskplatform.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// [AI assisted - backend.md #2]
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI taskManagementOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Task Management Platform API")
                .version("v1")
                .description("CRUD API for managing tasks"));
    }
}
