package com.cpe.springboot.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestClientService {

    private final RestTemplate restTemplate;

    public RestClientService() {
        this.restTemplate = new RestTemplate();
    }

    public <T> T getRequest(String url, Class<T> responseType) {
        ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.GET, null,responseType);
        return response.getBody();
    }

    public <T> T postRequest(String url, Object requestPayload, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<Object> request = new HttpEntity<>(requestPayload, headers);
        ResponseEntity<T> response = restTemplate.exchange(url, HttpMethod.POST, request, responseType);
        return response.getBody();  
    }
}