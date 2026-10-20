-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`utilizadores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`utilizadores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `palavra_passe` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`unidades_osmose`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`unidades_osmose` (
  `id` INT NOT NULL,
  `nome_unidade` VARCHAR(100) NOT NULL,
  `localizacao` VARCHAR(100) NOT NULL,
  `data_instalacao` DATETIME NULL,
  `estado` VARCHAR(45) NOT NULL,
  `utilizadores_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_unidades_osmose_utilizadores1_idx` (`utilizadores_id` ASC),
  CONSTRAINT `fk_unidades_osmose_utilizadores1`
    FOREIGN KEY (`utilizadores_id`)
    REFERENCES `mydb`.`utilizadores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`logs_alertas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`logs_alertas` (
  `id` INT NOT NULL,
  `tipo_alerta` VARCHAR(45) NOT NULL,
  `valor_lido` VARCHAR(45) NULL,
  `descricao` TEXT NULL,
  `data_hora` DATETIME NOT NULL,
  `unidades_osmose_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_logs_alertas_unidades_osmose1_idx` (`unidades_osmose_id` ASC),
  CONSTRAINT `fk_logs_alertas_unidades_osmose1`
    FOREIGN KEY (`unidades_osmose_id`)
    REFERENCES `mydb`.`unidades_osmose` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;