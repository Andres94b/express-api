## Workflow of altering the prisma schema and database

Alter the file schema.prisma (ex. add models of fields), then run the command:

`npx prisma migrate dev --name added_model`

This should create the migration and apply it to the database

Run the following command to generate the prisma client

`npx prisma generate`
