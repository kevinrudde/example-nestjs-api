INSERT INTO "profile" ("uuid", "name", "teamspeakUniqueId", "language", "lastOnline", "timePlayed", "banPoints", "permissions", "creationDate", "groupId")
VALUES
('8d695e42-2d04-4dd3-b6d8-3a538917fcda', 'Test', 'uniqueId', 'de_DE', '2020-12-22 20:49:00', 0, 0, NULL, '2020-12-22 20:00:00', (SELECT "id" FROM "group" WHERE "name" = 'player'));
