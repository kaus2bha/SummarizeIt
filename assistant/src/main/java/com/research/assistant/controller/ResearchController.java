package com.research.assistant.controller;

import com.research.assistant.dto.ApiResponse;
import com.research.assistant.dto.ResearchRequest;
import com.research.assistant.service.RateLimiterService;
import com.research.assistant.service.ResearchService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ResearchController {

    private final ResearchService researchService;
    private final RateLimiterService rateLimiterService;

    @PostMapping("/process")
    public ResponseEntity<ApiResponse> processContent(
            @RequestBody ResearchRequest request,
            HttpServletRequest httpRequest) {

        String clientIp = httpRequest.getRemoteAddr();

        if (!rateLimiterService.allowRequest(clientIp)) {
            return ResponseEntity.status(429)
                    .body(new ApiResponse(false, null, "Rate limit exceeded"));
        }

        String result = researchService.processContent(request);

        ApiResponse response = new ApiResponse(
                true,
                result,
                "Operation completed successfully"
        );

        return ResponseEntity.ok(response);
    }
}