package com.cpe.springboot.common.tools;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public interface DtoMapper<T, U> {

    U toDto(T entity);

    T toEntity(U dto);

    default Iterable<U> toDto(Iterable<T> entities) {
        return StreamSupport.stream(entities.spliterator(), true).map(this::toDto).collect(Collectors.toList());
    }

    default Iterable<T> toEntity(Iterable<U> dtos) {
        return StreamSupport.stream(dtos.spliterator(), true).map(this::toEntity).collect(Collectors.toList());
    }
}
