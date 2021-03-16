const { v4 } = require('uuid');
const firestore = require('../../database/firestore');

class StopRepository {
    constructor() {
        firestore.settings({ ignoreUndefinedProperties: true });
        this.collection = firestore.collection('stops');
    }

    async findAll() {
        try {
            const entries = [];
            const querySnapshot = await this.collection.get();
            querySnapshot.forEach((doc) => entries.push(doc.data()));

            console.log(querySnapshot.docs)

            return entries;
        } catch(err) {
            return err;
        }
    }

    async findById(id) {
        await this.collection.doc(id).then((data) => {
            return data;
        }).catch((err) => {
            return err;
        });
    }

    async store({ bus, trip, stop, label, address, latitude, longitude }) {
        try {
            const id = v4();
            const data = {
                bus,
                trip,
                stop,
                label,
                address,
                latitude,
                longitude
            }

            this.collection.doc(id).set(data);

            return { id, data };
        } catch(err) {
            return { error: err }
        }
    }
}

module.exports = new StopRepository();

/*
const db = require('../../database');

class AppRepository {
  async store({ name, company }) {
    const [row] = await db.query(`
      INSERT INTO apps (name, company)
      VALUES ($1, $2)
      RETURNING *
    `, [name, company]);

    return row;
  }

  async update(id, { name, company }) {
    const [row] = await db.query(`
      UPDATE apps SET name = $1, company = $2
      WHERE id = $3
      RETURNING *
    `, [name, company, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
        DELETE FROM apps WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new AppRepository();
*/