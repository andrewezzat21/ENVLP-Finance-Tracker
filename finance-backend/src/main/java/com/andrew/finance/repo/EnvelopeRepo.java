package com.andrew.finance.repo;

import com.andrew.finance.entity.Envelope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnvelopeRepo extends JpaRepository<Envelope, Long> {

}
