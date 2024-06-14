create table tbl_user_type (
    int_id int auto_increment primary key,
    vch_name varchar(255) not null dtt_deleted_at DATETIME NULL,
    dtt_created_at DATETIME default current_timestamp,
    dtt_updated_at DATETIME default current_timestamp,
);

CREATE TABLE tbl_user (
    int_id INT PRIMARY KEY AUTO_INCREMENT,
    vch_email VARCHAR(255) NOT NULL,
    vch_password VARCHAR(255) NOT NULL,
    vch_name VARCHAR(255) NOT NULL,
    vch_lastname VARCHAR(255) NOT NULL,
    int_phone_number BIGINT,
    int_user_type_id INT NOT NULL,
    int_created_by INT NULL,
    int_updated_by INT NULL,
    dtt_deleted_at DATETIME NULL,
    dtt_created_at DATETIME default current_timestamp,
    dtt_updated_at DATETIME default current_timestamp,
    FOREIGN KEY (int_user_type_id) REFERENCES tbl_user_type (int_id),
    FOREIGN KEY (int_created_by) REFERENCES tbl_user (int_id),
    FOREIGN KEY (int_updated_by) REFERENCES tbl_user (int_id)
);

ALTER TABLE tbl_user_type
ADD COLUMN int_created_by INT NULL,
ADD FOREIGN KEY (int_created_by) REFERENCES tbl_user (int_id);

ALTER TABLE tbl_user_type
ADD COLUMN int_updated_by INT NULL,
ADD FOREIGN KEY (int_updated_by) REFERENCES tbl_user (int_id);

insert into tbl_user_type (vch_name) values ('Admin'), ('User');