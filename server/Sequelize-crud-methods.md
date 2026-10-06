# Sequelize Methods & CRUD Operations

## Overview

Sequelize provides model methods that map directly to **CRUD** (Create, Read, Update, Delete) HTTP operations. Each method generates and executes a SQL query under the hood.

---

## READ → `GET`

### `findAll()`

Returns **all rows** matching the given options. Equivalent to `SELECT * FROM table`.

```javascript
// GET /api/clubs
const clubs = await Club.findAll({
	attributes: ["name", "location"], // SELECT specific columns
	order: [["name", "ASC"]], // ORDER BY name ASC
	include: [{ model: President }], // JOIN with President table
	where: { location: "Melbourne" }, // WHERE clause (optional)
});
```

> Returns an array of model instances. Returns an **empty array `[]`** (not `null`) if no rows are found.

---

### `findOne()`

Returns the **first row** that matches the given options. Equivalent to `SELECT ... LIMIT 1`.

```javascript
// GET /api/clubs?name=Cobras
const club = await Club.findOne({
	where: { name: "Cobras" },
	attributes: ["name", "location"],
});
```

> Returns a single model instance or **`null`** if not found.

---

### `findByPk()`

Finds a single row by its **Primary Key**. The most efficient way to look up a specific record.

```javascript
// GET /api/clubs/:id
const club = await Club.findByPk(req.params.id, {
	attributes: ["name", "location"],
	include: [{ model: President, attributes: ["firstName", "lastName"] }],
});
```

> Returns a single model instance or **`null`** if not found.

---

## CREATE → `POST`

### `create()`

Creates and **saves a new row** in one step. Equivalent to `INSERT INTO`.

```javascript
// POST /api/clubs
const club = await Club.create({
	name: req.body.name,
	location: req.body.location,
});
```

> Returns the newly created model instance including its generated `id`.

---

### `findOrCreate()`

Searches for a row matching the `where` clause. If found, returns it. If **not** found, creates it.

```javascript
// POST /api/clubs
const [club, created] = await Club.findOrCreate({
	where: { name: req.body.name, location: req.body.location },
});

// `created` is a boolean: true = new record, false = already existed
if (!created) {
	return next(ApiError.dbConflict("This Club already exists."));
}
```

> Returns a **destructured array**: `[instance, createdBoolean]`.  
> Useful for preventing **duplicate entries**.

---

## UPDATE → `PUT` / `PATCH`

### `update()`

Updates **one or more rows** matching the `where` clause. Equivalent to `UPDATE ... WHERE`.

```javascript
// PUT /api/clubs/:id
const [affectedRows] = await Club.update(
	{ name: req.body?.name, location: req.body?.location }, // fields to update
	{ where: { id: req.params.id } }, // which row(s)
);

// affectedRows is a number: 0 = not found, 1+ = updated
if (affectedRows === 0) {
	return next(ApiError.notFound("Club not found."));
}
```

> Returns an array with the **count of affected rows** (e.g., `[1]`).  
> Does **not** return the updated instance — use `findByPk()` afterwards if needed.

---

### `reload()`

Re-fetches the current instance's data from the database, **overwriting** any unsaved local changes. Called on an **existing instance** (not the model class).

```javascript
// Refresh a club instance with latest DB data
const club = await Club.findByPk(req.params.id);
await club.reload();
```

> Useful after calling `update()` on related data, or when you need to ensure your instance reflects the latest DB state.  
> Returns the **refreshed instance**.

---

## DELETE → `DELETE`

### `destroy()`

Deletes the row from the database. Called on an **existing instance** (not the model class).

```javascript
// DELETE /api/clubs/:id
const club = await Club.findByPk(req.params.id);

if (!club) {
	return next(ApiError.badRequest("Club not found."));
}

await club.destroy();
res.send(club); // send back the deleted instance before it's gone
```

> Does **not** return a value. The instance still exists in memory after `destroy()` is called — it's just been removed from the database.

---

## Summary Table

| CRUD   | HTTP Method | Sequelize Method | SQL Equivalent            | Returns                      |
| ------ | ----------- | ---------------- | ------------------------- | ---------------------------- |
| Read   | `GET`       | `findAll()`      | `SELECT * FROM`           | Array of instances (or `[]`) |
| Read   | `GET`       | `findOne()`      | `SELECT ... LIMIT 1`      | Single instance or `null`    |
| Read   | `GET`       | `findByPk()`     | `SELECT ... WHERE id = ?` | Single instance or `null`    |
| Create | `POST`      | `create()`       | `INSERT INTO`             | New instance                 |
| Create | `POST`      | `findOrCreate()` | `SELECT` or `INSERT INTO` | `[instance, boolean]`        |
| Update | `PUT/PATCH` | `update()`       | `UPDATE ... WHERE`        | `[affectedRowCount]`         |
| Update | `PUT/PATCH` | `reload()`       | `SELECT ... WHERE id = ?` | Refreshed instance           |
| Delete | `DELETE`    | `destroy()`      | `DELETE FROM ... WHERE`   | `undefined`                  |

---

## Key Differences to Remember

- **Class methods** (`findAll`, `findOne`, `findByPk`, `create`, `findOrCreate`, `update`) are called on the **Model** itself: `Club.findAll()`
- **Instance methods** (`reload`, `destroy`) are called on a **retrieved instance**: `club.destroy()`
- `findAll()` never returns `null` — always check for an **empty array** instead
- `update()` does **not** return the updated data — use `findByPk()` after to retrieve it
- `findOrCreate()` always returns an **array** — remember to destructure it: `const [club, created] = ...`
