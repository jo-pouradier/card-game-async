package com.cpe.springboot.services;

import java.util.Map;
import java.util.Base64;

import tp.cpe.ImgToProperties;

public class TextGeneration {

    public static Map<String, Float> getProperties(String imgUrl) {
        return ImgToProperties.getPropertiesFromImg(imgUrl, 100f, 4, 0.3f, isBase64(imgUrl));
    }

    public static boolean isBase64(String str) {
        try {
            Base64.getDecoder().decode(str);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
