package com.cpe.springboot.card_generator.controller;

import com.cpe.springboot.card_generator.model.CardGeneratorModel;
import org.springframework.data.repository.CrudRepository;

public interface CardGeneratorRepository extends CrudRepository<CardGeneratorModel, Integer> {

}
