DROP TABLE IF EXISTS product;
CREATE TABLE product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    collection TEXT,
    company TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    manual_url TEXT,
    main_img_url TEXT NOT NULL,
    img_urls TEXT[],
    featured BOOLEAN NOT NULL,
    price INTEGER
);
