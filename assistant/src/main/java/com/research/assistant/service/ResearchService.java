package com.research.assistant.service;

import com.research.assistant.response.GroqResponse;
import com.research.assistant.dto.ResearchRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;

@Service
public class ResearchService {

    @Value("${groq.api.url}")
    private String groqApiUrl;

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final WebClient webClient;

    private static final Logger logger = LoggerFactory.getLogger(ResearchService.class);
    public ResearchService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String processContent(ResearchRequest request) {

        logger.info("Processing request with operation: {}", request.getOperation());

        String prompt = buildPrompt(request);

        Map<String, Object> requestBody = Map.of(
                "model", "llama-3.1-8b-instant",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.4,
                "max_completion_tokens", 600
        );

        logger.info("Sending request to Groq API");

        GroqResponse response = webClient.post()
                .uri(groqApiUrl)
                .header("Authorization", "Bearer " + groqApiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GroqResponse.class)
                .block();

        logger.info("Received response from Groq");

        return response.getChoices().get(0).getMessage().getContent();
    }
    private String buildPrompt(ResearchRequest request) {

        String operation = request.getOperation().trim().toLowerCase();

        switch (operation) {
            case "summarize":
                return "Summarize the following text clearly:\n\n" + request.getContent();

            case "suggest":
                return "Suggest related topics and further reading for:\n\n" + request.getContent();

            default:
                throw new IllegalArgumentException("Unknown operation: " + request.getOperation());
        }
    }
}