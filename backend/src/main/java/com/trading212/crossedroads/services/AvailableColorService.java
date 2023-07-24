package com.trading212.crossedroads.services;

import com.trading212.crossedroads.daos.AvailableColorDao;
import com.trading212.crossedroads.dtos.AvailableColor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailableColorService {
    private final AvailableColorDao availableColorDao;

    public AvailableColorService(AvailableColorDao availableColorDao) {
        this.availableColorDao = availableColorDao;
    }

    public AvailableColor insertAvailableColor(AvailableColor availableColor) {
        return availableColorDao.insertAvailableColor(availableColor);
    }

    public List<AvailableColor> getAvailableColors() {
        return availableColorDao.getAvailableColors();
    }

    public List<AvailableColor> getAvailableColorsByUserId(long userId) {
        return availableColorDao.getAvailableColorsByUserId(userId);
    }

    public AvailableColor getAvailableColorByUserIdAndColorHash(long userId, String colorHash) {
        return availableColorDao.getAvailableColorByUserIdAndColorHash(userId, colorHash)
                .orElse(null); // You can handle the case when the color is not found
    }

    public void deleteAvailableColor(long userId, String colorHash) {
        int rowsAffected = availableColorDao.deleteAvailableColor(userId, colorHash);
        if (rowsAffected != 1) {
            throw new IllegalStateException("Couldn't delete available color");
        }
    }
}
