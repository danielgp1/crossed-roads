package com.trading212.crossedroads.dtos;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Visit {
    private long visited_id;
    private long visitor_id;
    private ZonedDateTime visited_at;

    public Visit() {};

    public Visit(long visited_id, long visitor_id, ZonedDateTime visited_at) {
        this.visited_id = visited_id;
        this.visitor_id = visitor_id;
        this.visited_at = visited_at;
    }
}
