package com.example.biblioteka.service.impl;

import com.example.biblioteka.model.Country;
import com.example.biblioteka.repo.CountryRepository;
import com.example.biblioteka.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Country> findAll() {
        return countryRepository.findAll();
    }
}
