package com.research.assistant.service;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimiterService {

    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private static final int MAX_REQUESTS = 10;

    public boolean allowRequest(String clientIp) {

        requestCounts.putIfAbsent(clientIp, new AtomicInteger(0));

        int requests = requestCounts.get(clientIp).incrementAndGet();

        return requests <= MAX_REQUESTS;
    }
}