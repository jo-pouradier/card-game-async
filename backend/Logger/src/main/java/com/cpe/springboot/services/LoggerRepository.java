package com.cpe.springboot.services;

import com.cpe.springboot.model.LoggerModel;
import org.springframework.data.repository.CrudRepository;

public interface LoggerRepository extends CrudRepository<LoggerModel, Integer> {


}
