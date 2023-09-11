-- migrate:up
CREATE TABLE thread_likes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    thread_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
    )


-- migrate:down

