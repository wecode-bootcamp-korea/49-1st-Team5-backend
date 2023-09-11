-- migrate:up
CREATE TABLE threads (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    content VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
    )



-- migrate:down

