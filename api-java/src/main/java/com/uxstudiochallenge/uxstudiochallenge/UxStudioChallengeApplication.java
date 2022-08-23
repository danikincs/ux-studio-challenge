package com.uxstudiochallenge.uxstudiochallenge;

import com.uxstudiochallenge.uxstudiochallenge.storage.StorageProperties;
import com.uxstudiochallenge.uxstudiochallenge.storage.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class UxStudioChallengeApplication {

	public static void main(String[] args) {

		SpringApplication.run(UxStudioChallengeApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
