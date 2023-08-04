package com.trading212.crossedroads.daos;

import com.trading212.crossedroads.dtos.AvailableColor;

import java.util.List;
import java.util.Optional;

public interface AvailableColorDao {
    AvailableColor insertAvailableColor(AvailableColor availableColor);

    List<AvailableColor> getAvailableColors();

    List<AvailableColor> getAvailableColorsByUserId(long userId);

    Optional<AvailableColor> getAvailableColorByUserIdAndColorHash(long userId, String colorHash);

    int deleteAvailableColor(long userId, String colorHash);
}
