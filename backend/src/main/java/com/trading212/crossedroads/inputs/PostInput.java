package com.trading212.crossedroads.inputs;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PostInput {
    private final String content;

    @JsonCreator
    public PostInput(@JsonProperty("content") String content) {
        this.content = content;
    }
}
