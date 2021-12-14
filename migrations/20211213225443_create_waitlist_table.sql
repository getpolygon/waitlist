-- +goose Up
-- +goose StatementBegin
CREATE TABLE waitlist (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE waitlist;
-- +goose StatementEnd