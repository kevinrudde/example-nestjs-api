INSERT INTO "inventory" ("id", "data")
VALUES
('7e4f8960-18a7-41e8-909b-c705b03edf0a', '[{"name": "test_item", "amount": 12}, {"name": "nice_item", "amount": 1}]');

INSERT INTO "character" ("id", "profileId", "level", "experience", "inventoryId")
VALUES
('9c01b706-0214-4149-9e47-06d3e2c1134e', '8d695e42-2d04-4dd3-b6d8-3a538917fcda', 10, 1500, '7e4f8960-18a7-41e8-909b-c705b03edf0a');
