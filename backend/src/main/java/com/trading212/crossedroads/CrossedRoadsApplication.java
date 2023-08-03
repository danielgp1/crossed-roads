package com.trading212.crossedroads;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CrossedRoadsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrossedRoadsApplication.class, args);
	}

}