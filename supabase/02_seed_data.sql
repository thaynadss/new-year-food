-- Seed data: Pre-defined list of people
-- You can modify this list with the actual names you need

INSERT INTO people (name, food, drink, dessert) VALUES
  ('Cláudio e família', NULL, NULL, NULL),
  ('Lucas e Bruna', NULL, NULL, NULL),
  ('Tula e Patrícia', NULL, NULL, NULL),
  ('Carlos Elias e família', NULL, NULL, NULL),
  ('Joyce, Thayna e Dani Velter', NULL, NULL, NULL),
  ('Cimara', NULL, NULL, NULL),
  ('Nilceia', NULL, NULL, NULL),
  ('Elizete', NULL, NULL, NULL),
  ('Tadeu e família', NULL, NULL, NULL),
  ('Rogerinho e Lúcia Helena', NULL, NULL, NULL)
ON CONFLICT (name) DO NOTHING;
