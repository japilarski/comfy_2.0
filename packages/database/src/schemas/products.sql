CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    desc~ription TEXT NOT NULL,
    featured BOOLEAN NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    price INTEGER NOT NULL COMMENT('in grosz'),
    shipping BOOLEAN NOT NULL,
    colors TEXT[] NOT NULL
);
