-- migrate:up
CREATE TABLE thread_comments (
    id INT NOT NULL AUTO_INCREMENT,
    thread_id INT,
    user_id INT,
    content VARCHAR(200) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
    )


-- migrate:down

